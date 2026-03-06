
# Equipment Management System

A React-based Equipment Management System that allows users to manage **Equipment Classes** and their **Properties** within an enterprise hierarchy.
The application uses **Redux Toolkit for global state management**, **Ant Design for UI components**, and integrates with **JSONPlaceholder public APIs** to simulate backend operations.

---

# Project Overview

This system provides a dashboard to manage equipment data in an enterprise structure.

Hierarchy Structure:

Enterprise → Site → Area → Equipment Classes → Properties

Users can:

• View and manage equipment classes
• Create and update equipment classes
• Select an equipment class to manage its properties
• Create and update equipment properties
• View data in responsive tables with sorting and filtering

The application simulates backend CRUD operations using the JSONPlaceholder REST API.

---

# Technologies Used

React (Vite)
Redux Toolkit
React Redux
Axios
Ant Design
Day.js

---

# Architecture

The project follows a **modular architecture** separating UI, state management, and API layers.

```
src
│
├── api
│   ├── axiosInstance.js
│   ├── equipmentClassApi.js
│   └── propertiesApi.js
│
├── components
│   ├── Layout
│   │   ├── TopBar.jsx
│   │   └── Sidebar.jsx
│   │
│   ├── EquipmentClass
│   │   ├── EquipmentClassList.jsx
│   │   ├── EquipmentClassForm.jsx
│   │   └── EquipmentClassTable.jsx
│   │
│   └── EquipmentClassProperties
│       ├── PropertiesList.jsx
│       ├── PropertiesForm.jsx
│       └── PropertiesTable.jsx
│
├── hooks
│   ├── useEquipmentClass.js
│   └── useProperties.js
│
├── store
│   ├── index.js
│   └── slices
│       ├── hierarchySlice.js
│       ├── equipmentClassSlice.js
│       └── propertiesSlice.js
│
├── App.jsx
└── main.jsx
```

---

# Redux State Structure

The application uses three Redux slices.

### Hierarchy Slice

Stores static enterprise hierarchy information.

```
enterprise
site
area
```

This data is displayed in the **TopBar**.

---

### Equipment Class Slice

Manages equipment class records.

```
items
selectedItem
status
error
```

Handles:

* Fetch equipment classes
* Create equipment class
* Update equipment class
* Delete equipment class

---

### Properties Slice

Manages properties belonging to a selected equipment class.

```
items
status
error
```

Handles:

* Fetch properties
* Create property
* Update property
* Delete property

---

# API Integration

The application uses the **JSONPlaceholder public REST API** to simulate backend operations.

Base URL:

```
https://jsonplaceholder.typicode.com
```

Endpoints used:

Equipment Classes:

```
GET    /posts
POST   /posts
PUT    /posts/{id}
DELETE /posts/{id}
```

Properties:

```
GET    /comments?postId={equipmentClassId}
POST   /comments
PUT    /comments/{id}
DELETE /comments/{id}
```

Redux `createAsyncThunk` is used to handle asynchronous API requests.

---

# Features

Equipment Class Management

• Load equipment classes from API
• Create new equipment class
• Update existing equipment class
• Delete equipment class
• Row selection in table
• Form validation

Properties Management

• Load properties when an equipment class is selected
• Create property
• Update property
• Delete property

UI Features

• Responsive layout
• Search and filtering
• Table sorting
• Pagination
• Confirmation dialogs
• Success notifications

---

# Business Rules

The application follows the **autoId convention**:

| autoId Value | Operation              |
| ------------ | ---------------------- |
| 0            | Create new record      |
| >0           | Update existing record |

Immutable fields after creation:

Equipment Class

• id
• effectiveStartDate

Properties

• id
• effectiveStartDate

These fields are disabled in edit mode.

---

# Date Validation Rules

• effectiveStartDate is auto-generated during creation
• effectiveEndDate must be after effectiveStartDate
• Date comparisons are handled using **Day.js**

---

# Responsive Design

The application uses Ant Design's responsive grid system.

Desktop:

Form and table appear side-by-side.

Mobile:

Components stack vertically for better usability.

---

# Installation

Clone the repository:

```
git clone https://github.com/Dhevaya/Equipment_Management_System.git
```

Install dependencies:

```
npm install
```

Run the development server:

```
npm run dev
```

The application will run at:

```
http://localhost:5173
```



