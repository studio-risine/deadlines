'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
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
import { Stepper } from '@/components/ui/stepper'
import { PARTY_TYPES, PROCESS_AREAS, PROCESS_STATUS } from '@/constants/process'
import {
	type InsertProcessInput,
	useCreateProcess,
	useInsertProcess,
} from '@/hooks/process/use-insert-process'
import type {
	ProcessAreaType,
	ProcessPartyType,
	ProcessStatusType,
} from '@/types'
import { convertCommaSeparatedToArray } from '@/utils/convert/convert-comma-separeted-to-array'

interface AddProcessFormProps {
	onSuccess?: () => void
}

const processSchema = z.object({
	case_number: z.string().min(1, 'Número do processo é obrigatório'),
	court: z.string().min(1, 'Tribunal é obrigatório'),
	area: z.enum(PROCESS_AREAS.map((area) => area.value)),
	status: z.enum(PROCESS_STATUS.map((status) => status.value)),

	defendant: z.object({
		name: z.string().min(1, 'Nome do requerente é obrigatório'),
		type: z.enum(['individual', 'company', 'government']),
		document: z.string().optional(),
		lawyers: z.string().optional(),
	}),

	plaintiff: z.object({
		name: z.string().min(1, 'Nome do requerido é obrigatório'),
		type: z.enum(['individual', 'company', 'government']),
		document: z.string().optional(),
		lawyers: z.string().optional(),
	}),
})

const basicInfoSchema = processSchema.pick({
	case_number: true,
	court: true,
	area: true,
	status: true,
})

const defendantSchema = processSchema.pick({
	defendant: true,
})

const plaintiffSchema = processSchema.pick({
	plaintiff: true,
})

type ProcessFormData = z.infer<typeof processSchema>

const steps = [
	{
		id: 'basic-info',
		title: 'Informações Básicas',
	},
	{
		id: 'defendant',
		title: 'Dados do Requerente',
	},
	{
		id: 'plaintiff',
		title: 'Dados do Requerido',
	},
]

export function AddProcessForm({ onSuccess }: AddProcessFormProps) {
	const [currentStep, setCurrentStep] = useState(1)

	const { insertProcessAsync, isPending } = useInsertProcess()

	const form = useForm<ProcessFormData>({
		resolver: zodResolver(processSchema),
		defaultValues: {
			case_number: '',
			court: '',
			area: 'civil',
			status: 'active',
			defendant: {
				name: '',
				type: 'individual',
				document: '',
				lawyers: '',
			},
			plaintiff: {
				name: '',
				type: 'individual',
				document: '',
				lawyers: '',
			},
		},
	})

	function handleCancelForm() {
		form.reset()
		setCurrentStep(1)
	}

	async function validateCurrentStep(): Promise<boolean> {
		const formData = form.getValues()

		try {
			switch (currentStep) {
				case 1:
					basicInfoSchema.parse(formData)
					return true
				case 2:
					defendantSchema.parse(formData)
					return true
				case 3:
					plaintiffSchema.parse(formData)
					return true
				default:
					return false
			}
		} catch (error) {
			await form.trigger()
			return false
		}
	}

	async function handleNext() {
		const isValid = await validateCurrentStep()

		if (isValid && currentStep < steps.length) {
			setCurrentStep(currentStep + 1)
		}
	}

	function handlePrevious() {
		if (currentStep > 1) {
			setCurrentStep(currentStep - 1)
		}
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

			await insertProcessAsync(processData)

			form.reset()
			setCurrentStep(1)
			onSuccess?.()
		} catch (error) {
			console.error('Erro ao criar processo:', error)
		}
	}

	function renderStepContent() {
		switch (currentStep) {
			case 1:
				return (
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
				)

			case 2:
				return (
					<Card>
						<CardHeader>
							<CardTitle>Dados do Requerido</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<FormField
								control={form.control}
								name="defendant.name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nome *</FormLabel>
										<FormControl>
											<Input placeholder="Nome do requerido" {...field} />
										</FormControl>
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
									</FormItem>
								)}
							/>
						</CardContent>
					</Card>
				)

			case 3:
				return (
					<Card>
						<CardHeader>
							<CardTitle>Dados do Requerente</CardTitle>
						</CardHeader>
						<CardContent className="space-y-4">
							<FormField
								control={form.control}
								name="plaintiff.name"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nome *</FormLabel>
										<FormControl>
											<Input placeholder="Nome do requerente" {...field} />
										</FormControl>
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
				)

			default:
				return null
		}
	}

	return (
		<div className="space-y-6">
			<Stepper steps={steps} currentStep={currentStep} />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{renderStepContent()}

					<div className="flex justify-between">
						<div>
							{currentStep > 1 && (
								<Button
									type="button"
									variant="outline"
									onClick={handlePrevious}
								>
									Anterior
								</Button>
							)}
						</div>

						<div className="flex space-x-2">
							<Button
								type="button"
								variant="outline"
								onClick={handleCancelForm}
							>
								Cancelar
							</Button>

							{currentStep < steps.length ? (
								<Button type="button" onClick={handleNext}>
									Próximo
								</Button>
							) : (
								<Button type="submit" disabled={isPending}>
									{isPending ? 'Salvando...' : 'Salvar'}
								</Button>
							)}
						</div>
					</div>
				</form>
			</Form>
		</div>
	)
}
