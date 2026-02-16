import { Company } from '../../../mock';
import { useCompany } from "@/app/context/company-context";

type SwitcherProps = {
  companies: Company[];
};

export const Switcher = ({ companies }: SwitcherProps) => {
  const { company, setCompany } = useCompany();

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-gray-500">Empresa</span>

      <select
        value={company.id}
        onChange={(e) => {
          const selected = companies.find(c => c.id === e.target.value)!;
          setCompany(selected);
        }}
        className="
          text-xs
          rounded-md
          border border-gray-200
          bg-white/70
          px-2 py-1
          text-gray-800
          backdrop-blur-md
          focus:outline-none
          focus:ring-2 focus:ring-orange-400/50
        "
      >
        {companies.map(c => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </div>
  );
};