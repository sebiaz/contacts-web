# Contacts Web

A modern, responsive frontend for the Contacts API built with SvelteKit, TypeScript, and Bootstrap 5.

## Features

- Contact management (Create, Read, Update, Delete)
- Search contacts by name, email, phone, or company
- Pagination with configurable page size
- Responsive design with Bootstrap 5
- Form validation with Superforms + Zod
- Server-side rendering (SSR) with SvelteKit
- Vite development proxy for API integration

## Tech Stack

- **Framework**: SvelteKit 2.x
- **Language**: TypeScript
- **Styling**: Bootstrap 5.3
- **Forms**: sveltekit-superforms with Zod validation
- **Build Tool**: Vite 5.x
- **Package Manager**: npm

## Project Structure

```
contacts-web/
├── src/
│   ├── lib/
│   │   ├── api/
│   │   │   ├── client.ts        # API client with fetch wrapper
│   │   │   └── types.ts         # TypeScript interfaces
│   │   ├── components/
│   │   │   ├── contacts/        # Contact-specific components
│   │   │   │   ├── ContactTable.svelte
│   │   │   │   ├── SearchBar.svelte
│   │   │   │   ├── ContactForm.svelte
│   │   │   │   └── ContactDetail.svelte
│   │   │   └── ui/              # Reusable UI components
│   │   │       ├── Button.svelte
│   │   │       ├── Modal.svelte
│   │   │       └── Pagination.svelte
│   │   ├── stores/
│   │   │   └── contacts.ts      # Svelte stores for state management
│   │   └── utils/
│   │       └── validation.ts    # Zod schemas
│   ├── routes/
│   │   ├── contacts/
│   │   │   ├── [id]/            # Contact detail/edit/delete pages
│   │   │   ├── create/          # Create contact page
│   │   │   ├── +page.server.ts  # Server load function (fetches contacts)
│   │   │   └── +page.svelte     # Main contacts list page
│   │   ├── +layout.svelte       # Root layout
│   │   └── +page.svelte         # Home page (redirects to contacts)
│   ├── app.css                  # Global styles
│   └── app.html                 # HTML template
├── static/                      # Static assets
├── .env.example                 # Environment variable template
├── .gitignore
├── package.json
├── svelte.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## Quick Start

### Prerequisites

- Node.js 18+
- npm 9+
- Contacts API running on `http://localhost:8080` (see [contacts-api](../contacts-api))

### Installation

```bash
# Clone the repository
git clone https://github.com/sebiaz/contacts-web.git
cd contacts-web

# Install dependencies
npm install

# Copy environment template (optional - defaults work for local dev)
cp .env.example .env

# Start development server
npm run dev
```

The frontend will be available at `http://localhost:5173`.

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `VITE_API_BASE_URL` | `/api/v1` | Base URL for API requests (proxied in dev) |
| `VITE_APP_TITLE` | `Contacts Manager` | Application title |
| `VITE_DEFAULT_PAGE_SIZE` | `20` | Default page size for pagination |

See `.env.example` for all available options.

## Development

### Development Server

```bash
npm run dev
```

Runs on `http://localhost:5173` with Vite proxy forwarding `/api/*` to `http://localhost:8080`.

### Building for Production

```bash
npm run build
```

Outputs to `.build/` directory.

### Preview Production Build

```bash
npm run preview
```

### Type Checking

```bash
npm run check
```

### Linting & Formatting

```bash
# Check formatting
npm run lint

# Fix formatting
npm run format
```

## API Integration

The frontend communicates with the backend via a Vite proxy in development:

```typescript
// vite.config.ts
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
```

In production, both frontend and API should be served from the same origin, or CORS must be configured on the API.

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run check` | Type check with svelte-check |
| `npm run check:watch` | Type check in watch mode |
| `npm run format` | Format with Prettier |
| `npm run lint` | Lint with Prettier + ESLint |

## Project Configuration

### TypeScript

Strict mode enabled. Path aliases configured:
- `$lib` → `src/lib`
- `$lib/*` → `src/lib/*`

### Vite

- Port: 5173
- API proxy: `/api` → `http://localhost:8080`
- SvelteKit plugin enabled

## Security Considerations

- **CORS**: Handled by backend API. Configure `CORS_ALLOWED_ORIGINS` in contacts-api.
- **Input Validation**: Client-side (Zod) + Server-side (API validation).
- **XSS Prevention**: Svelte auto-escapes by default.
- **Dependencies**: Run `npm audit` regularly. Update dependencies to patch vulnerabilities.

## Deployment

### Static Adapter (Recommended)

```bash
npm install -D @sveltejs/adapter-static
```

Configure in `svelte.config.js`:
```javascript
import adapter from '@sveltejs/adapter-static';

export default {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: 'index.html'
    })
  }
};
```

### Docker

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
```

## License

MIT License