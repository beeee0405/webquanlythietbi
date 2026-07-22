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

# Create data directory for SQLite
RUN mkdir -p /app/data

COPY --from=build /app/publish .

# Set environment variables
ENV ASPNETCORE_ENVIRONMENT=Production
ENV ASPNETCORE_URLS=http://+:10000
ENV DOTNET_USE_POLLING_FILE_WATCHER=true

EXPOSE 10000
ENTRYPOINT ["dotnet", "backend.dll"]
