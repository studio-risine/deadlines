'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { Stepper } from '@/components/ui/stepper'
import { PROCESS_AREAS, PROCESS_STATUS } from '@/constants/process'
import {
	type InsertProcessInput,
	useInsertProcess,
} from '@/hooks/process/use-insert-process'
import type {
	ProcessAreaType,
	ProcessPartyType,
	ProcessStatusType,
} from '@/types'
import { convertCommaSeparatedToArray } from '@/utils/convert/convert-comma-separeted-to-array'

import { BasicInfoStep } from './form-steps/basic-info-step'
import { DefendantStep } from './form-steps/defendant-step'
import { type ProcessFormData, processSchema } from './form-steps/form-types'
import { PlaintiffStep } from './form-steps/plaintiff-step'

interface AddProcessFormProps {
	onSuccess?: () => void
}

const basicInfoSchema = processSchema.pick({
	case_number: true,
	tribunal_name: true,
	area: true,
	status: true,
})

const defendantSchema = processSchema.pick({
	defendant: true,
})

const plaintiffSchema = processSchema.pick({
	plaintiff: true,
})

const steps = [
	{
		id: 'basic-info',
		title: 'Informações Básicas',
	},
	{
		id: 'defendant',
		title: 'Dados do Requerido',
	},
	{
		id: 'plaintiff',
		title: 'Dados do Requerente',
	},
]

const getDefaultValues = (): ProcessFormData => ({
	case_number: '',
	tribunal_name: '',
	area: PROCESS_AREAS[0]?.value || 'civil',
	status: PROCESS_STATUS[0]?.value || 'active',
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
})

export function AddProcessForm({ onSuccess }: AddProcessFormProps) {
	const [currentStep, setCurrentStep] = useState(1)

	const { insertProcessAsync, isPending } = useInsertProcess()

	const form = useForm<ProcessFormData>({
		resolver: zodResolver(processSchema),
		defaultValues: getDefaultValues(),
		mode: 'onChange',
	})

	const handleCancelForm = useCallback(() => {
		form.reset(getDefaultValues())
		setCurrentStep(1)
	}, [form])

	const getStepValidator = useCallback((step: number) => {
		const validators = {
			1: basicInfoSchema,
			2: defendantSchema,
			3: plaintiffSchema,
		}
		return validators[step as keyof typeof validators]
	}, [])

	const validateCurrentStep = useCallback(async (): Promise<boolean> => {
		const formData = form.getValues()
		const validator = getStepValidator(currentStep)

		if (!validator) {
			return false
		}

		try {
			validator.parse(formData)
			return true
		} catch (error) {
			await form.trigger()
			return false
		}
	}, [currentStep, form, getStepValidator])

	const handleNext = useCallback(async () => {
		const isValid = await validateCurrentStep()

		if (!isValid) {
			return
		}

		if (currentStep >= steps.length) {
			return
		}

		setCurrentStep((prev) => prev + 1)
	}, [currentStep, validateCurrentStep])

	const handlePrevious = useCallback(() => {
		if (currentStep <= 1) {
			return
		}

		setCurrentStep((prev) => prev - 1)
	}, [currentStep])

	const onSubmit = useCallback(
		async (data: ProcessFormData) => {
			try {
				const isFormValid = await form.trigger()

				if (!isFormValid) {
					return
				}

				const processData: InsertProcessInput = {
					case_number: data.case_number,
					tribunal_name: data.tribunal_name,
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

				form.reset(getDefaultValues())
				setCurrentStep(1)
				onSuccess?.()
			} catch (error) {
				console.error('Erro ao criar processo:', error)
			}
		},
		[form, insertProcessAsync, onSuccess],
	)

	const renderBasicInfoStep = useCallback(
		() => <BasicInfoStep control={form.control} />,
		[form.control],
	)

	const renderDefendantStep = useCallback(
		() => <DefendantStep control={form.control} />,
		[form.control],
	)

	const renderPlaintiffStep = useCallback(
		() => <PlaintiffStep control={form.control} />,
		[form.control],
	)

	const renderStepContent = useCallback(() => {
		const stepRenderers = {
			1: renderBasicInfoStep,
			2: renderDefendantStep,
			3: renderPlaintiffStep,
		}

		const renderer = stepRenderers[currentStep as keyof typeof stepRenderers]
		return renderer ? renderer() : null
	}, [
		currentStep,
		renderBasicInfoStep,
		renderDefendantStep,
		renderPlaintiffStep,
	])

	const renderPreviousButton = useCallback(() => {
		if (currentStep <= 1) {
			return null
		}

		return (
			<Button
				type="button"
				variant="outline"
				onClick={handlePrevious}
				disabled={isPending}
			>
				Anterior
			</Button>
		)
	}, [currentStep, handlePrevious, isPending])

	const renderActionButton = useCallback(() => {
		if (currentStep < steps.length) {
			return (
				<Button type="button" onClick={handleNext} disabled={isPending}>
					Próximo
				</Button>
			)
		}

		return (
			<Button type="submit" disabled={isPending}>
				{isPending ? 'Salvando...' : 'Salvar'}
			</Button>
		)
	}, [currentStep, handleNext, isPending])

	return (
		<div className="space-y-6">
			<Stepper steps={steps} currentStep={currentStep} />

			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
					{renderStepContent()}

					<div className="flex justify-between">
						<div>{renderPreviousButton()}</div>

						<div className="flex space-x-2">
							<Button
								type="button"
								variant="outline"
								onClick={handleCancelForm}
								disabled={isPending}
							>
								Cancelar
							</Button>

							{renderActionButton()}
						</div>
					</div>
				</form>
			</Form>
		</div>
	)
}
