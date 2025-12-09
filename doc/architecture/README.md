# 🏗️ TechShastra Hub – Architecture Guide

This document explains how the TechShastra Hub codebase is organized, how requests flow through the system, and how supporting services (jobs, caching, observability, security) fit together. Use it alongside `doc/README.md` for navigation.

---

## 1. High-Level Layout

```
techshastra/
├── package.json        # Root orchestration scripts
├── scripts/            # Automation for setup, dev, db, prod
├── shastra-hub/        # React + Vite frontend
│   ├── src/            # Components, pages, contexts, hooks
│   └── backend/        # Express + Prisma backend API
└── doc/                # Documentation (this file, setup, troubleshooting, etc.)
```

- Root handles dependency bootstrapping and multi-app workflows (`dev:all`, `setup`, `build`, etc.).
- Frontend and backend are independent npm workspaces that share nothing but `.env` contracts and API schemas.
- Documentation lives in `doc/` so code and runbooks stay versioned together.

---

## 2. Root Orchestration Flow

`scripts/dev-all.js` is the entry point for local development. It:

1. Ensures `.env` files exist (copies examples or writes defaults) and installs missing dependencies.
2. Uses `concurrently` to start backend (`npm run dev` in `shastra-hub/backend`) and frontend (`npm run dev` in `shastra-hub`) with shared logging prefixes.
3. Falls back to manual process spawning if `concurrently` fails, guaranteeing both services run even on constrained environments.

See the source for the env, install, and concurrent launch logic.

```
```93:147:scripts/dev-all.js
function startServers() {
  log('\n🎯 Starting all services...\n', 'bright');
  ...
  concurrently([
    { name: 'backend', command: 'npm run dev', cwd: path.join(__dirname, '../shastra-hub/backend') },
    { name: 'frontend', command: 'npm run dev', cwd: path.join(__dirname, '../shastra-hub') },
  ], {
    prefix: '{name}',
    killOthers: ['failure', 'success'],
    restartTries: 1,
  });
}
```

- The same pattern powers `npm run setup` (full install + Prisma + database checks) and `npm run build` (backend then frontend).
- PowerShell helpers (`scripts/start-postgres.ps1`, cache-clearing scripts) smooth Windows onboarding.

---

## 3. Frontend Architecture (React + Vite)

### Composition
- Entry point `src/main.tsx` hydrates the React tree, unregisters stale service workers, then re-registers the PWA worker with a delayed hook to avoid race conditions.
- `src/App.tsx` wires global providers: error boundaries, React Query, theming, auth context, tooltip/toast systems, and `react-router`.
- Routing uses Suspense + lazy-loaded page bundles to keep initial payloads light. Protected routes wrap sensitive pages with `ProtectedRoute`, which checks auth (and admin) state.

```
```48:115:shastra-hub/src/App.tsx
const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ErrorBoundary>
                <Suspense fallback={<PageLoader />}>
                  <Routes>
                    ...
                    <Route
                      path="/admin"
                      element={
                        <ProtectedRoute requireAdmin>
                          <Admin />
                        </ProtectedRoute>
                      }
                    />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </Suspense>
              </ErrorBoundary>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);
```

### State & Data Layer
- `AuthContext` persists the authenticated user, carries role metadata, and synchronizes tokens with the backend using `apiClient`. It refreshes on mount and exposes `login/register/logout`.
- `apiClient` centralizes HTTP requests, attaches bearer tokens, handles refresh-token rotation, and provides typed helpers for each resource (projects, events, blog, etc.).
- React Query caches server state while AuthContext manages session state; UI components consume both through hooks.

```
```1:113:shastra-hub/src/contexts/AuthContext.tsx
const AuthContext = createContext<AuthContextType | undefined>(undefined);
...
const fetchUser = async () => {
  const token = apiClient.getToken();
  if (!token) {
    setUser(null);
    setLoading(false);
    return;
  }
  const response = await apiClient.getMe();
  ...
};
```

```
```1:205:shastra-hub/src/lib/api-client.ts
class ApiClient {
  private async request(endpoint: string, options: RequestInit = {}, retry = true) {
    ...
    if (response.status === 401 && retry && this.refreshTokenValue) {
      const newToken = await this.refreshAccessToken();
      return fetch(url, { ...options, headers: { ...headers, Authorization: `Bearer ${newToken}` }});
    }
    ...
  }
  async getProjects(params?: {...}) { ... }
  async getEvents(params?: {...}) { ... }
  // Similar helpers for blog, resources, gallery, etc.
}
```

### UI System
- `src/components/ui` contains 40+ shadcn/ui wrappers standardized with Tailwind utility classes.
- Feature components (comments, notifications, upload) are collocated with related logic for cohesion.
- `utils/pwa.ts` enables install prompts + service worker registration; `use-mobile` and `ThemeProvider` manage responsiveness and dark mode.

---

## 4. Backend Architecture (Express + Prisma)

### Application Pipeline
`src/app.ts` assembles middleware in a specific order: request IDs → timeouts → logging → performance metrics → compression → sanitization → Helmet → CORS → CSRF token generation + protection → rate limiting → versioned routers → legacy aliases → error handling. It also boots Swagger docs, static uploads, Prisma, and graceful shutdown hooks.

