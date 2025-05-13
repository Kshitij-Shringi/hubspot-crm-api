# HubSpot CRM API Integration

This is a Node.js API service that integrates with HubSpot CRM to manage contacts, companies, and deals.

## Prerequisites

- Node.js installed
- HubSpot account with API access
- HubSpot API token (Private App Token)

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up HubSpot Private App:
   - Go to HubSpot Settings > Account Setup > Integrations > Private Apps
   - Click "Create a private app"
   - Name your app (e.g., "CRM API Integration")
   - Select the following required scopes:
     - `crm.objects.contacts.write`
     - `crm.objects.companies.write`
     - `crm.objects.deals.write`
   - Create the app and copy the generated token
4. Create a `.env` file in the root directory and add your HubSpot token:
   ```
   HUBSPOT_TOKEN=your_hubspot_private_app_token
   ```
5. Start the server:
   ```bash
   node index.js
   ```

The server will run on `http://localhost:3000`

## API Documentation

### 1. Create Contact
Creates a new contact in HubSpot CRM.

**Endpoint:** `POST /add-contact`

**Request Body:**
```json
{
  "email": "required@example.com",
  "firstname": "optional",
  "lastname": "optional"
}
```

**Response:**
```json
{
  "message": "Contact added",
  "data": {
    // HubSpot contact object
  }
}
```

### 2. Create Company
Creates a new company in HubSpot CRM.

**Endpoint:** `POST /add-company`

**Request Body:**
```json
{
  "name": "required",
  "domain": "optional",
  "industry": "optional"
}
```

**Response:**
```json
{
  "message": "Company added",
  "data": {
    // HubSpot company object
  }
}
```

### 3. Create Deal
Creates a new deal in HubSpot CRM.

**Endpoint:** `POST /add-deal`

**Request Body:**
```json
{
  "dealname": "required",
  "amount": "optional",
  "pipeline": "optional (default: 'default')",
  "dealstage": "optional (default: 'appointment')"
}
```

**Response:**
```json
{
  "message": "Deal added",
  "data": {
    // HubSpot deal object
  }
}
```

## Error Handling

All endpoints return appropriate error responses:

- `400 Bad Request`: When required fields are missing
- `500 Internal Server Error`: When there's an error communicating with HubSpot

Error response format:
```json
{
  "error": "Error message"
}
```

## Example Usage

### Using cURL

1. Create a contact:
```bash
curl -X POST http://localhost:3000/add-contact \
  -H "Content-Type: application/json" \
  -d '{"email": "test@example.com", "firstname": "John", "lastname": "Doe"}'
```

2. Create a company:
```bash
curl -X POST http://localhost:3000/add-company \
  -H "Content-Type: application/json" \
  -d '{"name": "Example Corp", "domain": "example.com", "industry": "Technology"}'
```

3. Create a deal:
```bash
curl -X POST http://localhost:3000/add-deal \
  -H "Content-Type: application/json" \
  -d '{"dealname": "New Project", "amount": "10000", "pipeline": "default", "dealstage": "appointment"}'
```

## Notes

- All endpoints require a valid HubSpot API token in the `.env` file
- The API uses HubSpot's v3 API endpoints
- Default values are provided for optional fields
- All responses include the complete object data returned by HubSpot 