export const getSummaryValue = (
  summary: { title: string; value: number }[],
  title: string
) => summary.find(item => item.title === title)?.value ?? 0;

export const currency = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const styles = {
  orange: {
    border: "border-orange-300/40",
    header: "bg-orange-500/90",
    content: "bg-orange-50/70 text-orange-800",
  },
  blue: {
    border: "border-blue-300/40",
    header: "bg-blue-500/90",
    content: "bg-blue-50/70 text-blue-800",
  },
  green: {
    border: "border-green-300/40",
    header: "bg-green-500/90",
    content: "bg-green-50/70 text-green-800",
  },
  gray: {
    border: "border-gray-300/40",
    header: "bg-gray-500/90",
    content: "bg-gray-50/70 text-gray-800",
  },
} as const;