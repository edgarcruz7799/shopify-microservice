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

const CreateOrder = async ({
  currency = "COP",
  lineItems = [],
  totalAmount,
}: {
  currency?: string;
  lineItems: {
    title: string;
    quantity: number;
    price: number;
    taxAmount?: number;
    taxRate?: number;
    taxTitle?: string;
  }[];
  totalAmount: number;
}) => {
  const graphqlQuery = {
    query: `
      mutation orderCreate($order: OrderCreateInput!) {
        orderCreate(order: $order) {
          userErrors {
            field
            message
          }
          order {
            id
            name
            tags
          }
        }
      }
    `,
    variables: {
      order: {
        currency,
        note: "Orden generada automáticamente por IA",
        tags: ["Creado por IA"],
        lineItems: lineItems.map((item) => ({
          title: item.title,
          quantity: item.quantity,
          priceSet: {
            shopMoney: {
              amount: item.price,
              currencyCode: currency,
            },
          },
          ...(item.taxAmount
            ? {
                taxLines: [
                  {
                    priceSet: {
                      shopMoney: {
                        amount: item.taxAmount,
                        currencyCode: currency,
                      },
                    },
                    rate: item.taxRate ?? 0.0,
                    title: item.taxTitle ?? "IVA",
                  },
                ],
              }
            : {}),
        })),
        transactions: [
          {
            kind: "SALE",
            status: "SUCCESS",
            amountSet: {
              shopMoney: {
                amount: totalAmount,
                currencyCode: currency,
              },
            },
          },
        ],
      },
    },
  };

  const response = await axios.post(SHOPIFY_API_URL, graphqlQuery, {
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Access-Token": SHOPIFY_ACCESS_TOKEN,
    },
  });

  return response.data;
};

export { CreateOrder, GetOrderID };
