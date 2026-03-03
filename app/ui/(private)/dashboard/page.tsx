'use client';

import { useMemo } from 'react';
import { useCompany } from '../../../context/company-context';

import { Card } from '../../../_components/card/Card';
import { Table } from '../../../_components/table/Table';
import { LineGraph } from '../../../_components/chart/Line';
import { Switcher } from '../../../_components/switcher/Switcher';
import { Separator } from '../../../_components/separator/Separator';

import {
  currency,
  formatDate,
  getSummaryValue,
} from '../../../_utils/utils';

export default function Dashboard() {
  const { company } = useCompany();

  const payroll = company?.payrolls?.[0];
  const summary = payroll?.summary ?? [];

  const { netTotal, totalObligations, grandTotal } = useMemo(() => {
    const net = getSummaryValue(summary, 'Total Líquido');
    const obligations = getSummaryValue(summary, 'Total das Obrigações');

    return {
      netTotal: net,
      totalObligations: obligations,
      grandTotal: net + obligations,
    };
  }, [summary]);

  if (!company || !payroll) {
    return (
      <main className='flex h-screen items-center justify-center'>
        <p className='text-sm text-gray-500'>
          Dados da folha não encontrados
        </p>
      </main>
    );
  }

  const formattedDate = formatDate(payroll.sentAt);
  const indicators = payroll.indicators;

  const indicatorItems = indicators
    ? [
        { label: 'Colaboradores', value: indicators.employees },
        { label: 'Admissões', value: indicators.admitted },
        { label: 'Demissões', value: indicators.dismissed },
        {
          label: 'Custo médio por colaborador',
          value: currency(indicators.avgCostPerEmployee ?? 0),
        },
      ]
    : [];

  return (
    <main>
      <header className='sticky top-0 z-10 h-12 bg-[#202020]/5 backdrop-blur-md border-b border-white/20 flex items-center justify-center'>
        <h1 className='text-sm font-semibold text-[#202020] tracking-wide'>
          Folha de Pagamento Mensal
        </h1>
      </header>

      <div className='mx-auto w-full max-w-7xl px-2'>

        <section className='mt-3 text-xs text-gray-500 flex flex-col gap-2 pb-3 sm:flex-row sm:justify-between sm:items-start'>
          <div className='flex flex-col gap-1'>
            <Switcher />
            <p>
              CNPJ:{' '}
              <span className='text-gray-700'>{company.cnpj}</span>
            </p>
          </div>

          <div className='flex flex-col gap-1 sm:text-right'>
            <p>
              Competência:{' '}
              <span className='text-gray-900'>
                {payroll.paymentTermLabel}
              </span>
            </p>
            <p>
              Enviado em:{' '}
              <span className='text-gray-900'>{formattedDate}</span>
            </p>
          </div>
        </section>

        <Separator />

        <section className='my-4 space-y-3'>
          <h2 className='px-2 text-base font-semibold text-gray-700'>
            Resumo da folha de pagamento
          </h2>

          <div className='grid grid-cols-1 gap-3 px-2 sm:grid-cols-2 lg:grid-cols-4'>
            {summary.map(({ title, value }) => {
              return (
                <Card
                  key={title}
                  className={`overflow-hidden transition-shadow hover:shadow-lg`}
                >
                  <Card.Title className={`px-4 py-2`}>
                    <h3 className='text-xs font-semibold uppercase tracking-wide text-foreground'>
                      {title}
                    </h3>
                  </Card.Title>

                  <Card.Content
                    className={`px-4 py-6 text-center `}
                  >
                    <span className='text-2xl font-bold'>
                      {currency(value)}
                    </span>
                  </Card.Content>
                </Card>
              );
            })}
          </div>

          <div className='flex flex-col gap-1 px-2 py-3 text-sm'>
            <p className='flex justify-between'>
              <span className='text-gray-600'>Para Funcionários</span>
              <span className='font-medium text-gray-900'>
                {currency(netTotal)}
              </span>
            </p>

            <p className='flex justify-between'>
              <span className='text-gray-600'>Para Governo</span>
              <span className='font-medium text-gray-900'>
                {currency(totalObligations)}
              </span>
            </p>

            <Separator />

            <p className='flex justify-between text-base text-gray-700 font-semibold'>
              <span>Total Geral do Mês</span>
              <span>{currency(grandTotal)}</span>
            </p>
          </div>
        </section>

        <Separator />

        <section className='my-4 space-y-3'>
          <h2 className='px-2 text-base font-semibold text-gray-700'>
            Resumo de Obrigações e Vencimentos
          </h2>

          <div className='px-2'>
            <div className='overflow-hidden rounded-md border border-gray-200 bg-white/40 backdrop-blur-md'>
              <Table>
                <Table.Header className='bg-gray-100/70 font-semibold'>
                  <Table.Row>
                    <Table.Cell className='text-left'>Obrigação</Table.Cell>
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
                          {documentType}
                        </Table.Cell>
                      </Table.Row>
                    )
                  )}
                </Table.Body>
              </Table>
            </div>
          </div>
        </section>

        <Separator />

        <section className='my-4 space-y-3'>
          <h2 className='px-2 text-base font-semibold text-gray-700'>
            Indicadores do Mês
          </h2>

          <div className='grid grid-cols-1 gap-3 px-2 sm:grid-cols-2 lg:grid-cols-4'>
            {indicatorItems.map(({ label, value }) => (
              <Card key={label} className='border-gray-200 py-3'>
                <Card.Title className='text-center text-xs uppercase tracking-wide text-gray-500'>
                  {label}
                </Card.Title>
                <Card.Content className='text-center text-lg font-semibold text-gray-900'>
                  {value}
                </Card.Content>
              </Card>
            ))}
          </div>
        </section>

        <Separator />

        <section className='my-4 space-y-3'>
          <h2 className='px-2 text-base font-semibold text-gray-700'>
            Evolução da Folha (Últimos 6 meses)
          </h2>

          <div className='px-2'>
            <div className='flex justify-center items-center overflow-hidden rounded-md border border-gray-200 bg-white/40 backdrop-blur-md py-4'>
              {payroll.evolution?.length ? (
                <LineGraph data={payroll.evolution} />
              ) : (
                <p className='text-sm text-gray-500'>
                  Sem dados para exibir
                </p>
              )}
            </div>
          </div>
        </section>
      </div>

      <footer className='mt-8 w-full border-t border-gray-200 bg-white/40 backdrop-blur-md'>
        <div className='mx-auto flex h-12 max-w-7xl items-center justify-center px-4'>
          <span className='text-xs text-gray-600'>
            © {new Date().getFullYear()}{' '}
            <strong className='font-medium'>Israel Frota</strong> — Inteligência Contábil
          </span>
        </div>
      </footer>
    </main>
  );
}
