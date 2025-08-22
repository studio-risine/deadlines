# Mutations Documentation

## createProcess

### Description
Creates a new process in the database.

### Arguments
- `case_number` (string, required): The unique legal case number.
- `court` (string, required): The court name or jurisdiction.
- `area` (enum, required): The legal area (e.g., civil, labor, criminal, etc.).
- `parties` (object, required): Structured data for party names and roles.
  - `plaintiff` (object):
    - `name` (string, required): Name of the plaintiff.
    - `type` (enum, required): Type of the plaintiff (individual, company, government).
    - `document` (string, optional): Document identifier.
  - `defendant` (object):
    - `name` (string, required): Name of the defendant.
    - `type` (enum, required): Type of the defendant (individual, company, government).
    - `document` (string, optional): Document identifier.
  - `lawyers` (object, optional):
    - `plaintiff` (array of strings, optional): List of plaintiff lawyers.
    - `defendant` (array of strings, optional): List of defendant lawyers.
- `status` (enum, required): The process status (ongoing, suspended, archived, closed).

### Response
- Returns the created process object.

---

## deleteProcess

### Description
Deletes a process from the database.

### Arguments
- `id` (ID, required): The ID of the process to delete.

### Response
- Returns nothing on success.

---

## updateProcess

### Description
Updates an existing process in the database.

### Arguments
- `id` (ID, required): The ID of the process to update.
- `court` (string, optional): The updated court name or jurisdiction.
- `area` (enum, optional): The updated legal area.
- `parties` (object, optional): Updated structured data for party names and roles.
  - `plaintiff` (object):
    - `name` (string, required): Name of the plaintiff.
    - `type` (enum, required): Type of the plaintiff (individual, company, government).
    - `document` (string, optional): Document identifier.
  - `defendant` (object):
    - `name` (string, required): Name of the defendant.
    - `type` (enum, required): Type of the defendant (individual, company, government).
    - `document` (string, optional): Document identifier.
  - `lawyers` (object, optional):
    - `plaintiff` (array of strings, optional): List of plaintiff lawyers.
    - `defendant` (array of strings, optional): List of defendant lawyers.
- `status` (enum, optional): The updated process status (ongoing, suspended, archived, closed).

### Response
- Returns the updated process object.
