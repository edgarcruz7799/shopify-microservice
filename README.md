# Shopify Microservice

Este microservicio expone un endpoint HTTP para consultar la disponibilidad de stock de productos en una tienda Shopify, con soporte para productos con y sin tallas. Fue creado para integrarse con bots de WhatsApp que gestionan múltiples tiendas, permitiendo desacoplar la lógica de Shopify y reutilizarla vía API REST.

## 🚀 Tecnologías

- Node.js + Express
- TypeScript
- Shopify Storefront GraphQL API
- Railway (opcional para despliegue)

---

## 📋 Endpoints

### `POST /stock`

Consulta el stock disponible de productos Shopify.

#### Headers

```http
x-api-key: <API_KEY>
Content-Type: application/json
```

#### Body

```json
{
  "productos": [
    {
      "id": "alcon2024",
      "tallas": ["42"],
      "saludo": "Modelos disponibles:"
    },
    {
      "id": "alcon2025",
      "tallas": ["42"],
      "saludo": "Modelos nuevos:"
    }
  ]
}
```

#### Respuesta

```json
{
  "message": "Stock enviado exitosamente",
  "productosProcesados": ["alcon2024", "alcon2025"],
  "detalle": [
    {
      "productTitle": "Zapatillas Alcon 2024",
      "saludo": "Modelos disponibles:",
      "variants": [
        {
          "title": "42 / Blanco",
          "color": "Blanco",
          "imageUrl": "https://...",
          "quantity": 2
        }
      ]
    }
  ]
}
```

---

## ⚙️ Variables de entorno

```env
PORT=3005
API_KEY=supersecret
SHOPIFY_DOMAIN=sacatusmejores5.myshopify.com
SHOPIFY_ACCESS_TOKEN=shpat_xxxxxx
```

---

## 🐳 Dockerfile

Un `Dockerfile` sirve para **empaquetar tu aplicación** con todas sus dependencias en una imagen lista para ejecutar en cualquier entorno (Railway, Render, VPS, etc.).

### `Dockerfile`

```dockerfile
# Imagen base con Node.js
FROM node:18

# Crear directorio de trabajo
WORKDIR /app

# Copiar package.json y lock
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto del código
COPY . .

# Exponer el puerto
EXPOSE 3005

# Comando de inicio
CMD ["npm", "run", "dev"]
```

### `.dockerignore`

```
node_modules
.env
dist
debug.log
```

### Para correr localmente

```bash
docker build -t shopify-microservice .
docker run -p 3005:3005 --env-file .env shopify-microservice
```

---

## 🌍 Despliegue en Railway

1. Sube el repo a GitHub.
2. Entra a [Railway](https://railway.app/).
3. Crea un nuevo proyecto y selecciona tu repositorio.
4. Agrega las variables de entorno.
5. Railway detectará el `Dockerfile` y hará el build automáticamente.

---

## 🧠 Futuro

- Soporte multi-tenant por tienda.
- Autenticación por token dinámico.
- Webhooks para mantener stock actualizado en tiempo real.

---

## ✅ Autor

- Edgar Cruz