```
```44:225:shastra-hub/backend/src/app.ts
const app: Express = express();
initErrorTracking();
app.use(requestIdMiddleware);
app.use(timeoutMiddleware(30000));
app.use(requestLogger);
app.use(performanceMiddleware);
app.use(compression());
app.use(sanitizeInput);
app.use(helmet({...}));
app.use(cors({...}));
app.use(generateCsrfToken);
app.use(express.json({ limit: '10mb', verify: (req: any, res, buf) => { req.rawBody = buf; }}));
app.use(csrfProtection);
app.use('/api', apiLimiter);
app.get('/health', getHealth);
app.use('/uploads', express.static(...));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use('/api/v1', v1Routes);
// Legacy routes for backward compatibility
...
app.use(notFoundHandler);
app.use(errorHandler);
```

### Layering
- **Routes (`src/routes`)** – Define HTTP surfaces per resource (auth, projects, events, blog, etc.) and delegate to controllers. `routes/v1` aggregates versioned endpoints so old `/api/<resource>` paths can forward to `/api/v1`.
- **Controllers (`src/controllers`)** – Translate HTTP requests into service calls, enforce validation, and marshal responses. Each domain (projects, events, blog, membership, etc.) has its own controller.
- **Services (`src/services`)** – Business logic layer. Each service talks to Prisma repositories, Redis caches, BullMQ queues, and third-party integrations (email, file storage). Examples:
  - `auth.service.ts` handles registration/login, hashing, token issuing.
  - `cache.service.ts` wraps Redis clients for simple TTL and invalidation semantics.
  - `job.service.ts` encapsulates BullMQ queues, worker lifecycle, and graceful shutdown via `closeQueues()`.
- **Middleware (`src/middleware`)** – Cross-cutting concerns like authentication, role enforcement (`moderator.middleware`), caching, rate limiting, performance metrics, request logging, timeouts, and input validation.
- **Utilities (`src/utils`)** – Logging (Winston), error helpers, metrics collectors, Redis stores, image optimization (Sharp), health probes.
- **Prisma (`prisma/schema.prisma`)** – Single source for data modeling; migrations capture schema evolution.

### Background + Auxiliary Systems
- BullMQ jobs handle async workloads (email, notifications, exports) and are drained during graceful shutdown by `job.service`.
- Redis underpins caching and queue backplanes; `cache.service.disconnect()` is part of the shutdown sequence.
- File uploads are stored under `/uploads` (configurable path) and served via static middleware.

### Observability & Resilience
- Comprehensive logging via Winston and request IDs.
- Health endpoints (`/health`, `/ready`, `/live`) report system status; metrics middleware feeds Prometheus-friendly counters/timers.
- Error tracking hook (`initErrorTracking`) integrates with providers like Sentry.
- CSRF protection, Helmet CSP, rate limiting, timeout middleware, and input sanitization make up the security posture.
- Graceful shutdown closes HTTP, queues, cache, and Prisma connections, then forces exit after 10s if stuck.

---

## 5. Data & Auth Flow

1. Frontend stores JWT + refresh tokens in `localStorage` via `apiClient.setTokens`.
2. Each API call includes the access token. On 401, the client automatically exchanges the refresh token for a new pair and retries transparently.
3. Backend validates JWTs in auth middleware, resolves the user + roles, and attaches them to `req.user`.
4. Controllers enforce RBAC (e.g., admin routes) before touching Prisma. Prisma reads/writes PostgreSQL inside transactions where necessary.
5. Mutating operations publish events to queues or flush caches so other nodes stay consistent.

---

## 6. Serving & Deployment Model

- **Development:** `npm run dev:all` spawns both apps with hot reload. Frontend hits backend through `VITE_API_URL` (`http://localhost:3000/api` by default).
- **Production build:** `npm run build` generates backend `dist/` and frontend `dist/`. A process manager (PM2, systemd, or container orchestration) runs `node shastra-hub/backend/dist/app.js`, while any static host serves the frontend build.
- **Environment contracts:** `.env` files define `VITE_API_URL` (frontend), `DATABASE_URL`, `JWT_SECRET`, `REDIS_HOST`, etc. Root setup script copies `.env.example` templates to keep onboarding trivial.

---

## 7. Where To Extend

| Layer            | How to extend                                                |
|------------------|--------------------------------------------------------------|
| Frontend routes  | Add new lazy-loaded page inside `src/pages` and register it in `App.tsx`. Wrap with `ProtectedRoute` if it needs auth/admin access. |
| Shared UI        | Add components to `src/components/ui` or feature-specific folders to keep duplication low. |
| API endpoints    | Create a controller + service pair under `backend/src`, register routes in `routes/v1`, and wire them into `app.ts`. |
| Data models      | Update `prisma/schema.prisma`, run `npx prisma migrate dev`, and expose through services. |
| Background work  | Add BullMQ queues/workers in `job.service.ts`, then call them from services or controllers. |
| Observability    | Extend `utils/metrics.ts` or `error-tracker.ts`, then plug middleware near the top of `app.ts`. |

---

**Last updated:** November 2025  
**Maintainer tip:** Keep architectural documents in `doc/architecture/` so the description evolves with the code.

