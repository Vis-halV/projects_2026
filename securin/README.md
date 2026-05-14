# CPE Parser & Viewer (Full-Stack)

## Overview
This project ingests **NVD/MITRE CPE Dictionary** XML data, stores normalized CPE fields in **PostgreSQL**, exposes the stored records via a small **Express** API, and renders them in a **React** UI.

It's intended as a simple end-to-end reference for:
- parsing CPE 2.2 + 2.3 identifiers from the official CPE dictionary XML
- persisting parsed records into Postgres
- serving the data through a JSON endpoint
- browsing the results in a lightweight web UI

## Tech Stack

**Frontend**
- React (Vite) + TypeScript
- Tailwind CSS
- shadcn/ui-style components (local `src/components/ui`)
- `moment` for date formatting

**Backend**
- Node.js
- Express (with `cors`)
- `pg` (PostgreSQL client)
- `xml2js` (XML -> JS object parsing)

**Database**
- PostgreSQL

## Features
- Parse CPE entries from a CPE dictionary XML file
- Persist parsed rows to PostgreSQL
- Simple JSON API to retrieve parsed rows
- React UI to display CPE title, CPE 2.2 URI, CPE 2.3 URI, references, and deprecation dates

## Project Structure
```text
.
|-- cpe-back/
|   |-- data/
|   |   |-- test.xml                
|   |   `-- official-cpe-dictionary_v2.xml  # XML data (~686MB)
|   |-- server.js                   
|   |-- xmlparse.js
|   `-- package.json
`-- cpe-ui/         
    |-- src/
    |   |-- components/
    |   |   |-- DataTable.tsx       
    |   |   `-- ui/table.tsx        
    |   |-- lib/utils.ts            
    |   |-- App.tsx
    |   `-- main.tsx
    |-- vite.config.ts
    `-- package.json
```

## Installation

### Prerequisites
- npm
- Node.js (recommended: v20+)
- PostgreSQL (recommended: v14+)

### Clone the Repository
```bash
git clone <your-repo-url>
cd securin
```

### Backend Setup
```bash
cd cpe-back
npm install
```

Create the database and table (see the **Database** section), then seed from XML:
```bash
node xmlparse.js
```

Start the API:
```bash
npm start
```

The backend listens on `http://localhost:5000`.

### Frontend Setup
```bash
cd cpe-ui
npm install
```

## Running the Application

### Run Backend
```bash
cd cpe-back
npm start
```

### Refresh Data (XML -> Postgres)
```bash
cd cpe-back
node xmlparse.js
```

### Run Frontend
```bash
cd cpe-ui
npm run dev
```

Vite will print the local URL (typically `http://localhost:5173`).

## API Documentation

### `GET /xmldata`
Returns all stored CPE rows from Postgres table `xmldata`.

**Response (example shape)**
```json
[
  {
    "id": 1,
    "cpe_title": "Example title",
    "cpe_22_uri": "cpe:/a:vendor:product:1.0",
    "cpe_23_uri": "cpe:2.3:a:vendor:product:1.0:*:*:*:*:*:*:*",
    "reference_links": ["https://example.com"],
    "cpe_22_deprecation_date": null,
    "cpe_23_deprecation_date": null
  }
]
```

## Database
The backend expects a PostgreSQL database named `securin` (configurable) with a table named `xmldata`.

Suggested schema (compatible with the current code in `xmlparse.js` and `server.js`):
```sql
CREATE TABLE IF NOT EXISTS xmldata (
  id BIGSERIAL PRIMARY KEY,
  cpe_title TEXT,
  cpe_22_uri TEXT,
  cpe_23_uri TEXT,
  reference_links TEXT[],
  cpe_22_deprecation_date TIMESTAMPTZ,
  cpe_23_deprecation_date TIMESTAMPTZ
);
```

Notes:
- `xmlparse.js` currently inserts `NULL` for deprecation dates.
- `reference_links` is stored as a Postgres `TEXT[]`.

## Contributing
1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-change`
3. Make changes and ensure:
   - `cd cpe-ui && npm run lint`
   - `cd cpe-ui && npm run build`
4. Open a pull request

## License
This project uses only open-source software and is intended for academic research and experimentation.
