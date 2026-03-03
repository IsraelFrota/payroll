'use client';

export default function CompanyPage() {
  const company = {
    name: 'Acme RJ',
    cnpj: '12345678000390',
    code: 'acme-003',
    companyType: 'filial',
    parentId: '69a5f1bb104aa832176a89fe',
  };

  const createCompany = async () => {
    try {
      const response = await fetch('/api/companies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(company),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Erro ao criar empresa');
        return;
      }

      alert('Empresa criada com sucesso.');
      console.log('Empresa criada:', data);

    } catch (error) {
      console.error('Erro inesperado:', error);
      alert('Erro inesperado.');
    }
  };

  return (
    <main className='p-6'>
      <button
        onClick={createCompany}
        className='px-4 py-2 bg-black text-white rounded'
      >
        Criar empresa
      </button>
    </main>
  );
}
