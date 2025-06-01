import { formatAmount, formatField } from "../utils";

const ConfirmationHeaderTemplate = ({ order }) => {
  const headerMsg = `🎊⚽️🎊 *Confirmación de Orden* 🎊⚽️🎊
Buen día ${order.customer.first_name}, espero estés muy bien.
¡Gracias por tu compra en nuestra tienda *Saca tus Mejores 5* 🎉🎉🎉!

A continuación te mostramos los detalles de tu orden:
${formatField("Orden #", order.order_number)}
${formatField(
  "Nombre",
  `${order.customer.first_name} ${order.customer.last_name}`
)}
${formatField("Email", order.contact_email)}
${formatField("Teléfono", order.phone)}
${formatField(
  "Dirección",
  `${order.shipping_address?.address1}, ${order.shipping_address?.city}, ${order.shipping_address?.province}, ${order.shipping_address?.country}`
)}`;
  return headerMsg;
};

const ConfirmationProduct = ({ item }) => {
  const Product = `*Producto:* ${item.name}
*Precio:* $${formatAmount(item.discountedTotalSet.shopMoney.amount)} ${
    item.discountedTotalSet.shopMoney.currencyCode
  } `;
  return Product;
};

const ConfirmationFooterTemplate = ({ order }) => {
  const FooterMsg = `${formatField(
    "Envío",
    `$${formatAmount(order.shipping_lines[0]?.price)} ${order.currency}`
  )}
${formatField(
  "Total",
  `$${formatAmount(order.current_total_price)} ${
    order.currency
  } _(este es el total que vas a pagar al momento de recibir o reclamar tu pedido)_`
)}
  
Para continuar con el envío, responde a este mensaje con una *CONFIRMACIÓN* y procedemos a alistarte tu pedido.
  
Si necesitas realizar algún cambio o tienes alguna pregunta adicional, no dudes en preguntar. Estamos aquí para ayudarte. 🤗🤗🤗`;

  return FooterMsg;
};

export {
  ConfirmationHeaderTemplate,
  ConfirmationFooterTemplate,
  ConfirmationProduct,
};
