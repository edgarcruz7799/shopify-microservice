// /src/services/shopify/graph/product.ts

import axios from "axios";
import { SHOPIFY_ACCESS_TOKEN, SHOPIFY_API_URL } from "~/src/config/enviroment";
import { ShopifyProduct, ShopifyVariant } from "~/src/types";

/* -------------------------------------------------
 * 1) GraphQL multi-producto
 * ------------------------------------------------- */
export const getProductsStock = async (ids: string[]) => {
  const gids = ids.map((id) => `gid://shopify/Product/${id}`);

  const { data } = await axios.post(
    SHOPIFY_API_URL,
    {
      query: `
        query ($ids: [ID!]!) {
          nodes(ids: $ids) {
            ... on Product {
              id
              title
              featuredImage { url }
              variants(first: 250) {
                nodes {
                  id
                  title
                  inventoryQuantity
                  selectedOptions { name value }
                  image { url }
                }
              }
            }
          }
        }`,
      variables: { ids: gids },
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
    }
  );

  return data as { data: { nodes: ShopifyProduct[] } };
};

/* -------------------------------------------------
 * 2) Tallas específicas
 * ------------------------------------------------- */
export const ReturnSizesAvailable = async (
  tallasRequest: string[],
  variants: ShopifyVariant[]
) => {
  const response: {
    talla: string;
    stock: { url: string; title: string }[];
  }[] = [];

  // Inicializar cada talla con stock vacío
  for (const talla of tallasRequest) response.push({ talla, stock: [] });

  // Rellenar stock por talla
  for (const talla of tallasRequest) {
    const disponibles = variants
      .filter(
        (v) =>
          v.inventoryQuantity >= 1 &&
          v.selectedOptions.some(
            (o) =>
              (o.name.toLowerCase() === "talla" ||
                o.name.toLowerCase() === "tamaño") &&
              o.value === talla
          )
      )
      .map((v) => ({
        url: v.image?.url ?? "", // <- SAFE null-check
        title: v.title,
      }));

    const bucket = response.find((r) => r.talla === talla);
    if (bucket) bucket.stock = disponibles;
  }

  return response;
};

/* -------------------------------------------------
 * 3) Productos sin tallas
 * ------------------------------------------------- */
export const ReturnAvailableOptions = async (
  variants: ShopifyVariant[],
  defaultImageUrl: string
) => {
  const variantesDisponibles = variants
    .filter((v) => v.inventoryQuantity >= 1)
    .map((v) => ({
      url: v.image?.url ?? defaultImageUrl, // <- SAFE también
      title: v.title,
    }));

  return [{ stock: variantesDisponibles }];
};
