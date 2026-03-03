import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { CompanyProvider } from './context/company-context';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '200', '300', '500', '800'],
});

export const metadata: Metadata = {
  title: 'Visualização da folha de pagamentos',
  description:
    'Aplicação web para visualizar de forma detalhada os dados da folha de pagamento',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='pt-br'>
      <CompanyProvider>
        <body className={`${roboto.className} antialiased`}>
          {children}
        </body>
      </CompanyProvider>
    </html>
  );
}
