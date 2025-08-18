'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import type { Id } from '../../../../convex/_generated/dataModel'

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
import { useUpdateProcess } from '@/hooks/process/use-update-process'
import {
	type Process,
	type ProcessFormValues,
	processFormSchema,
} from '@/types/process'

interface EditProcessFormProps {
	process: Process
	onSuccess?: () => void
}

export function EditProcessForm({ process, onSuccess }: EditProcessFormProps) {
	const { updateProcessAsync, isPending } = useUpdateProcess()

	const form = useForm<ProcessFormValues>({
		resolver: zodResolver(processFormSchema),
		defaultValues: {
			register: process.register,
			client: process.client,
			opposingParty: process.opposingParty || '',
			status: process.status || 'active',
		},
	})

	async function onSubmit(values: ProcessFormValues) {
		try {
			await updateProcessAsync({
				id: process._id as Id<'processes'>,
				client: values.client,
				opposingParty: values.opposingParty || undefined,
				status: values.status,
			})

			onSuccess?.()
		} catch (error) {
			console.error('Erro ao atualizar processo:', error)
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
								<Input
									placeholder="Ex: 1234567-89.2024.8.26.0001"
									{...field}
									disabled
									className="bg-muted"
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
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
					name="opposingParty"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Parte Contrária</FormLabel>
							<FormControl>
								<Input
									placeholder="Nome da parte contrária (opcional)"
									{...field}
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
				/>

				<div className="flex justify-end space-x-2">
					<Button type="button" variant="outline" onClick={onSuccess}>
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
