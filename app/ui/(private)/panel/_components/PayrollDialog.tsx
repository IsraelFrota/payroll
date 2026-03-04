'use client';

import {
	Dialog,
	DialogTitle,
	DialogHeader,
	DialogContent,
} from '@/components/ui/dialog';
import { Table } from '@/app/_components/table/Table';

import { CompanyPayrollDTO } from '@/features/payroll/types';
import { currency, formatDate } from '@/app/_utils/utils';

type Props = {
	isOpen: boolean;
	company: CompanyPayrollDTO | null;
	onClose: () => void;
};

export function PayrollDialog({
	isOpen,
	company,
	onClose,
}: Props) {
	if (!company) return null;

	const payroll = company.payrolls?.[0];

	if (!payroll) return null;

	const competence = new Date(
		`${payroll.competence}-01T12:00:00`)
		.toLocaleDateString('pt-BR', {
			day: 'numeric',
			year: 'numeric',
			month: 'numeric',
		}
	);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className="max-w-5xl overflow-hidden border-none shadow-2xl">
				<DialogHeader className="border-b mt-4">
					<div className="flex items-center justify-between py-2">
						<div>
							<DialogTitle className="text-xl font-bold text-gray-800">
								{company.name.toUpperCase()}
							</DialogTitle>
							<p className="text-sm text-gray-500">Detalhamento da Folha de Pagamento</p>
						</div>
						<div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
								Referência: {competence}
						</div>
					</div>
				</DialogHeader>

				<div className='flex flex-col gap-8 py-6 max-h-[75vh] overflow-y-auto bg-white'>
					<section className="space-y-3">
						<div className="flex items-center justify-between mb-3 px-1">
							<h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
								Eventos de Lançamento
							</h3>
							<span className="text-xs text-slate-400">{payroll.events?.length || 0} itens</span>
						</div>

						<div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
							<Table>
								<Table.Header className='bg-gray-100/70 font-semibold'>
									<Table.Row>
										<Table.Cell className='text-left'>Descrição</Table.Cell>
										<Table.Cell className='text-right'>Valor</Table.Cell>
										<Table.Cell className='text-center'>Categoria</Table.Cell>
									</Table.Row>
								</Table.Header>

								<Table.Body className='divide-y divide-gray-200 text-gray-700'>
									{payroll.events?.map(
										({ code, description, amount, category }) => (
											<Table.Row
												key={`${code}-${category}`}
												className='hover:bg-gray-50/70'
											>
												<Table.Cell className='font-semibold'>
													{description}
												</Table.Cell>
												<Table.Cell className='text-right'>
													{currency(amount)}
												</Table.Cell>
												<Table.Cell className='text-center'>
													<span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 uppercase tracking-tight ring-1 ring-inset ring-slate-200">
														{category}
													</span>
												</Table.Cell>
											</Table.Row>
										)
									)}
								</Table.Body>
							</Table>
						</div>
					</section>

					<section className='space-y-3'>
						<h3 className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-3 px-1">
							Guias e Tributos
						</h3>

						<div className='overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm'>
							<Table>
								<Table.Header className='bg-gray-100/70 font-semibold'>
									<Table.Row>
										<Table.Cell className='text-left'>Descrição</Table.Cell>
										<Table.Cell className='text-right'>Valor</Table.Cell>
										<Table.Cell className='text-center'>Vencimento</Table.Cell>
										<Table.Cell className='text-center'>Guia</Table.Cell>
									</Table.Row>
								</Table.Header>

								<Table.Body className='divide-y divide-gray-200 text-gray-700'>
									{payroll.details?.map(
										({ amount, documentType, obligation, dueDate }) => (
											<Table.Row
												key={`${obligation}-${documentType}`}
												className='hover:bg-gray-50/70'
											>
												<Table.Cell className='font-semibold'>
													{obligation}
												</Table.Cell>
												<Table.Cell className='text-right'>
													{currency(amount)}
												</Table.Cell>
												<Table.Cell className='text-center'>
													{formatDate(dueDate)}
												</Table.Cell>
												<Table.Cell className='text-center'>
													<span className="inline-flex items-center rounded-md bg-amber-50 px-2 py-0.5 text-[10px] font-bold text-amber-700 uppercase ring-1 ring-inset ring-amber-600/20">
														{documentType}
													</span>
												</Table.Cell>
											</Table.Row>
										)
									)}
								</Table.Body>
							</Table>
						</div>
					</section>
				</div>
			</DialogContent>
		</Dialog>
	);
}