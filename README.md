# DSO101 Assignment 1 - Todo App CI/CD

**Student Name:** Dechen Yangzom  
**Student Number:** 02240338  
**Submission Folder:** DechenYangzom_02240338_DSO101_A1

---

## Project Structure
DechenYangzom_02240338_DSO101_A1/
├── backend/
│   ├── .env
│   ├── .dockerignore
│   ├── .gitignore
│   ├── Dockerfile
│   ├── server.js
│   ├── package.json
|   ├── __tests__
│   │   └── app.test.js
├── frontend
│   ├── src/
│   │   └── App.js
│   ├── .dockerignore 
│   ├── .env
│   ├── gitignore
│   ├── Dockerfile
│   ├── package.json
│   └── README.md
├── README.md
├── render.yaml
└── Jenkinsfile

---

## Step 0: Running Locally

### Prerequisites
- Node.js v18+
- PostgreSQL
- Docker Desktop
<img src="DSO101-A1-screenshots/1.png">
<img src="DSO101-A1-screenshots/20.png">
### 1. Set up the database
```sql
CREATE DATABASE todos;
```
<img src="DSO101-A1-screenshots/2.png">

### 2. Configure environment variables
```bash
# Backend .env
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=yourpassword
DB_NAME=todos
DB_PORT=5432
DB_SSL=false
PORT=5000
```
<img src="DSO101-A1-screenshots/5.png">

```bash
# Frontend .env
REACT_APP_API_URL=http://localhost:5000
```
<img src="DSO101-A1-screenshots/13.png">

### 3. Start the backend
```bash
cd backend
npm install
node server.js
```
<img src="DSO101-A1-screenshots/3.png">
<img src="DSO101-A1-screenshots/4.png">
<img src="DSO101-A1-screenshots/9.png">


### 4. Start the frontend
```bash
cd frontend
npm install
npm start
```
<img src="DSO101-A1-screenshots/11.png">
<img src="DSO101-A1-screenshots/12.png">


### Screenshot: Local app running
<img src="DSO101-A1-screenshots/18.png">
<img src="DSO101-A1-screenshots/19.png">
<img src="DSO101-A1-screenshots/10.png">


---

## Part A: Docker Hub Deployment

### 1. Build Docker images
```bash
docker build -t 02240338/be-todo:02240338 ./backend
docker build -t 02240338/fe-todo:02240338 ./frontend
```

### Screenshot: Docker build
<img src="DSO101-A1-screenshots/26.png">
<img src="DSO101-A1-screenshots/31.png">



### 2. Push to Docker Hub
```bash
docker push 02240338/be-todo:02240338
docker push 02240338/fe-todo:02240338
```
<img src="DSO101-A1-screenshots/29.png">
<img src="DSO101-A1-screenshots/Screenshot 2026-05-05 015435.png">


### Screenshot: Docker Hub images
<img src="DSO101-A1-screenshots/Screenshot 2026-05-05 231918.png">

### 3. Deploy on Render.com

#### Backend Service
- Image: `02240338/be-todo:v7`
- URL: https://be-todo-02240338.onrender.com

#### Frontend Service
- Image: `02240338/fe-todo:v2`
- URL: https://fe-todo-v2.onrender.com

### Screenshot: Backend deployed on Render
<img src="DSO101-A1-screenshots/Screenshot 2026-05-05 174259.png">

### Screenshot: Frontend deployed on Render
<img src="DSO101-A1-screenshots/Screenshot 2026-05-05 175433.png">

### Screenshot: Live app working
<img src="DSO101-A1-screenshots/Screenshot 2026-05-05 175550.png">

---

## Part B: Automated Git-based Deployment

### render.yaml
```yaml
services:
  - type: web
    name: be-todo
    env: docker
    dockerfilePath: ./backend/Dockerfile
    envVars:
      - key: DATABASE_URL
        sync: false
      - key: PORT
        value: 5000

  - type: web
    name: fe-todo
    env: docker
    dockerfilePath: ./frontend/Dockerfile
    envVars:
      - key: REACT_APP_API_URL
        value: https://be-todo-02240338.onrender.com
```

