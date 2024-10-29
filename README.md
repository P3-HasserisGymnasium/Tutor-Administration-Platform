How to get docker to work:

1. First start by installing docker desktop application(this need to be open when running docker command in the terminal) 
Site for download: https://www.docker.com/products/docker-desktop/ (you can just use github to login in to docker)

2. Programmet bruger java 17 btw så husk at downloade det

3. Make sure you are in the correct folder in the terminal, you need to be in the root directory to run the next command

4. Now we ready to use docker to run all containers simultaneously to so this we use the command "docker-compose up --build" in the terminal, and this will start them both, I guess this command might be smart enough to build them too but doing the other commands cant hurt i guess

5. Localhosts
Frontend: localhost:3000
Backend: localhost:8080
mySQL: localhost:3306

6. All container can now be started from the docker desktop application now, or by using the command in the terminal. There are a order they need to be start up in else things might not go so well, but docker will do that for you, if you press the button that starts them all. Next will be a few commands you can use with docker to make your life a bit easier

7. Usefull commands
- "docker-compose up" runs the program, make sure to be in the root directory
- "docker-compose up --build" builds the needed files this needs to be done the first time before you can use first command
- "docker-compose up -d" this run the program in detached mode, so it doesn’t occupy the terminal
- "docker-compose down" if you have run the program in detached mode you need this command to stop the program










/*
(SKIP STEP 2 MAYBE(TRY TO SKIP IT))
2. Idk if this is needed but I guess maybe its good practice so we gonna build the frontend and backend just do this step if an error come along I guess else go to step 3
Backend: run "cd backend" in the terminal within the idea after that run "./gradlew build", run cd ..\ to get out in the project directory and then you ready to build frontend
Frontend: run "cd frontend" in the terminal within the idea after that run "npm run build", run cd ..\ to get out in the project directory
*/