# Travelogic App

While this is a test/assessment project, I have built it to closely mimick my day to day approach when building apps. You will discover that this is a full-stack application structured around clean architecture principles, robust backend design patterns, and a scalable frontend state management layer.

## Project Structure

This git repository is divided into two primary directories:
- `Backend/`: .NET Web API utilizing Clean Architecture.
- `Frontend/`: Vite React and TypeScript client.

### Backend Architecture
I have structured the backend into four distinct layers following Clean Architecture separation of concerns:
- **API**: Entry point containing controllers, middleware, and dependency injection configurations. Handles request pipelines and database connection retries.
- **Application**: Contains business logic, AutoMapper mapping profiles, CQRS, service handlers, and validation rules.
- **Domain**: Core enterprise entities, value objects, and domain logic. Implements `ITrackable` interfaces to handle audit properties and soft deletes cleanly across entities.
- **Infrastructure**: Data persistence layer using Entity Framework Core with Fluent API configurations for precise database mapping against Microsoft SQL Server. Includes database migrations and initial seeding logic. I chose to seed the database so that the app doesn't spin up with empty data. I hope that's okay that I did that.

**Key Technical Features (Backend):**
- **Clean Architecture & Separation of Concerns**: Strict dependency rules flowing inward toward the domain layer.
- **Global Exception Handling**: I have implemented RFC 7807 compliant problem details middleware handling application exceptions globally. 
- **Logging**: Configured built-in structured logging via `ILogger` across services and middleware.
- **Unit Testing**: Comprehensive test suite written with xUnit. You will see it in the backend folder, though above I didn't specify it as part of my clean architecture setup. But it's a very important piece in this app.
- **Soft Deletes**: Implemented via `ITrackable` domain patterns to ensure data retention integrity. I did this because in a real world setting It's always good to be able to recover lost data.

### Frontend Architecture
The frontend I built it with Vite, React, and TypeScript, focusing on maintainability and robust state management with redux.

**Key Technical Features (Frontend):**
- **Redux Toolkit**: Utilized for handling complex global state management.
- **RTK Query**: Centralizes API calls, caching, invalidation, and data fetching lifecycle hooks. It's very amazing, take a look at what it does instead of just using something like fetch, or axios.
- **Zod**: Robust schema validation for forms and data payloads.
- **Material UI**: Styled using MUI, though I am entirely UI component library agnostic and comfortable adapting to Tailwind, Mantine, or custom design systems as needed. I did research and I'm aware you might be using Dev Extreme, I wanted to use it to demonstrate my UI agnostic capabilities, but it requires a license.
- **User Feedback**: Integrated toast notifications for seamless UI feedback loops.

---

## Running the Project

### Requirements
- Docker Desktop (This is for the 1st option to run this, You will need docker desktop to spin up the API, database and react client in one command)
- .NET SDK (Option 2, if the docker command fails or you prefer to spin it up locally, kindly run it on your local machine)
- Node.js & npm (Option 2, please run the react client locally if docker fails)

### Method 1: Running via Docker
I have included a root `docker-compose.yml` file that builds and spins up the SQL Server database, backend API, and frontend client containers inside a shared bridge network.

1. Ensure Docker Desktop is running.
2. Open a terminal in the root directory and execute:
   ```bash
   docker compose up --build
   ```
3. Access the application:
   - **Frontend Client:** http://localhost:5173
   - **Backend API:** http://localhost:5298 

### Method 2: Manual Fallback Execution
Docker should not fail to build. But because sql server is large to download via docker, the docker cli tends to drop downloads and restart them continously on standard wifi networks. So if Docker fails you can run these apps locally on your machine. I believe you could also just prefer to run them locally.

1. **Database**: Spin up a local SQL Server instance and ensure your connection string in `Backend/TravelogicBackend.Api/appsettings.json` points to it.
2. **Backend**:
   ```bash
   cd Backend/TravelogicBackend.Api
   dotnet restore
   dotnet run
   ```
3. **Frontend**:
   ```bash
   cd Frontend/travelogic-client
   npm install
   npm run dev
   ```

*Note on Ports:* If port conflicts arise on your machine for the react client or backend api or even the database, ensure you modify the port mappings in `docker-compose.yml` or the local configuration files accordingly before spinning up the services. You can also make sure in program.cs the cors configuration is updated as well. Please let me know if you face any issues running this app.