### How it works
Every time code is pushed to GitHub, Render automatically:
1. Detects the new commit
2. Rebuilds Docker images using Dockerfiles
3. Redeploys both services

### Screenshot: Blueprint synced on Render
<img src="DSO101-A1-screenshots/Screenshot 2026-05-05 192843.png">

### Screenshot: Auto-deploy triggered by git push
<img src="DSO101-A1-screenshots/Screenshot 2026-05-05 222041.png">
<img src="DSO101-A1-screenshots/Screenshot 2026-05-05 222612.png">
<img src="DSO101-A1-screenshots/Screenshot 2026-05-05 222714.png">


---

## Live URLs
- Frontend: https://fe-todo-v2.onrender.com
- Backend: https://be-todo-02240338.onrender.com

---

## References
- [Docker Documentation](https://docs.docker.com/)
- [Render Documentation](https://render.com/docs)
- [Render Blueprint Spec](https://render.com/docs/blueprint-spec)



# DSO101 Assignment 2 - CI/CD Pipeline with Jenkins

## Overview
This assignment involved configure a Jenkins pipeline to automate the build, test, and deployement of the to-do list application from Assignment 1.

---

## Tools & Technologies Used
- **Jenkins** - CI/CD automation
- **GitHub** - Source code hosting 
- **Node.js & npm** - JavaScript runtime and package management
- **Jest** - Unit testing framework
- **jest-junit** - JUnit report generation for Jenkins

---

## How I Configured the Pipeline 

1. Installed Java JDK 17 (Eclipse Temurin) as a prerequisite for Jenkins
2. Installed Jenkins and set it up on localhost:8080
3. Installed required Jenkins plugins: NodeJS, Pipeline, GitHub Integration, and Docker Pipeline
<img src="DSO101-A2-screenshots/Screenshot 2026-05-10 152218.png">
<img src="DSO101-A2-screenshots/Screenshot 2026-05-11 224037.png">
<img src="DSO101-A2-screenshots/Screenshot 2026-05-12 235544.png">
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 125832.png">
<img src="DSO101-A2-screenshots/Screenshot 2026-05-12 193308.png">
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 125705.png">
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 125853.png">

4. Configured NodeJS 20.19.2 LTS in Jenkins Tools settings
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 130712.png">

5. Generated a GitHub Personal Access Token (PAT) and added it as Jenkins credentials
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 131705.png">
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 132738.png">

6. Updated package.json to include Jest and jest-junit for unit testing
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 133703.png">

7. Created a Jenkinsfile in the project root with 4 stages: Checkout, Install, Build, and Test
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 134116.png">

8. Created a Jenkins Pipeline job pointing to the GitHub repository
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 134717.png">
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 134736.png">
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 134808.png">
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 135224.png">
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 135233.png">

9. Successfully ran the pipeline with all stages passing and all tests passing
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 153958.png">
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 154027.png">
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 154046.png">
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 155103.png">


---

## Pipeline Stages
- **Checkout** - Pulls the latest code from GitHub
- **Install** - Runs `npm install` to install dependencies
- **Build** - Runs `npm run build` to build the project
- **Test** - Runs `npm test` using Jest and generates JUnit reports
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 154515.png">


---

## Challenges Faced

1. **Java not installed** - Jenkins requires Java to run. Had to install 
Java JDK 17 before Jenkins could start.

2. **sh vs bat issue** - The initial Jenkinsfile used `sh` commands which 
are Linux-based. Since Jenkins was running on Windows, all `sh` commands 
had to be replaced with `bat` commands for the pipeline to work.
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 135328.png">

3. **Plugin installation failures** - Some plugins showed warnings during installation. Restarting Jenkins after installation resolved the issue.

---

## Results
- All 4 pipeline stages completed successfully
- 2 unit tests passed with 0 failures
- Test results visible in Jenkins Test Results dashboard
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 154046.png">
<img src="DSO101-A2-screenshots/Screenshot 2026-05-13 155103.png">


---