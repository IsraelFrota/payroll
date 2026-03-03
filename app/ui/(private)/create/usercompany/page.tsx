'use client';

export default function UserCompanyPage() {
  const userCompany = {
    userId: '69a5eb3f80d293c9596ca682',
		companyId: '69a5f1bb104aa832176a89fe',
		role: 'admin'
  };

  const createUserCompany = async () => {
    try {
      const response = await fetch('/api/user-company', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userCompany),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || 'Erro ao criar relação user -> company');
        return;
      }

      alert('Relação criada com sucesso.');
      console.log('Relação criada:', data);

    } catch (error) {
      console.error('Erro inesperado:', error);
      alert('Erro inesperado.');
    }
  };

  return (
    <main className='p-6'>
      <button
        onClick={createUserCompany}
        className='px-4 py-2 bg-black text-white rounded'
      >
        {'Criar relação usuário -> empresa'}
      </button>
    </main>
  );
}
