'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

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
import { useCreateProcess } from '@/hooks/process/use-create-process'
import { toast } from 'sonner'

const formSchema = z.object({
	register: z.string().min(1, {
		message: 'Número do processo é obrigatório.',
	}),
	client: z.string().min(1, {
		message: 'Cliente é obrigatório.',
	}),
	opposingParty: z.string().optional(),
	status: z.enum(['open', 'closed', 'pending']).optional(),
})

type FormValues = z.infer<typeof formSchema>

interface AddProcessFormProps {
	onSuccess?: () => void
}

export function AddProcessForm({ onSuccess }: AddProcessFormProps) {
	const { createProcess } = useCreateProcess()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			register: '',
			client: '',
			opposingParty: '',
			status: 'open',
		},
	})

	async function onSubmit(values: FormValues) {
		try {
			await createProcess({
				register: values.register,
				client: values.client,
				opposingParty: values.opposingParty || undefined,
				status: values.status,
			})

			toast.success('Processo criado com sucesso!')
			form.reset()
			onSuccess?.()
		} catch (error) {
			console.error('Erro ao criar processo:', error)
			toast.error('Erro ao criar processo. Tente novamente.')
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
									<SelectItem value="open">Aberto</SelectItem>
									<SelectItem value="pending">Pendente</SelectItem>
									<SelectItem value="closed">Fechado</SelectItem>
								</SelectContent>
							</Select>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="flex justify-end space-x-2">
					<Button type="button" variant="outline" onClick={() => form.reset()}>
						Cancelar
					</Button>
					<Button type="submit" disabled={form.formState.isSubmitting}>
						{form.formState.isSubmitting ? 'Criando...' : 'Criar Processo'}
					</Button>
				</div>
			</form>
		</Form>
	)
}
