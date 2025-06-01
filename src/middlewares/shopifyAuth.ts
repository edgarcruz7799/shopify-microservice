import dotenv from 'dotenv';
import { CreateFileJSON } from '../utils/fileJSON';

dotenv.config();

const AUTH_SHOPIFY_TOKEN = process.env.AUTH_SHOPIFY_TOKEN;


const auth = (req, res, next) => {
    const token = req.headers['authorization'];

    CreateFileJSON("dataheader", req.headers);

    if (token === AUTH_SHOPIFY_TOKEN) {
        next();
    } else {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                message: "Error al acceder a la API de Shopify por falta de token",
                response: 'Unauthorized',
            })
        );
        return;
    }
}

export default auth;