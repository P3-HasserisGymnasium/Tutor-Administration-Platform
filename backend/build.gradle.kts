plugins {
	java
	id("org.springframework.boot") version "3.3.5"
	id("io.spring.dependency-management") version "1.1.6"
}

group = "project"
version = "0.0.1-SNAPSHOT"

java {
	toolchain {
		languageVersion.set(JavaLanguageVersion.of(17))
	}
}

repositories {
	mavenCentral()
}

dependencies {
    implementation("org.springframework.boot:spring-boot-starter-data-jpa")
	implementation("mysql:mysql-connector-java:8.0.33")
    implementation("org.springframework.boot:spring-boot-starter-web")
    implementation("org.springframework.boot:spring-boot-starter")

	// For bcrypt password hashing
    implementation("org.springframework.boot:spring-boot-starter-security")

	testImplementation("org.springframework.boot:spring-boot-starter-test")
	testRuntimeOnly("org.junit.platform:junit-platform-launcher")
    
    implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
    implementation("org.jetbrains.kotlin:kotlin-reflect")
    implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")

	// For JWT
	implementation("io.jsonwebtoken:jjwt-api:0.11.5") // Core JWT API
    implementation("io.jsonwebtoken:jjwt-impl:0.11.5") // Default implementation
    implementation("io.jsonwebtoken:jjwt-jackson:0.11.5") // Jackson support for JSON
	implementation("io.jsonwebtoken:jjwt:0.9.1") 
    implementation("jakarta.servlet:jakarta.servlet-api:6.0.0")

}

tasks.withType<Test> {
	useJUnitPlatform()
}
