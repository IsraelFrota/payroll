import { useCompany } from '@/app/context/company-context';

export const Switcher = () => {
  const { company, companies, setCompany } = useCompany();

  return (
    <div className='flex items-center gap-2'>
      <span className='text-xs text-gray-500'>Empresa</span>

      <select
        value={company?._id}
        onChange={(e) => {
          const selected = companies.find(c => c._id === e.target.value)!;
          setCompany(selected);
        }}
        className='
          text-xs
          rounded-md
          border border-gray-200
          bg-white/70
          px-2 py-1
          text-gray-800
          backdrop-blur-md
          focus:outline-none
          focus:ring-2 focus:ring-orange-400/50
        '
      >
        {companies?.map(c => (
          <option key={c._id} value={c._id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
};