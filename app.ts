// /app.ts
import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import routes from "./src/routes";

const app = express();
const PORT = process.env.PORT || 3005;

app.use(bodyParser.json());
app.use(routes());

app.listen(PORT, () => {
  console.log(`✅ microservicio-shopify escuchando en el puerto ${PORT}`);
});
