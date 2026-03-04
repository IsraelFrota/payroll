'use server';

import { Header } from '@/app/_components/header/Header';
import { getCompaniesWithPayrolls } from '@/app/_actions/companyData';
import { CompanyPayrollPanel } from './_components/CompanyPayrollPanel';

export default async function Painel() {
	const { data } = await getCompaniesWithPayrolls();

	return (
		<main className="space-y-6 p-6">
			<Header>
				<Header.Title>
					Relatório da Folha de Pagamento
				</Header.Title>
			</Header>

			<CompanyPayrollPanel companies={data} />
		</main>
	);
}