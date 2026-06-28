# Angular 20 + Spring Boot 4 example secured with Keycloak

This repository contains two example apps showing how to secure an Angular 20 frontend and a Spring Boot 4 backend with Keycloak (OpenID Connect).

Structure:
- frontend/ — Angular 20 app (uses keycloak-js)
- backend/ — Spring Boot 4 app configured as an OAuth2 resource server (JWT introspection via issuer-uri)

Notes:
- Replace Keycloak placeholders (issuer URLs, realm, client IDs) with your Keycloak server values.
- See each subproject README and the top-level README for quick start instructions.
