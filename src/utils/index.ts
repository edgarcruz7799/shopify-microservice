const formatAmount = (amount) =>
  parseFloat(amount).toLocaleString("en-US", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
const formatCOPAmount = (amount) => {
  // Convertir el valor a un número de tipo flotante
  const numAmount = parseFloat(amount);
  // Dividir por 1000 y formatear con separador de miles
  const formattedAmount = (numAmount / 1000).toLocaleString("es-CO", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return formattedAmount;
};

// Validate and format fields
const formatField = (label, value) => (value ? `*${label}:* ${value}` : "");

export { formatAmount, formatCOPAmount, formatField };
