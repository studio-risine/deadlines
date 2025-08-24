'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
import { useState } from 'react'
import { AddProcessForm } from './add-process-form'

export function AddProcessDialog() {
	const [open, setOpen] = useState(false)

	const handleSuccess = () => {
		setOpen(false)
	}

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger asChild>
				<Button>Adicionar</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Adicionar Processo</DialogTitle>
					<DialogDescription>
						Preencha os dados do novo processo. Campos marcados com * são
						obrigatórios.
					</DialogDescription>
				</DialogHeader>
				<AddProcessForm onSuccess={handleSuccess} />
			</DialogContent>
		</Dialog>
	)
}
