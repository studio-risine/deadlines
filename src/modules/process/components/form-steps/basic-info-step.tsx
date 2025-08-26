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
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectScrollDownButton,
	SelectScrollUpButton,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import { PROCESS_AREAS, PROCESS_STATUS } from '@/constants/process'
import {
	JUDICIAL_SEGMENTS,
	STATE_COURT_CODES,
	FEDERAL_COURT_CODES,
	LABOR_COURT_CODES,
	ELECTORAL_COURT_CODES,
} from '@/constants/cnj-mappings'
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
					name="tribunal_name"
					render={({ field }) => (
						<FormItem>
							<FormLabel>Tribunal *</FormLabel>
							<Select onValueChange={field.onChange} value={field.value}>
								<FormControl>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder="Selecione o tribunal" />
									</SelectTrigger>
								</FormControl>

								<SelectContent className="max-h-[300px]">
									<SelectScrollUpButton />

									<SelectGroup>
										<SelectLabel>{JUDICIAL_SEGMENTS['5']}</SelectLabel>
										{Object.entries(LABOR_COURT_CODES).map(([code, name]) => (
											<SelectItem key={`labor-${code}`} value={`labor-${code}`}>
												{name}
											</SelectItem>
										))}
									</SelectGroup>

									<SelectGroup>
										<SelectLabel>{JUDICIAL_SEGMENTS['6']}</SelectLabel>
										{Object.entries(ELECTORAL_COURT_CODES).map(([code, name]) => (
											<SelectItem key={`electoral-${code}`} value={`electoral-${code}`}>
												{name}
											</SelectItem>
										))}
									</SelectGroup>

									<SelectGroup>
										<SelectLabel>{JUDICIAL_SEGMENTS['7']}</SelectLabel>
										<SelectItem value="military-union">{JUDICIAL_SEGMENTS['7']}</SelectItem>
									</SelectGroup>

									{/* Justiça dos Estados e do DF */}
									<SelectGroup>
										<SelectLabel>{JUDICIAL_SEGMENTS['8']}</SelectLabel>
										{Object.entries(STATE_COURT_CODES).map(([code, name]) => (
											<SelectItem key={`state-${code}`} value={`state-${code}`}>
												{name}
											</SelectItem>
										))}
									</SelectGroup>

									<SelectGroup>
										<SelectLabel>{JUDICIAL_SEGMENTS['9']}</SelectLabel>
										<SelectItem value="military-state">{JUDICIAL_SEGMENTS['9']}</SelectItem>
									</SelectGroup>

									<SelectScrollDownButton />
								</SelectContent>
							</Select>
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
										<SelectTrigger className='w-full'>
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
										<SelectTrigger className='w-full'>
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
