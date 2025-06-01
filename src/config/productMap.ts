// /src/config/productMap.ts

import {
  AlconsSintenticaProductID,
  BalonesFutsalProductID,
  BalonesMicroProductID,
  CanillerasProductID,
  CoderasProductID,
  ComborycProductID,
  GuayosProductID,
  RodillerasProductID,
  SneakersProductID2024,
  SneakersProductID2025,
} from "./constants";

/* ---------- Tabla de configuración ---------- */
export const PRODUCT_MAP: Record<
  string,
  { productId: string; hasSizes: boolean }
> = {
  alcon2024: { productId: SneakersProductID2024, hasSizes: true },
  alcon2025: { productId: SneakersProductID2025, hasSizes: true },
  balonesMicro: { productId: BalonesMicroProductID, hasSizes: false },
  balonesFutsal: { productId: BalonesFutsalProductID, hasSizes: false },
  comboryc: { productId: ComborycProductID, hasSizes: true },
  alconsintentica: { productId: AlconsSintenticaProductID, hasSizes: true },
  guayos: { productId: GuayosProductID, hasSizes: true },
  canilleras: { productId: CanillerasProductID, hasSizes: false },
  rodilleras: { productId: RodillerasProductID, hasSizes: true },
  coderas: { productId: CoderasProductID, hasSizes: true },
};
