'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
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
import { PROCESS_STATUS } from '@/constants/process'
import { useCreateProcess } from '@/hooks/process/use-create-process'
import z from 'zod'

interface AddProcessFormProps {
	onSuccess?: () => void
}

export const processTypeSchema = z.enum([
	'active',
	'undefined',
	'dismissed',
	'closed',
	'suspended',
	'archived',
])

export const processSchema = z.object({
	register: z.string(),
	// client: z.string(),
	// adverse: z.string().nullable(),
	// status: processTypeSchema.nullable(),
})

export type ProcessDataForm = z.infer<typeof processSchema>

export function AddProcessForm({ onSuccess }: AddProcessFormProps) {
	const { createProcessAsync, isPending } = useCreateProcess()

	const form = useForm<ProcessDataForm>({
		resolver: zodResolver(processSchema),
		defaultValues: {
			// register: '',
			// client: '',
			// adverse: '',
			// status: 'active',
		},
	})

	async function onSubmit(DataForm: ProcessDataForm) {
		try {
			await createProcessAsync({
				register: DataForm.register,
				// client: DataForm.client,
				// adverse: DataForm.adverse || undefined,
				// status: DataForm.status || undefined,
			})

			form.reset()
			onSuccess?.()
		} catch (error) {
			console.error('Erro ao criar processo:', error)
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
				<FormField
					control={form.control}
					name="register"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Número do Processo *</FormLabel>
							<FormControl>
								<Input placeholder="Ex: 1234567-89.2024.8.26.0001" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				{/* <FormField
					control={form.control}
					name="client"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Cliente *</FormLabel>
							<FormControl>
								<Input placeholder="Nome do cliente" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="adverse"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Parte Adversa</FormLabel>
							<FormControl>
								<Input
									placeholder="Nome da parte adversa"
									{...field}
									value={field.value ?? ''}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={form.control}
					name="status"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Status</FormLabel>
							<Select onValueChange={field.onChange} defaultValue={field.value}>
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
				/> */}

				<div className="flex justify-end space-x-2">
					<Button type="button" variant="outline" onClick={() => form.reset()}>
						Cancelar
					</Button>
					<Button type="submit" disabled={isPending}>
						{isPending ? 'Salvando...' : 'Salvar'}
					</Button>
				</div>
			</form>
		</Form>
	)
}
