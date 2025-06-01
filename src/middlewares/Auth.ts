import dotenv from 'dotenv';

dotenv.config();

const authToken = process.env.AUTH_TOKEN;


const auth = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token === authToken) {
        next();
    } else {
        res.writeHead(401, { "Content-Type": "application/json" });
        res.end(
            JSON.stringify({
                message: "Error al acceder a la API",
                response: 'Unauthorized',
            })
        );
        return;
    }
}

export default auth;