# Legal Deadlines Management

## Domain
**Legal Deadlines Management**

## Description
In legal procedures, a **deadline** (*prazo*) is a specific time frame within which a task must be completed.  
Missing a deadline can cause serious consequences, such as losing the right to present a defense or appeal.  
Deadlines can be **fatal (non-extendable)** or **extendable**.

---

## Entities

### 1. Deadline
Represents a legal deadline associated with a case.

**Fields:**
- `deadlineId`: Unique identifier of the deadline  
- `taskDescription`: What must be done (e.g., Submit appeal)  
- `deadlineDate`: The final date and time to complete the task (ISO format)  
- `timeUnit`: Unit used for calculation (`businessDays` or `calendarDays`)  
- `remainingDays`: Number of days left until deadline  
- `isExpired`: Boolean indicating if the deadline has passed  
- `isExtendable`: Boolean indicating if the deadline can be extended  
- `completionStatus`: Status of the deadline (`pending`, `done`, `missed`)  
- `assignedTo`: Person responsible for the task  

---

### 2. Case
Represents a legal case containing multiple deadlines.

**Fields:**
- `caseId`: Unique identifier of the case  
- `courtName`: Court handling the case  
- `procedureType`: Type of procedure (`Civil`, `Criminal`, `Labor`)  
- `deadlines`: List of associated deadlines  

---

## Examples

```json
{
  "caseId": "2025-00123",
  "courtName": "Supreme Court of Justice",
  "procedureType": "Civil",
  "deadlines": [
    {
      "deadlineId": "DL-001",
      "taskDescription": "Submit defense statement",
      "deadlineDate": "2025-09-10T23:59:59Z",
      "timeUnit": "businessDays",
      "remainingDays": 12,
      "isExpired": false,
      "isExtendable": false,
      "completionStatus": "pending",
      "assignedTo": "John Doe"
    },
    {
      "deadlineId": "DL-002",
      "taskDescription": "File an appeal",
      "deadlineDate": "2025-09-25T23:59:59Z",
      "timeUnit": "calendarDays",
      "remainingDays": 27,
      "isExpired": false,
      "isExtendable": true,
      "completionStatus": "pending",
      "assignedTo": "Jane Smith"
    }
  ]
}
