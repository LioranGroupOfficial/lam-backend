# Lioran API Marketplace Backend

NestJS + MongoDB backend for the Lioran API marketplace. This service handles:

- Clerk-based authentication
- MongoDB persistence with Mongoose
- Global rate limiting with `@nestjs/throttler`
- CRUD APIs for marketplace resources
- User sync from Clerk into the local `users` collection

## Stack

- NestJS 11
- TypeScript
- MongoDB + Mongoose
- Clerk auth
- Class Validator / Class Transformer

## Project Structure

```text
src/
  api-docs/
  api-keys/
  api-usage/
  apis/
  auth/
  categories/
  common/
  config/
  conversion-logs/
  decorators/
  providers/
  ratings/
  reviews/
  users/
  wallet-transactions/
  webhooks/
```

## Environment

Create a `.env.local` file in `lam-backend/` with:

```env
MONGODB_URI=mongodb://localhost:27017
CLERK_SECRET_KEY=sk_test_xxx
PRODUCTION=false
PORT=3000
```

## Install

```bash
pnpm install
```

## Run

```bash
pnpm run start:dev
```

## Build

```bash
pnpm run build
```

## Auth Model

- Clerk auth is enforced globally through `ClerkAuthGuard`.
- Any route without `@Public()` requires `Authorization: Bearer <clerk_jwt>`.
- Public browse routes are exposed for marketplace discovery.
- `GET /users/me` creates or updates the local marketplace user from Clerk profile data.

## Rate Limiting

Global throttling lives in `src/config/constants.ts`.

- Default: 100 requests / minute
- Auth-sensitive routes: 5 requests / minute
- `GET /users/me` uses the auth-specific throttle

## Data Model

### User

```ts
{
  clerkId: string;
  username: string;
  email: string;
  avatarUrl?: string;
  bio: string;
  socialLinks: { platform: string; url: string }[];
  wallet: {
    spend: number;
    withdrawable: number;
    pending: number;
  };
  apiLimit: number;
  banned: boolean;
  banReason?: string;
  suspended: boolean;
  suspendedReason?: string;
  createdAt: Date;
  updatedAt: Date;
}
```

### Marketplace Collections

- `categories`
- `apis`
- `apiDocs`
- `apiKeys`
- `apiUsage`
- `walletTransactions`
- `conversionLogs`
- `reviews`
- `ratings`

Each module includes:

- Mongoose schema
- `create-*` DTO
- `update-*` DTO
- service
- controller
- Nest module registration

## Route Summary

Full route docs live in [docs/API_REFERENCE.md](c:\Users\Omen\Downloads\projects\LAM\lam-backend\docs\API_REFERENCE.md).

### Public Routes

- `GET /`
- `GET /users`
- `GET /users/clerk/:clerkId`
- `GET /users/:id`
- `GET /categories`
- `GET /categories/:id`
- `GET /apis`
- `GET /apis/:id`
- `GET /api-docs`
- `GET /api-docs/:id`
- `GET /reviews`
- `GET /reviews/:id`
- `GET /ratings`
- `GET /ratings/:id`

### Authenticated Routes

- `GET /auth/me`
- `GET /users/me`
- All `POST`, `PATCH`, and `DELETE` CRUD endpoints
- `GET /api-keys`
- `GET /api-usage`
- `GET /wallet-transactions`
- `GET /conversion-logs`
- `POST /webhooks/clerk`

## Module Notes

### Users

- Local marketplace user profile is stored separately from Clerk.
- `GET /users/me` upserts a local record from the Clerk token payload.
- Users support full CRUD plus lookup by Clerk id.

### APIs

- APIs belong to an owner via `ownerId`.
- APIs belong to a category via `categoryId`.
- List endpoint supports `ownerId`, `categoryId`, and `isActive` filters.

### API Docs

- Stores documentation per API.
- Supports nested routes, argument definitions, and request/response examples.

### API Keys

- Stores a marketplace key record linked to a user.
- Per-key permissions support `apiId`, `maxCostPerRequest`, and `rpm`.

### API Usage

- Tracks request outcome, latency, cost, commission, and owner earnings.

### Wallet Transactions

- Tracks wallet debits, credits, withdrawals, deposits, and conversions.

### Conversion Logs

- Tracks internal wallet conversions between `SPEND` and `WITHDRAWABLE`.

### Reviews and Ratings

- Reviews store text content.
- Ratings store numeric values from 1 to 5.

## Validation

DTOs use `class-validator`, and the app runs with a global validation pipe:

- `whitelist: true`
- `forbidNonWhitelisted: true`

That means extra request fields are rejected.

## Current Assumptions

- Business rules are not yet fully enforced at the domain level.
- Owner-only updates/deletes are not implemented yet.
- API key values are stored directly and are not hashed yet.
- Rating aggregation into `Api.avgRating` and `Api.totalRatings` is not automatic yet.
- Wallet balances are not auto-mutated from transaction records yet.

## Recommended Next Steps

- Add role/ownership guards
- Hash and rotate API keys
- Add Swagger/OpenAPI docs
- Add pagination for list endpoints
- Add search/sort endpoints for marketplace discovery
- Add business workflows for balances, purchases, and rating aggregation
