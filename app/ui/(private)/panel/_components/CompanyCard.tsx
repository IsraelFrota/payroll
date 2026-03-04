import { CompanyPayrollDTO } from '@/features/payroll/types';
import { PayrollIndicators } from './PayrollIndicators';
import { PayrollSummary } from './PayrollSummary';
import { getLatestPayroll } from '@/app/_utils/payrolls';
import { Separator } from '@/app/_components/separator/Separator';
import { ArrowRight } from 'lucide-react';

type Props = {
	company: CompanyPayrollDTO;
	onOpen: () => void;
};

export function CompanyCard({ company, onOpen }: Props) {
  const payroll = getLatestPayroll(company);

  return (
    <div 
      onClick={onOpen}
      className='group relative rounded-xl border border-slate-200 p-5 shadow-sm space-y-4 bg-white hover:shadow-md hover:border-slate-300 transition-all cursor-pointer'
    >
      {payroll && (
        <div className='absolute top-5 right-5 bg-slate-100 px-2 py-1 rounded text-[10px] font-bold text-slate-500 uppercase'>
          {new Date(`${payroll.competence}-01T12:00:00`)
            .toLocaleDateString('pt-BR', {
              year: 'numeric',
              month: 'numeric',
          })}
        </div>
      )}
      
      <header className='pr-16'>
        <h2 className='font-bold text-slate-900 leading-tight group-hover:text-orange-400 transition-colors uppercase'>
          {company.name}
        </h2>
        <span className='text-[10px] font-bold tracking-widest text-slate-400 uppercase'>
          {company.companyType}
        </span>
      </header>

      {payroll ? (
        <div className='space-y-4'>
          <div className='py-1'>
             <PayrollSummary summary={payroll.summary} />
          </div>

          <Separator />

          <div className='flex flex-col gap-2'>
            <h2 className='text-[10px] font-bold tracking-widest text-slate-700 uppercase'>Quadro de talentos</h2>
            <PayrollIndicators indicators={payroll.indicators} />
          </div>

          <div className='flex items-center justify-center pt-2 text-sm font-medium text-slate-600 group-hover:text-slate-900'>
            Ver detalhes completos
            <ArrowRight className='ml-2 w-4 h-4 transition-transform group-hover:translate-x-1' />
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center justify-center py-8 border-2 border-dashed border-slate-100 rounded-lg'>
          <p className='text-xs font-medium text-slate-400 italic'>
            Nenhuma folha disponível
          </p>
        </div>
      )}
    </div>
  );
}