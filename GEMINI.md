# Architecture: Multi-Tenant KRA eTIMS Integration

NDUKAPOS implements a **Schema-Isolated Multi-Tenant Architecture**. This means every shop's data (Sales, Customers, Inventory) is physically separated at the database level.

### 1. The Transmission Flow
1. **Sale Completion:** User clicks "Complete Sale" in the POS.
2. **Local Storage:** Sale is saved to the tenant's private schema.
3. **Tax Service:** The `ETIMSService` fetches the tenant's specific `ETIMSDevice` credentials.
4. **KRA Handshake:** A JSON payload is signed and sent to the KRA API.
5. **Compliance Receipt:** KRA returns an Invoice Number and QR Code, which is saved back to the sale record and printed on the receipt.

### 2. SuperAdmin Governance
The SuperAdmin has a global view into:
- **System Metrics:** Via `psutil` integration (CPU/RAM/Disk).
- **Security:** Global IP blocking and centralized audit logs across all tenants.
- **Revenue:** Platform-wide M-Pesa transaction tracking.

### 3. Localization
The project uses `next-intl` for the frontend and Django's built-in `I18N` for the backend, supporting Swahili and English out of the box.
