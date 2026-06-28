# Backend (Spring Boot 4)

This service exposes two endpoints:
- GET /api/public — accessible without authentication
- GET /api/secure — requires a valid JWT issued by Keycloak

Quick start:
1. cd backend
2. ./gradlew bootRun -PKEYCLOAK_ISSUER_URI=https://keycloak.example.com/realms/myrealm

Replace KEYCLOAK_ISSUER_URI with your Keycloak realm's issuer URI (e.g. https://keycloak.example.com/realms/<realm>)
