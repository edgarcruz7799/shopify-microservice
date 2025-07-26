import { Router, Request, Response } from "express";
import { SubmitStockMultiple, CreateOrder } from "../controllers";
import auth from "../middlewares/Auth";

export default function routes() {
  const router = Router();

  router.get("/health", (_req: Request, res: Response) => {
    res.send("ok");
  });
  router.post("/stock", auth, SubmitStockMultiple);
  router.post("/create-order", auth, CreateOrder);

  return router;
}
