// /src/services/shopify/graph/orders.ts

import axios from "axios";
import { SHOPIFY_ACCESS_TOKEN, SHOPIFY_API_URL } from "~/src/config/enviroment";

const GetOrderID = async (orderID: string) => {
  const response = await axios.post(
    SHOPIFY_API_URL,
    {
      query: `{
  order(id:"gid://shopify/Order/${orderID}"){
    lineItems(first: 50){
      nodes{
        image{
          url
        }
        name
        discountedTotalSet{
          shopMoney{
            currencyCode
            amount
          }
        }
      }
    }
  }
}`,
      variables: {},
    },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
      },
    }
  );

  return response;
};

export { GetOrderID };
