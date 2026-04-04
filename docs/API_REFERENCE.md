# API Reference

Base URL: `http://localhost:3000`

Auth:

- Protected routes require `Authorization: Bearer <clerk_token>`
- Routes marked `Public` can be called without auth

## Health

### `GET /`

Public.

Returns the app hello message.

## Auth

### `GET /auth/me`

Protected.

Returns the authenticated Clerk user object attached by the global auth guard.

## Users

### `GET /users/me`

Protected.

Creates or updates the local marketplace user from the Clerk profile and returns it.

### `POST /users`

Protected.

Create body:

```json
{
  "clerkId": "user_123",
  "username": "lioran",
  "email": "lioran@example.com",
  "avatarUrl": "https://cdn.example.com/avatar.png",
  "bio": "Builder",
  "socialLinks": [
    {
      "platform": "x",
      "url": "https://x.com/lioran"
    }
  ],
  "wallet": {
    "spend": 0,
    "withdrawable": 0,
    "pending": 0
  },
  "apiLimit": 1000,
  "banned": false,
  "suspended": false
}
```

### `GET /users`

Public.

Returns all users ordered by newest first.

### `GET /users/clerk/:clerkId`

Public.

Look up a user by Clerk id.

### `GET /users/:id`

Public.

Look up a user by Mongo id.

### `PATCH /users/:id`

Protected.

Update body uses the same shape as `POST /users`, with all fields optional.

### `DELETE /users/:id`

Protected.

Deletes a user document.

## Categories

### `POST /categories`

Protected.

```json
{
  "name": "AI",
  "slug": "ai"
}
```

### `GET /categories`

Public.

### `GET /categories/:id`

Public.

### `PATCH /categories/:id`

Protected.

### `DELETE /categories/:id`

Protected.

## APIs

### `POST /apis`

Protected.

```json
{
  "name": "OCR API",
  "description": "Extracts text from images",
  "ownerId": "680000000000000000000001",
  "pricePerRequest": 2.5,
  "pricingModel": "FIXED",
  "baseUrl": "https://api.example.com/ocr",
  "timeout": 10000,
  "headersTemplate": {
    "x-api-version": "1"
  },
  "categoryId": "680000000000000000000002",
  "image": "https://cdn.example.com/ocr.png",
  "testApiKey": "test_key",
  "isActive": true
}
```

### `GET /apis`

Public.

Optional query params:

- `ownerId`
- `categoryId`
- `isActive`

### `GET /apis/:id`

Public.

### `PATCH /apis/:id`

Protected.

All create fields are optional.

### `DELETE /apis/:id`

Protected.

## API Docs

### `POST /api-docs`

Protected.

```json
{
  "apiId": "680000000000000000000010",
  "baseUrl": "https://api.example.com",
  "authType": "API_KEY",
  "description": "Developer docs for OCR API",
  "headers": {
    "Authorization": "Bearer <key>"
  },
  "routes": [
    {
      "path": "/ocr",
      "method": "POST",
      "description": "Run OCR",
      "arguments": [
        {
          "name": "imageUrl",
          "type": "string",
          "required": true,
          "description": "Public image URL",
          "example": "https://site.com/image.png"
        }
      ],
      "requestExample": {
        "imageUrl": "https://site.com/image.png"
      },
      "responseExample": {
        "text": "hello world"
      },
      "errorExample": {
        "message": "Invalid image"
      }
    }
  ]
}
```

### `GET /api-docs`

Public.

Optional query params:

- `apiId`

### `GET /api-docs/:id`

Public.

### `PATCH /api-docs/:id`

Protected.

### `DELETE /api-docs/:id`

Protected.

## API Keys

### `POST /api-keys`

Protected.

```json
{
  "userId": "680000000000000000000001",
  "apiKey": "live_marketplace_key",
  "name": "Production Key",
  "permissions": [
    {
      "apiId": "680000000000000000000010",
      "maxCostPerRequest": 25,
      "rpm": 60
    }
  ],
  "banned": false,
  "suspended": false
}
```

### `GET /api-keys`

Protected.

Optional query params:

- `userId`
- `apiId`

### `GET /api-keys/:id`

Protected.

### `PATCH /api-keys/:id`

Protected.

### `DELETE /api-keys/:id`

Protected.

## API Usage

### `POST /api-usage`

Protected.

```json
{
  "apiId": "680000000000000000000010",
  "userId": "680000000000000000000011",
  "ownerId": "680000000000000000000001",
  "apiKeyId": "680000000000000000000020",
  "status": "SUCCESS",
  "latency": 240,
  "responseCode": 200,
  "cost": 2.5,
  "commission": 0.5,
  "netToOwner": 2
}
```

### `GET /api-usage`

Protected.

Optional query params:

- `apiId`
- `userId`
- `ownerId`
- `apiKeyId`
- `status`

### `GET /api-usage/:id`

Protected.

### `PATCH /api-usage/:id`

Protected.

### `DELETE /api-usage/:id`

Protected.

## Wallet Transactions

### `POST /wallet-transactions`

Protected.

```json
{
  "userId": "680000000000000000000001",
  "type": "CREDIT",
  "amount": 100,
  "fee": 5,
  "netAmount": 95,
  "referenceId": "680000000000000000000030"
}
```

### `GET /wallet-transactions`

Protected.

Optional query params:

- `userId`
- `type`

### `GET /wallet-transactions/:id`

Protected.

### `PATCH /wallet-transactions/:id`

Protected.

### `DELETE /wallet-transactions/:id`

Protected.

## Conversion Logs

### `POST /conversion-logs`

Protected.

```json
{
  "userId": "680000000000000000000001",
  "from": "SPEND",
  "to": "WITHDRAWABLE",
  "amount": 50,
  "fee": 2
}
```

### `GET /conversion-logs`

Protected.

Optional query params:

- `userId`
- `from`
- `to`

### `GET /conversion-logs/:id`

Protected.

### `PATCH /conversion-logs/:id`

Protected.

### `DELETE /conversion-logs/:id`

Protected.

## Reviews

### `POST /reviews`

Protected.

```json
{
  "apiId": "680000000000000000000010",
  "userId": "680000000000000000000011",
  "content": "Very reliable OCR output."
}
```

### `GET /reviews`

Public.

Optional query params:

- `apiId`
- `userId`

### `GET /reviews/:id`

Public.

### `PATCH /reviews/:id`

Protected.

### `DELETE /reviews/:id`

Protected.

## Ratings

### `POST /ratings`

Protected.

```json
{
  "apiId": "680000000000000000000010",
  "userId": "680000000000000000000011",
  "rating": 5
}
```

### `GET /ratings`

Public.

Optional query params:

- `apiId`
- `userId`

### `GET /ratings/:id`

Public.

### `PATCH /ratings/:id`

Protected.

### `DELETE /ratings/:id`

Protected.

## Clerk Webhook

### `POST /webhooks/clerk`

Protected by the app guard as currently wired.

Current behavior:

- handles `user.created`
- upserts the user in MongoDB

If this endpoint needs to be called directly by Clerk without a bearer token, mark it `@Public()` and add webhook signature verification before production use.
