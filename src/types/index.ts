export interface ProductRequest {
  id: string;
  tallas?: string[];
  saludo?: string;
}

export interface MetaProduct extends ProductRequest {
  productId: string;
  hasSizes: boolean;
}

/* Shopify */

export interface ShopifyVariant {
  id: string;
  title: string;
  inventoryQuantity: number;
  selectedOptions: { name: string; value: string }[];
  image?: { url: string };
}

export interface ShopifyProduct {
  id: string;
  title: string;
  featuredImage?: { url: string };
  variants: { nodes: ShopifyVariant[] };
}

export interface ShopifyNodesResponse {
  data: { nodes: ShopifyProduct[] };
}
