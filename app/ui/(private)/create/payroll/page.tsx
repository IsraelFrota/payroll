"use client";

export default function PayrollPage() {
  const payroll = {
		"companyId": "69a5f1bb104aa832176a89fe",
		"competence": "2026-01",
		"paymentTermLabel": "Janeiro/2026",
		"sentAt": "2026-01-02T12:00:00.000Z",

		"summary": [
			{ "title": "Total Bruto", "value": 28500 },
			{ "title": "Total de Encargos", "value": 8200 },
			{ "title": "Total Líquido", "value": 23450 },
			{ "title": "Total das Obrigações", "value": 9100 }
		],

		"events": [
			{
				"code": "FERIAS",
				"description": "Férias do mês",
				"amount": 4500,
				"category": "PROVENTO"
			},
			{
				"code": "MULTA_RESCISORIA",
				"description": "Multa 40% FGTS",
				"amount": 3200,
				"category": "ENCARGO"
			}
		],

		"details": [
			{
				"obligation": "INSS",
				"amount": 5200,
				"dueDate": "2026-02-20",
				"documentType": "GPS"
			},
			{
				"obligation": "FGTS",
				"amount": 2600,
				"dueDate": "2026-02-07",
				"documentType": "GRF"
			},
			{
				"obligation": "IRRF",
				"amount": 1300,
				"dueDate": "2026-02-20",
				"documentType": "DARF"
			}
		],

		"indicators": {
			"employees": 5,
			"admitted": 1,
			"dismissed": 1,
			"avgCostPerEmployee": 7340
		},

		"evolution": [
			{ "month": "2025-08", "amount": 25000 },
			{ "month": "2025-09", "amount": 25500 },
			{ "month": "2025-10", "amount": 26800 },
			{ "month": "2025-11", "amount": 27200 },
			{ "month": "2025-12", "amount": 27900 },
			{ "month": "2026-01", "amount": 28500 }
		]
	};


  const payroll1 = {
		"companyId": "69a5f1bb104aa832176a89fe",
		"competence": "2026-01",
		"paymentTermLabel": "Janeiro/2026",
		"sentAt": "2026-01-02T12:00:00.000Z",
		"summary": [
			{ "title": "Total Bruto", "value": 145000 },
			{ "title": "Total de Encargos", "value": 43000 },
      { "title": "Total Líquido", "value": 102000 },
      { "title": "Total das Obrigações", "value": 48500 }
		],
		"details": [
			{
				"obligation": "INSS",
				"amount": 22000,
				"dueDate": "2026-02-20",
				"documentType": "GPS"
			},
      {
				"obligation": "FGTS",
				"amount": 14500,
				"dueDate": "2026-02-07",
				"documentType": "GRF"
			},
      {
				"obligation": "IRRF",
				"amount": 12000,
				"dueDate": "2026-02-20",
				"documentType": "DARF"
			}
		],
		"indicators": {
			"employees": 27,
			"admitted": 2,
			"dismissed": 0,
			"avgCostPerEmployee": 5370
		},
		"evolution": [
			{ "month": "2025-08", "amount": 125000 },
			{ "month": "2025-09", "amount": 130000 },
      { "month": "2025-09", "amount": 135000 },
      { "month": "2025-09", "amount": 140000 },
      { "month": "2025-09", "amount": 143000 },
      { "month": "2025-09", "amount": 145000 },
		]
	};

  const payroll2 = {
		"companyId": "69a5f218104aa832176a8a01",
		"competence": "2026-01",
		"paymentTermLabel": "Janeiro/2026",
		"sentAt": "2026-01-02T12:00:00.000Z",
		"summary": [
			{ "title": "Total Bruto", "value": 100000 },
			{ "title": "Total de Encargos", "value": 29000 },
      { "title": "Total Líquido", "value": 71000 },
      { "title": "Total das Obrigações", "value": 34000 }
		],
		"details": [
			{
				"obligation": "INSS",
				"amount": 16000,
				"dueDate": "2026-02-20",
				"documentType": "GPS"
			},
      {
				"obligation": "FGTS",
				"amount": 10000,
				"dueDate": "2026-02-07",
				"documentType": "GRF"
			},
      {
				"obligation": "IRRF",
				"amount": 8000,
				"dueDate": "2026-02-20",
				"documentType": "DARF"
			}
		],
		"indicators": {
			"employees": 19,
			"admitted": 1,
			"dismissed": 1,
			"avgCostPerEmployee": 5260
		},
		"evolution": [
			{ "month": "2025-08", "amount": 80000 },
			{ "month": "2025-09", "amount": 82000 },
      { "month": "2025-09", "amount": 85000 },
      { "month": "2025-09", "amount": 88000 },
      { "month": "2025-09", "amount": 95000 },
      { "month": "2025-09", "amount": 100000 },
		]
	};

  const createPayroll = async () => {
    try {
      const response = await fetch("/api/payrolls", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payroll2),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao criar folha de pagamento");
        return;
      }

      alert("Folha de pagamento criada com sucesso.");
      console.log("Folha de pagamento criada:", data);

    } catch (error) {
      console.error("Erro inesperado:", error);
      alert("Erro inesperado.");
    }
  };

  return (
    <main className="p-6">
      <button
        onClick={createPayroll}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Criar folha de pagamento
      </button>
    </main>
  );
}
