How to get docker to work:

1. First start by installing docker desktop application(this need to be open when running docker command in the terminal) 
Site for download: https://www.docker.com/products/docker-desktop/ (you can just use github to login in to docker)

(SKIP STEP 2 MAYBE(TRY TO SKIP IT))
2. Idk if this is needed but I guess maybe its good practice so we gonna build the frontend and backend just do this step if an error come along I guess else go to step 3
Backend: run "cd backend" in the terminal within the idea after that run "./gradlew build", run cd ..\ to get out in the project directory and then you ready to build frontend
Frontend: run "cd frontend" in the terminal within the idea after that run "npm run build", run cd ..\ to get out in the project directory

3. Now we ready to use docker to run the frontend and backend simultaneously to so this we use the "docker-compose up --build", and this will start them both, I guess this command might be smart enough to build them too but doing the other commands cant hurt i guess

4. Localhosts
Frontend: localhost:3000
Backend: localhost:8080

5. Both frontend and backend can now be started from the docker desktop application now, or by using the command in the terminal

6. programmet bruger java 17 btw så husk at downloade det