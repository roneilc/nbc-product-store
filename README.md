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