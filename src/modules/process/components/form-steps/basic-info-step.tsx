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
import { PROCESS_AREAS, PROCESS_STATUS } from '@/constants/process'
import type { FormStepProps } from './form-types'

export function BasicInfoStep({ control }: FormStepProps) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Informações Básicas</CardTitle>
			</CardHeader>
			<CardContent className="space-y-4">
				<FormField
					control={control}
					name="case_number"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Número do Processo *</FormLabel>
							<FormControl>
								<Input
									id="case_number"
									placeholder="Ex: 1234567-89.2024.8.26.0001"
									{...field}
								/>
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<FormField
					control={control}
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
						control={control}
						name="area"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Área *</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
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
						control={control}
						name="status"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Status *</FormLabel>
								<Select onValueChange={field.onChange} value={field.value}>
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
}
