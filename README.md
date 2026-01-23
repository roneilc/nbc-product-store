# NBC Product Store

To run this project in VS Code,

1. Open the Run and Debug view
2. From the configuration dropdown select `Build and Run App`.
3. Click the green arrow to start. This launch configuration will launch both angular and .NET backend

## Command Line

.NET Backend

```bash
cd nbc-product-store/nbc-product-store
dotnet build
dotnet run nbc-product-store.csproj
```

Angular Frontend

```bash
cd nbc-product-store/ClientApp
npm install 
ng serve --configuration development
```

# NBC Product Store

To run this project in VS Code,

1. Open the Run and Debug view
2. From the configuration dropdown select `Build and Run App`.
3. Click the green arrow to start. This launch configuration will launch both angular and .NET backend

## Command Line

.NET Backend

```bash
cd nbc-product-store/nbc-product-store
dotnet build
dotnet run nbc-product-store.csproj
```

Angular Frontend

```bash
cd nbc-product-store/ClientApp
npm install 
ng serve --configuration development
```

## API Base Url

API base URL is in environment file: `ClientApp/src/app/environment.ts`.

Edit file to point apiUrl to a url (configured to be https://localhost:7050 in this project):

```ts
export const environment = {
	production: false,
	apiUrl: 'https://localhost:7050'
};
```

---

##  Overview

This project currently uses .NET for the server and an Angular single page app for the frontend client.

- **Controllers:** HTTP endpoints are implemented in `Controllers` (ProductsController.cs and CartController.cs). Controllers return JSON API responses to the Angular frontend.
- **Services:** Service classes and helpers are implemented in `Services`. As a singleton, the CartService class can persist cart items in-memory.
- **Middleware:**  `AuthorizationMiddleware` is used to check Authroization header
- **Angular:** The `ClientApp` folder contains the Angular app that the user interacts with and makes backend API calls as needed

Flow:

1. Client sends an HTTP request to a controller API.
2. The Middleware pipeline checks Authorization
3. A Controller receives the request, uses Services to handle logic and data, then returns JSON.

---