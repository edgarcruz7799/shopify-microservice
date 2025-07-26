import { Request, Response } from "express";
import {
  getProductsStock,
  ReturnAvailableOptions,
  ReturnSizesAvailable,
} from "../services/shopify/graph/product";

import {
  ProductRequest,
  MetaProduct,
  ShopifyProduct,
  ShopifyNodesResponse,
} from "../types";

import { PRODUCT_MAP } from "../config/productMap";

type SizeStock = { talla: string; stock: { url: string; title: string }[] };

export async function CreateOrder(req: Request, res: Response): Promise<void> {
  try {
    const { productos = [] } = req.body as { productos: ProductRequest[] };

    if (!productos.length) {
      res.status(400).json({ message: "Faltan productos." });
    }

    console.log("Productos recibidos:", productos);
    const meta: MetaProduct[] = productos.map((p) => {
      const cfg = PRODUCT_MAP[p.id];
      if (!cfg) throw new Error(`Producto desconocido: '${p.id}'`);
      if (cfg.hasSizes && !p.tallas?.length)
        throw new Error(`Debes indicar tallas para '${p.id}'.`);
      return { ...cfg, ...p };
    });

    const ids = meta.map((m) => m.productId);
    const shopifyRaw = await getProductsStock(ids);

    const byId = new Map<string, ShopifyProduct>();
    (shopifyRaw as ShopifyNodesResponse).data.nodes.forEach((n) =>
      byId.set(n.id.split("/").pop()!, n)
    );

    const detalle = [];

    for (const item of meta) {
      const product = byId.get(item.productId);
      if (!product) continue;

      const variants = product.variants.nodes;
      if (!variants.length) continue;

      const defaultImg = product.featuredImage?.url ?? "";
      const title = product.title ?? item.id;

      const stockAvailable =
        item.hasSizes && item.tallas
          ? await ReturnSizesAvailable(item.tallas, variants)
          : await ReturnAvailableOptions(variants, defaultImg);

      const productHasStock = item.hasSizes
        ? (stockAvailable as SizeStock[]).some((t) => t.stock.length)
        : stockAvailable[0].stock.length > 0;

      if (!productHasStock) continue;

      const detalleProducto = {
        productTitle: title,
        saludo: item.saludo,
        variants: [] as {
          title: string;
          color?: string;
          imageUrl: string;
          quantity: number;
        }[],
      };

      const stocks = item.hasSizes
        ? (stockAvailable as SizeStock[]).flatMap((s) => s.stock)
        : stockAvailable[0].stock;

      for (const s of stocks) {
        const v = variants.find((vv) => vv.title === s.title);
        if (!v) continue;

        detalleProducto.variants.push({
          title: v.title,
          color: v.selectedOptions.find((o) => o.name.toLowerCase() === "color")
            ?.value,
          imageUrl: v.image?.url ?? defaultImg,
          quantity: v.inventoryQuantity,
        });
      }

      detalle.push(detalleProducto);
    }

    res.status(200).json({
      message: "Stock consultado exitosamente",
      productosProcesados: meta.map((m) => m.id),
      detalle,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error inesperado",
      error: (error as Error).message,
    });
  }
}
