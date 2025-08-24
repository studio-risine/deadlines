'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { PARTY_TYPES, PROCESS_AREAS, PROCESS_STATUS } from '@/constants/process'
import {
	type InsertProcessInput,
	useCreateProcess,
} from '@/hooks/process/use-insert-process'
import type {
	ProcessAreaType,
	ProcessPartyType,
	ProcessStatusType,
} from '@/types'
import { parseCommaSeparatedString as convertCommaSeparatedToArray } from '@/utils/convertes/parse-comma-separeted-string'

interface AddProcessFormProps {
	onSuccess?: () => void
}

const processSchema = z.object({
	case_number: z.string().min(1, 'Número do processo é obrigatório'),
	court: z.string().min(1, 'Tribunal é obrigatório'),
	area: z.enum(PROCESS_AREAS.map((area) => area.value)),
	status: z.enum(PROCESS_STATUS.map((status) => status.value)),

	defendant: z.object({
		name: z.string().min(1, 'Nome do réu é obrigatório'),
		type: z.enum(['individual', 'company', 'government']),
		document: z.string().optional(),
		lawyers: z.string().optional(),
	}),

	plaintiff: z.object({
		name: z.string().min(1, 'Nome do autor é obrigatório'),
		type: z.enum(['individual', 'company', 'government']),
		document: z.string().optional(),
		lawyers: z.string().optional(),
	}),
})

type ProcessFormData = z.infer<typeof processSchema>

export function AddProcessForm({ onSuccess }: AddProcessFormProps) {
	const { createProcessAsync, isPending } = useCreateProcess()

	const form = useForm<ProcessFormData>({
		resolver: zodResolver(processSchema),
		defaultValues: {
			area: 'civil',
			status: 'active',
			defendant: {
				type: 'individual',
			},
			plaintiff: {
				type: 'individual',
			},
		},
	})

	function handleCancelForm() {
		form.reset()
	}

	async function onSubmit(data: ProcessFormData) {
		try {
			const processData: InsertProcessInput = {
				case_number: data.case_number,
				court: data.court,
				area: data.area as ProcessAreaType,
				status: data.status as ProcessStatusType,
				parties: {
					defendant: {
						name: data.defendant.name,
						type: data.defendant.type as ProcessPartyType,
						document: data.defendant.document || undefined,
					},
					plaintiff: {
						name: data.plaintiff.name,
						type: data.plaintiff.type as ProcessPartyType,
						document: data.plaintiff.document || undefined,
					},
					lawyers: {
						defendant: convertCommaSeparatedToArray(data.defendant.lawyers),
						plaintiff: convertCommaSeparatedToArray(data.plaintiff.lawyers),
					},
				},
			}

			await createProcessAsync(processData)
			form.reset()
			onSuccess?.()
		} catch (error) {
			console.error('Erro ao criar processo:', error)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<Card>
					<CardHeader>
						<CardTitle>Informações Básicas</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="case_number"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Número do Processo *</FormLabel>
									<FormControl>
										<Input
											placeholder="Ex: 1234567-89.2024.8.26.0001"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="court"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Tribunal *</FormLabel>
									<FormControl>
										<Input
											placeholder="Ex: 1ª Vara Cível de São Paulo"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="area"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Área *</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecione a área" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{PROCESS_AREAS.map((area) => (
													<SelectItem key={area.value} value={area.value}>
														{area.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="status"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status *</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecione o status" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{PROCESS_STATUS.map((status) => (
													<SelectItem key={status.value} value={status.value}>
														{status.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Dados do Réu</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="defendant.name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome *</FormLabel>
									<FormControl>
										<Input placeholder="Nome do réu" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="defendant.type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipo *</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Tipo de pessoa" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{PARTY_TYPES.map((type) => (
													<SelectItem key={type.value} value={type.value}>
														{type.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="defendant.document"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Documento</FormLabel>
										<FormControl>
											<Input placeholder="CPF/CNPJ" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="defendant.lawyers"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Advogados</FormLabel>
									<FormControl>
										<Input
											placeholder="Nomes separados por vírgula"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Dados do Autor</CardTitle>
					</CardHeader>
					<CardContent className="space-y-4">
						<FormField
							control={form.control}
							name="plaintiff.name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nome *</FormLabel>
									<FormControl>
										<Input placeholder="Nome do autor" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="grid grid-cols-2 gap-4">
							<FormField
								control={form.control}
								name="plaintiff.type"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipo *</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Tipo de pessoa" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{PARTY_TYPES.map((type) => (
													<SelectItem key={type.value} value={type.value}>
														{type.label}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="plaintiff.document"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Documento</FormLabel>
										<FormControl>
											<Input placeholder="CPF/CNPJ" {...field} />
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<FormField
							control={form.control}
							name="plaintiff.lawyers"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Advogados</FormLabel>
									<FormControl>
										<Input
											placeholder="Nomes separados por vírgula"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</CardContent>
				</Card>

				<div className="flex justify-end space-x-2">
					<Button type="button" variant="outline" onClick={handleCancelForm}>
						Cancelar
					</Button>
					<Button type="submit" disabled={isPending}>
						{isPending ? 'Salvando...' : 'Salvar Processo'}
					</Button>
				</div>
			</form>
		</Form>
	)
}
