plugins {
    java
    id("org.springframework.boot") version "4.0.0"
    id("io.spring.dependency-management") version "1.1.0"
}

java {
    toolchain {
        languageVersion.set(JavaLanguageVersion.of(21))
    }
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter-security")
    implementation("org.springframework.boot:spring-boot-starter-oauth2-resource-server")
    implementation("com.fasterxml.jackson.module:jackson-module-parameter-names")

    testImplementation("org.springframework.boot:spring-boot-starter-test")
}

// Allow passing KEYCLOAK_ISSUER_URI as a system property to bootRun

tasks.withType<org.springframework.boot.gradle.tasks.run.BootRun> {
    doFirst {
        if (project.hasProperty("KEYCLOAK_ISSUER_URI")) {
            jvmArgs = listOf("-Dspring.security.oauth2.resourceserver.jwt.issuer-uri=${project.property("KEYCLOAK_ISSUER_URI")}")
        }
    }
}
