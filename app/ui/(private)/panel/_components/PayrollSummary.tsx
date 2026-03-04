type Props = {
  summary: {
    title: string;
    value: number;
    variant?: 'default' | 'success' | 'danger' | 'highlight';
  }[];
};

export function PayrollSummary({ summary }: Props) {
  return (
    <div className='space-y-2'>
      {summary.map((item) => {
        const isNegative = item.value < 0;
        const isTotal = 
					item.title.toLowerCase().includes('líquido') ||
					item.title.toLowerCase().includes('total');

        return (
          <div
            key={item.title}
            className='flex justify-between items-center text-sm transition-all'
          >
            <span className='text-muted-foreground font-medium'>
              {item.title}
            </span>

						<div className='border border-dashed flex-1 mx-2'></div>
            
            <strong className={`
              tabular-nums tracking-tight
              ${isTotal ? 'text-base text-slate-900' : 'text-slate-700'}
              ${isNegative ? 'text-red-600' : ''}
            `}>
              {item.value.toLocaleString('pt-BR', {
                style: 'currency',
                currency: 'BRL',
              })}
            </strong>
          </div>
        );
      })}
    </div>
  );
}