# Equipment Management System

A React-based web application for managing equipment classes and their associated properties within an enterprise manufacturing hierarchy.

---

## Project Setup

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/Dhevaya/Equpiment_Management_System.git
cd Equpiment_Management_System

# Install dependencies
npm install
```

---

## How to Run

```bash
# Start the development server
npm run dev
```

Open your browser and navigate to `http://localhost:5173`.

```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

---

## Technologies Used

| Technology | Version | Purpose |
|---|---|---|
| React | 19 | UI framework |
| Vite | 7 | Build tool and dev server |
| Redux Toolkit | 2 | Global state management |
| React Redux | 9 | React bindings for Redux |
| Ant Design | 6 | UI component library |
| Axios | 1 | HTTP client |
| Day.js | 1 | Date parsing and formatting |
| React Router DOM | 7 | Client-side routing (installed) |

**Mock API:** [JSONPlaceholder](https://jsonplaceholder.typicode.com) is used as a stand-in REST backend (`/posts` → Equipment Classes, `/comments` → Properties).

---

## Architecture

```
src/
├── api/
│   ├── axiosInstance.js          # Axios instance (baseURL: jsonplaceholder)
│   ├── equipmentClassApi.js      # GET / POST / PUT / DELETE for /posts
│   └── propertiesApi.js          # GET / POST / PUT / DELETE for /comments
│
├── store/
│   ├── index.js                  # Redux store configuration
│   └── slices/
│       ├── hierarchySlice.js     # Static enterprise/site/area hierarchy data
│       ├── equipmentClassSlice.js# Equipment class CRUD + async thunks
│       └── propertiesSlice.js    # Properties CRUD + async thunks
│
├── hooks/
│   ├── useEquipmentClass.js      # Selector + action dispatcher for equipment classes
│   └── useProperties.js          # Selector + action dispatcher for properties
│
├── components/
│   ├── Layout/
│   │   ├── TopBar.jsx            # Header bar showing enterprise/site/area
│   │   └── Sidebar.jsx           # Collapsible navigation sidebar
│   ├── EquipmentClass/
│   │   ├── EquipmentClassList.jsx  # Container: search, layout, messages
│   │   ├── EquipmentClassTable.jsx # Table: sort, filter, select, delete
│   │   └── EquipmentClassForm.jsx  # Form: create / edit equipment class
│   └── EquipmentClassProperties/
│       ├── PropertiesList.jsx    # Container: search, layout, messages
│       ├── PropertiesTable.jsx   # Table: sort, select, delete
│       └── PropertiesForm.jsx    # Form: create / edit property
│
└── App.jsx                       # Root layout, page-level navigation state
```

### State Management Pattern

Each module follows the same three-layer pattern:

```
API layer (axiosInstance)
    ↓
Redux slice (createAsyncThunk)
    ↓
Custom hook (useSelector + useDispatch)
    ↓
List component (Container)
    ↓
Table + Form components (Presentational)
```

### Data Model Conventions

- `autoId: 0` — signals a **create** operation to the slice
- `autoId > 0` — signals an **update** or **delete** operation
- Equipment Class IDs are formatted as `EQUIP001`, `EQUIP002`, etc.

---

## Features

### Equipment Classes
- View all equipment classes in a sortable, paginated table
- Create a new equipment class with ID, description, effective start date, and optional effective end date
- Edit an existing equipment class (row click to populate form)
- Delete an equipment class with a confirmation dialog
- Search/filter by Equipment Class ID or description
- Filter table by Status (Active / Inactive)
- Column sorting on ID, Description, and Created date
- Effective end date must be after the effective start date (form validation)
- Effective start date is automatically set to the current date on create

### Properties
- Properties are scoped to the selected equipment class
- View, create, edit, and delete properties per equipment class
- Search/filter by Property ID, description, value, or unit of measure (UOM)
- Column sorting on Property ID, Description, Value, and Created date
- Unique Property ID validation (no duplicate IDs within a class)

### General
- Success toast notifications for all create, update, and delete operations
- Responsive layout — sidebar collapses on screens narrower than `lg` breakpoint
- Top bar displays live enterprise hierarchy context (Enterprise → Site → Area)
- Empty state messaging when no equipment class is selected

