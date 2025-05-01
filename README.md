# Descripció - Enunciat de Tasca S5.02 Aplicació Web Mascota Virtual

En aquest projecte se seleccionarà una IA per crear el frontend d'una app de mascotes virtuals, s'analitzarà i s'ajustarà el codi generat, i s'intentarà connectar-lo amb un backend simple en Java.

# Nivell 1

L’aplicació permet als usuaris crear, cuidar i personalitzar mascotes virtuals de fantasia (com dracs, licorns o extraterrestres). Cada usuari pot registrar-se, iniciar sessió i gestionar les seves mascotes mitjançant funcionalitats bàsiques com crear, llegir, actualitzar i eliminar (CRUD). A més, s’hi implementa un sistema de ROLES:

Usuari (ROLE_USER): només pot gestionar les seves pròpies mascotes.
Administrador (ROLE_ADMIN): té accés complet a totes les mascotes del sistema, independentment del propietari.

# Fases de l’exercici:

* Backend (Spring Boot + MySQL + Swagger)
Creat amb IntelliJ i Spring Initializr.
Configures MySQL a application.properties.
Crees entitats User i Mascota.
Implementes CRUD amb JPA i controladors REST.
Afegeixes JWT per login i rols (ROLE_USER, ROLE_ADMIN).
Swagger activat a /swagger-ui/index.html.

* Frontend (React)
Creat amb create-react-app.
Components: login, registre, llista i detall de mascotes.
Ús de axios per cridar l'API REST.
Control de token JWT i rutes protegides segons rol.

* Prova i desplegament
Proves login, permisos i funcionalitats.

# Tecnologies Utilitzades

IntelliJ, Spring boot, base de datos MySQL, Java, Swagger, WorkBench, postman, Git and GitHub
