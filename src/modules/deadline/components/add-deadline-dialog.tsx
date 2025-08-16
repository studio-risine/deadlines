'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { PriorityLabel } from '@/components/priority-label'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
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
import { Textarea } from '@/components/ui/textarea'
import { useCreateDeadline } from '@/hooks/deadline/use-create-deadline'

const formSchema = z.object({
	title: z.string().min(1, {
		message: 'Título é obrigatório.',
	}),
	type: z.enum([
		'Contestação',
		'Audiência de Conciliação',
		'Recurso',
		'Petição Inicial',
		'Alegações Finais',
		'Embargos de Declaração',
		'Apelação',
		'Contra-razões',
	]),
	priorityLevel: z.enum(['high', 'medium', 'low']).optional(),
	assignedTo: z.string().optional(),
	infos: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

/**
 * Modal dialog component that renders a form to create a new deadline.
 *
 * The form is managed with react-hook-form and validated with the file's Zod schema:
 * - `title` is required.
 * - `type` is required and must be one of the predefined act types.
 * - `priorityLevel` is optional (defaults to `'medium'`).
 * - `assignedTo` and `infos` are optional.
 *
 * Side effects:
 * - Calls `createDeadlineAsync` (from `useCreateDeadline`) on submit.
 * - Resets the form when the dialog opens or closes, and after a successful creation.
 * - While the create operation is pending, the submit button label changes to "Salvando...".
 *
 * @returns A React element rendering the "Adicionar Prazo" dialog and its form.
 */
export function AddDeadlineDialog() {
	const { createDeadlineAsync, isSuccess, isPending } = useCreateDeadline()

	const form = useForm<FormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			priorityLevel: 'medium',
		},
	})

	function handleDialogOpen() {
		form.reset()
	}

	function handleDialogClose() {
		form.reset()
	}

	function onSubmit(values: FormValues) {
		createDeadlineAsync(values)

		if (isSuccess) {
			form.reset()
		}
	}

	return (
		<Dialog>
			<DialogTrigger onClick={handleDialogOpen} asChild>
				<Button>Adicionar novo</Button>
			</DialogTrigger>

			<DialogContent className="w-full max-w-2xl">
				<DialogHeader>
					<DialogTitle>Adicionar Prazo</DialogTitle>
					<DialogDescription>
						Preencha as informações para cadastrar um novo prazo.
					</DialogDescription>
				</DialogHeader>

				<Card>
					<CardContent>
						<div className="flex h-14 items-center justify-center rounded-md bg-pink-50">
							<span className="text-pink-700 text-sm">Current Process</span>
						</div>
					</CardContent>
				</Card>

				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)} id="add-deadline-form">
						<div className="grid grid-cols-1 gap-4 lg:grid-cols-6">
							<div className="col-span-full">
								<FormField
									control={form.control}
									name="title"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Título</FormLabel>
											<FormControl>
												<Input placeholder="Título do prazo" {...field} />
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="col-span-4">
								<FormField
									control={form.control}
									name="type"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Tipo de Ato</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value ?? undefined}
											>
												<FormControl>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Selecione o tipo de ato" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="Contestação">
														<span className="truncate">Contestação</span>
													</SelectItem>
													<SelectItem value="Audiência de Conciliação">
														<span className="truncate">
															Audiência de Conciliação
														</span>
													</SelectItem>
													<SelectItem value="Recurso">
														<span className="truncate">Recurso</span>
													</SelectItem>
													<SelectItem value="Petição Inicial">
														<span className="truncate">Petição Inicial</span>
													</SelectItem>
													<SelectItem value="Alegações Finais">
														<span className="truncate">Alegações Finais</span>
													</SelectItem>
													<SelectItem value="Embargos de Declaração">
														<span className="truncate">
															Embargos de Declaração
														</span>
													</SelectItem>
													<SelectItem value="Apelação">
														<span className="truncate">Apelação</span>
													</SelectItem>
													<SelectItem value="Contra-razões">
														<span className="truncate">Contra-razões</span>
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="col-span-2">
								<FormField
									control={form.control}
									name="priorityLevel"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Prioridade</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Selecione a prioridade" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="high">
														<PriorityLabel level="high" />
													</SelectItem>
													<SelectItem value="medium">
														<PriorityLabel level="medium" />
													</SelectItem>
													<SelectItem value="low">
														<PriorityLabel level="low" />
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="col-span-full">
								<FormField
									control={form.control}
									name="assignedTo"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Responsável</FormLabel>
											<Select
												onValueChange={field.onChange}
												defaultValue={field.value}
											>
												<FormControl>
													<SelectTrigger className="w-full">
														<SelectValue placeholder="Selecione o responsável" />
													</SelectTrigger>
												</FormControl>
												<SelectContent>
													<SelectItem value="dr-joão">
														<span className="truncate">Dr. João Advogado</span>
													</SelectItem>
													<SelectItem value="dr-maria">
														<span className="truncate">Dr. Maria Advogada</span>
													</SelectItem>
													<SelectItem value="dr-josé">
														<span className="truncate">Dr. José Advogado</span>
													</SelectItem>
												</SelectContent>
											</Select>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<div className="col-span-full">
								<FormField
									control={form.control}
									name="infos"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Observações</FormLabel>
											<FormControl>
												<Textarea
													placeholder="Escreva uma observação para o prazo."
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>
						</div>
					</form>
				</Form>

				<DialogFooter>
					<DialogClose onClick={handleDialogClose} asChild>
						<Button variant="outline">Cancel</Button>
					</DialogClose>
					<Button type="submit" form="add-deadline-form">
						{isPending ? 'Salvando...' : 'Salvar Prazo'}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}
