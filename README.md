# Shopify Dashboard

A Next.js dashboard for managing Shopify tenant data, including customers, orders, products, reports, and more.

---

## Setup Instructions

1. **Clone the repository:**
   ```sh
   git clone <repo-url>
   cd shopify-dashboard
   ```

2. **Install dependencies:**
   ```sh
   npm install
   # or
   yarn install
   ```

3. **Configure environment variables:**
   - Create a `.env.local` file in the root directory.
   - Add your backend API URL:
     ```
     NEXT_PUBLIC_BACKEND_URL=https://shopify-ingestion-backend.onrender.com
     ```

4. **Run the development server:**
   ```sh
   npm run dev
   # or
   yarn dev
   ```

5. **Open the app:**
   - Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Architecture Diagram

## System Architecture

![Architecture Diagram](./docs/architecture.png)

---

## API Endpoints

All endpoints are prefixed with `/shopify/` unless otherwise noted.

| Endpoint                        | Method | Description                        |
|----------------------------------|--------|------------------------------------|
| `/tenants/onboard`               | POST   | Onboard a new tenant               |
| `/tenants/login`                 | POST   | Login via API key or email/password|
| `/shopify/profile`               | GET    | Get tenant profile                 |
| `/shopify/customers`             | GET    | List customers                     |
| `/shopify/products`              | GET    | List products                      |
| `/shopify/orders`                | GET    | List orders                        |
| `/shopify/sync`                  | POST   | Sync Shopify data                  |
| `/shopify/checkouts`             | GET    | List checkouts                     |
| `/shopify/checkouts/abandoned`   | GET    | List abandoned checkouts           |
| `/shopify/reports/summary`       | GET    | Get summary KPIs                   |
| `/shopify/reports/orders-over-time` | GET | Orders over time                   |
| `/shopify/reports/top-customers` | GET    | Top customers by spend             |
| `/shopify/reports/top-products`  | GET    | Top products by sales              |
| `/shopify/reports/revenue-forecast` | GET | Revenue forecast                   |

---

## Database Schema (Simplified)

**Tenants**
- `id`: integer, PK
- `name`: string
- `email`: string
- `api_key`: string
- `shop_url`: string
- `access_token`: string
- `created_at`: datetime

**Customers**
- `id`: integer, PK
- `tenant_id`: integer, FK
- `first_name`: string
- `last_name`: string
- `email`: string
- `is_active`: boolean

**Products**
- `id`: integer, PK
- `tenant_id`: integer, FK
- `title`: string
- `sku`: string
- `vendor`: string
- `price`: float
- `is_active`: boolean

**Orders**
- `id`: integer, PK
- `tenant_id`: integer, FK
- `order_number`: string
- `total_price`: float
- `created_at`: datetime
- `updated_at`: datetime

**OrderItems**
- `id`: integer, PK
- `order_id`: integer, FK
- `product_id`: integer, FK
- `quantity`: integer
- `price`: float

**Checkouts**
- `id`: integer, PK
- `tenant_id`: integer, FK
- `checkout_id`: string
- `email`: string
- `total_price`: float
- `items`: JSON

---

## Known Limitations & Assumptions

- **API Key Storage:** API key is stored in `localStorage` for authentication. This is not recommended for production security.
- **Backend URL:** Assumes the backend is available at `NEXT_PUBLIC_BACKEND_URL`.
- **Shopify Sync:** Data sync relies on Shopify API access tokens and may be rate-limited.
- **Multi-Tenant:** Each tenant is isolated by API key.
- **No SSR:** All data fetching is client-side; SEO is limited.
- **Error Handling:** Basic error handling; may need improvement for production.
- **DB Schema:** Actual schema may differ; above is a simplified reference.

---

## Contact

For support or onboarding, contact your admin or open
