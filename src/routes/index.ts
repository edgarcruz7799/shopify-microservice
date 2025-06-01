import { Router, Request, Response } from "express";
import { SubmitStockMultiple } from "../controllers";
import auth from "../middlewares/Auth";

export default function routes() {
  const router = Router();

  router.get("/health", (_req: Request, res: Response) => {
    res.send("ok");
  });
  router.post("/stock", auth, SubmitStockMultiple);

  return router;
}
