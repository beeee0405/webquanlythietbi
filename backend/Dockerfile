# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0-alpine AS build
WORKDIR /src

# Copy csproj
COPY ["backend.csproj", "./"]
RUN dotnet restore "backend.csproj"

# Copy source code
COPY . .
RUN dotnet publish "backend.csproj" -c Release -o /app/publish /p:PublishTrimmed=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0-alpine AS runtime
WORKDIR /app
COPY --from=build /app/publish .

# Set environment variables
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:8080

EXPOSE 8080
ENTRYPOINT ["dotnet", "backend.dll"]
