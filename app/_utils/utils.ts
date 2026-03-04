import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getSummaryValue = (
  summary: { title: string; value: number }[],
  title: string
) => summary.find(item => item.title === title)?.value ?? 0;

export const currency = (value: number) =>
  new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);

export const formatDate = (value: string) => 
  new Date(value)
  .toLocaleDateString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: 'numeric',
    year: 'numeric',
    month: 'numeric',
  });