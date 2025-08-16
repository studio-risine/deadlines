import { SiteHeader } from '@/components/site-header'
import { columns } from '../components/columns'
import { DataTable } from '../components/data-table'

const data = [
	{
		id: 1,
		header: '1234567-89.2024.1.23.4567',
		description:
			'Contestação da ação de cobrança\n\nAguardando documentos do cliente para elaboração da contestação',
		type: 'Contestação',
		status: 'Vencido',
		limit: '15/08/2024',
		priority: 'Alta',
		assigned: 'Dr. João Advogado',
	},
	{
		id: 2,
		header: '1234567-89.2024.1.23.4567',
		description:
			'Audiência de conciliação\n\nPreparar proposta de acordo para a audiência',
		type: 'Audiência de Conciliação',
		status: 'Vencido',
		limit: '03/09/2024',
		priority: 'Média',
		assigned: 'Dr. João Advogado',
	},
	{
		id: 3,
		header: '9876543-21.2024.5.43.2109',
		description:
			'Elaboração de recurso de apelação\n\nAnálise dos autos e fundamentação jurídica para recurso',
		type: 'Recurso',
		status: 'Em andamento',
		limit: '25/08/2024',
		priority: 'Alta',
		assigned: 'Dra. Maria Silva',
	},
	{
		id: 4,
		header: '5555444-33.2024.2.11.9876',
		description:
			'Petição inicial - Ação trabalhista\n\nRedação da inicial com base na documentação fornecida',
		type: 'Petição Inicial',
		status: 'Concluído',
		limit: '10/08/2024',
		priority: 'Baixa',
		assigned: 'Dr. Pedro Santos',
	},
]

export function DeadlinesView() {
	return (
		<>
			<SiteHeader title="Prazos" />
			<div className="flex flex-1 flex-col">
				<div className="@container/main flex flex-1 flex-col gap-2">
					<div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
						{/* <SectionCards /> */}
						<div className="px-4 lg:px-6">{/* <ChartAreaInteractive /> */}</div>
						<div className="px-4 lg:px-6">
							<DataTable columns={columns} data={data} />
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
