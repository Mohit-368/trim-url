<div align="center">

#  TrimLink

**A URL shortener that actually shortens URLs — plus auth, QR codes, and per-link analytics.**

![Node](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-blue)


</div>

---



| | |
|---|---|
| 🔐 Auth | JWT in an `httpOnly` cookie — invisible to JS, so an XSS bug can't steal it |
| 📊 Analytics | Every redirect logs device type + country, no client-side tracking script |
| 🧱 Frontend | 4-layer architecture: `UI → hooks → api → network` — pages never call `fetch` |
| 📦 QR codes | Auto-generated per link, hosted on ImageKit |
| 🌍 Geolocation | Offline IP→country lookup — zero added latency per redirect |

---

##  Request flow

```mermaid
sequenceDiagram
    participant UI as Login.jsx
    participant Hook as useAuth()
    participant API as auth.api.js
    participant Server as Express API

    UI->>Hook: login(email, password)
    Hook->>API: loginRequest(...)
    API->>Server: fetch (credentials: include)
    Server-->>API: 200 + Set-Cookie (httpOnly)
    API-->>Hook: user object
    Hook->>Hook: dispatch(SET_USER)
    Hook-->>UI: isAuthenticated ✅
```

##  Click tracking flow

```mermaid
flowchart LR
    A[Visitor hits<br/>trim.link/abc] --> B{Link exists<br/>& not expired?}
    B -- No --> C[404 / 410]
    B -- Yes --> D[Parse User-Agent<br/>→ device type]
    D --> E[Resolve IP<br/>→ country]
    E --> F[(MongoDB<br/>$inc clicks,<br/>device, demographics)]
    F --> G[302 redirect<br/>to original URL]
```

##  Architecture

```mermaid
flowchart TB
    subgraph Frontend
        UI[Pages] --> Hooks[Hooks]
        Hooks --> Store[Context Store]
        Hooks --> API[API Layer]
        API --> Client[fetch client]
    end
    Client -->|REST + cookie| Backend

    subgraph Backend
        Routes --> Controllers --> Models
        Controllers --> Mid[Auth Middleware]
    end
    Models --> DB[(MongoDB)]
    Controllers --> IK[ImageKit]
```

---

##  Stack

| Layer | Tech |
|---|---|
| Frontend | React 18, Vite, React Router v6, SCSS |
| Backend | Node.js, Express, Mongoose |
| Auth | JWT, `httpOnly` cookies |
| QR | `qrcode` → ImageKit |
| Geo | `geoip-lite` (offline) |
| Export | `jsPDF`, `html2canvas` |

---

##  API



| Method | Route | 🔒 | Description |
|---|---|:---:|---|
| POST | `/api/auth/register` | | Create account |
| POST | `/api/auth/login` | | Log in |
| POST | `/api/auth/logout` | | Log out |
| GET | `/api/auth/me` | 🔒 | Restore session on refresh |
| GET | `/api/links` | 🔒 | List your links |
| POST | `/api/links` | 🔒 | Create link + QR |
| DELETE | `/api/links/:id` | 🔒 | Delete a link |
| GET | `/api/analytic/:id` | 🔒 | Click/device/country stats |
| GET | `/:trim_link` | | Public redirect + click tracking |



---

##  Run it

```bash
# backend
cd trimlink-backend && npm install
cp .env.example .env   # MONGO_URI, JWT_SECRET, IMAGEKIT_*
npm run dev             # :3000

# frontend
cd trimlink-frontend && npm install
cp .env.example .env
npm run dev             # :5173
```

---

##  Ask me about

- Why a cookie instead of `localStorage` for the JWT
- Why device/country tracking needs zero client-side script
- What I'd swap `useLinks`/`useAnalytics` for at scale (→ TanStack Query)

<div align="center">

Built solo · feedback welcome

</div>
