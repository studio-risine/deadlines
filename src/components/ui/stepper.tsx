import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

interface Step {
  id: string
  title: string
  description?: string
}

interface StepperProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export function Stepper({ steps, currentStep, className }: StepperProps) {
  return (
    <div className={cn('w-full', className)}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const stepNumber = index + 1
          const isCompleted = stepNumber < currentStep
          const isCurrent = stepNumber === currentStep
          const isUpcoming = stepNumber > currentStep

          return (
            <div key={step.id} className="flex items-center">
              {/* Step Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={cn(
                    'flex h-10 w-10 items-center justify-center rounded-full border-2 text-sm font-medium transition-colors',
                    {
                      'border-primary bg-primary text-primary-foreground': isCompleted,
                      'border-primary bg-background text-primary': isCurrent,
                      'border-muted-foreground/25 bg-background text-muted-foreground': isUpcoming,
                    }
                  )}
                >
                  {isCompleted ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <span>{stepNumber}</span>
                  )}
                </div>
                
                {/* Step Title */}
                <div className="mt-2 text-center">
                  <div
                    className={cn(
                      'text-sm font-medium',
                      {
                        'text-primary': isCompleted || isCurrent,
                        'text-muted-foreground': isUpcoming,
                      }
                    )}
                  >
                    {step.title}
                  </div>
                  {step.description && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {step.description}
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'mx-4 h-0.5 flex-1 transition-colors',
                    {
                      'bg-primary': stepNumber < currentStep,
                      'bg-muted-foreground/25': stepNumber >= currentStep,
                    }
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}