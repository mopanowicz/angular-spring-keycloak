# small instruction for running both locally

To run locally during development:

1) Start Keycloak and create a realm + client (public client for the SPA, or confidential with proper CORS + redirect URIs).
2) Configure the client and realm, and note the realm issuer URL (e.g. https://keycloak.example.com/realms/myrealm).

Run backend:
- cd backend
- ./gradlew bootRun -PKEYCLOAK_ISSUER_URI=https://keycloak.example.com/realms/myrealm

Run frontend:
- cd frontend
- npm install
- npm start

The Angular app expects the backend at the same origin (when proxied) or uses absolute /api paths; configure CORS in backend for localhost:4200.
