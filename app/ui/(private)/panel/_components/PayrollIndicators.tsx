type Props = {
	indicators: {
		employees: number;
		admitted: number;
		dismissed: number;
		avgCostPerEmployee: number;
	};
};

const FieldIndicator = ({ label, value, colorClass = "text-slate-900" }: { label: string, value: number | string, colorClass?: string }) => {
  return (
    <div className='flex flex-col items-center justify-center p-2 rounded-lg bg-slate-50 border border-slate-100 transition-colors hover:bg-slate-100/50'>
      <span className='text-[10px] uppercase tracking-wider font-bold text-slate-400'>
        {label}
      </span>
      <strong className={`text-lg font-bold tabular-nums ${colorClass}`}>
        {value}
      </strong>
    </div>
  );
}

export function PayrollIndicators({ indicators }: Props) {
  return (
    <div className='grid grid-cols-3 gap-2'>
      <FieldIndicator 
        label="Total" 
        value={indicators.employees} 
      />
      
      <FieldIndicator 
        label="Admit." 
        value={indicators.admitted} 
        colorClass="text-emerald-600" 
      />

      <FieldIndicator 
        label="Deslig." 
        value={indicators.dismissed} 
        colorClass={indicators.dismissed > 0 ? "text-amber-600" : "text-slate-900"} 
      />

      <div className="col-span-3 mt-1 flex justify-between items-center px-3 py-2 bg-blue-50/50 rounded-lg border border-blue-100">
        <span className="text-sm font-semibold text-slate-700 uppercase">Custo Médio p/ Func.</span>
        <span className="text-sm font-semibold text-slate-800">
          R$ {indicators.avgCostPerEmployee.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </span>
      </div> 
     
    </div>
  );
}