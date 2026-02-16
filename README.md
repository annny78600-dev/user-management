# User Management App

A simple **React + TypeScript** user management app with a JSON-server backend.
---

## Setup Instructions

1. Clone the repository:
```bash
git clone https://github.com/annny78600-dev/user-management.git
cd user-management
```

2. Install dependencies:
```bash
npm install
```

3.Start the JSON-server backend:
```bash
npm run server
```

4. Start the React app:
```bash
npm run dev
```

Adding New Form Fields

1. Open src/config/userFormConfig.ts.

2. Add a new object to userFormFields:

```bash
{
  name: "fieldName",
  label: "Field Label",
  type: "text", // or "email", "phone", etc.
  required: true
}
```

3. The form, table, and validation will automatically handle the new field.