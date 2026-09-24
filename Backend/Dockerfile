
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /src


COPY ["TravelogicBackend.Api/TravelogicBackend.Api.csproj", "TravelogicBackend.Api/"]
COPY ["TravelogicBackend.Application/TravelogicBackend.Application.csproj", "TravelogicBackend.Application/"]
COPY ["TravelogicBackend.Domain/TravelogicBackend.Domain.csproj", "TravelogicBackend.Domain/"]
COPY ["TravelogicBackend.Infrastructure/TravelogicBackend.Infrastructure.csproj", "TravelogicBackend.Infrastructure/"]

RUN dotnet restore "TravelogicBackend.Api/TravelogicBackend.Api.csproj"


COPY . .
WORKDIR "/src/TravelogicBackend.Api"
RUN dotnet build "TravelogicBackend.Api.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TravelogicBackend.Api.csproj" -c Release -o /app/publish /p:UseAppHost=false

FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS final
WORKDIR /app
EXPOSE 8080
EXPOSE 8081
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TravelogicBackend.Api.dll"]