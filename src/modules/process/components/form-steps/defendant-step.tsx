'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
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
import { PARTY_TYPES } from '@/constants/process'
import type { FormStepProps } from './form-types'

export function DefendantStep({ control }: FormStepProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Dados do Requerido</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<FormField
					control={control}
					name="defendant.name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Nome *</FormLabel>
							<FormControl>
								<Input
									id="defendant_name"
									placeholder="Nome do requerido"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<div className="grid grid-cols-2 gap-4">
					<FormField
						control={control}
						name="defendant.type"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Tipo *</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
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
						control={control}
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
					control={control}
					name="defendant.lawyers"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Advogados</FormLabel>
							<FormControl>
								<Input placeholder="Nomes separados por vírgula" {...field} />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>
			</CardContent>
		</Card>
	)
}
