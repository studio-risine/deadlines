# Boas Práticas para Frontend Next.js - Legal Deadlines Management

Baseado na análise do projeto **Legal Deadlines Management**, este documento estabelece as diretrizes e boas práticas para desenvolvimento frontend com Next.js, priorizando performance, manutenibilidade e princípios do Clean Code.

## 📁 Estrutura de Projeto

### Organização de Diretórios


**Princípios:**
- **Separação por domínio**: Organize código por funcionalidade, não por tipo de arquivo
- **Colocação próxima**: Mantenha arquivos relacionados próximos
- **Nomenclatura clara**: Use nomes descritivos e consistentes

## 🎯 Componentes

### 1. Estrutura de Componentes

```typescript
// ✅ Bom: Componente focado em uma responsabilidade
import type { PriorityLevelType } from '@/types'

type PriorityProps = {
  level: PriorityLevelType | null
}

const PriorityMap: Record<PriorityLevelType, string> = {
  high: 'Alta',
  medium: 'Média',
  low: 'Baixa',
}

export function PriorityLabel({ level }: PriorityProps) {
  if (!level) return null

  return (
    <div className="flex items-center gap-2">
      <PriorityBadge level={level} />
      <span className="font-medium text-muted-foreground">
        {PriorityMap[level]}
      </span>
    </div>
  )
}
```

### 2. Padrões de Componentes

#### **Componentes de UI Base**
```typescript
// ✅ Use class-variance-authority para variantes
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-semibold transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-white hover:bg-destructive/90',
        outline: 'border bg-background hover:bg-accent',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-8 px-3',
        lg: 'h-12 px-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonProps 
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({ className, variant, size, asChild, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />
  )
}
```

#### **Componentes Compostos**
```typescript
// ✅ Componente composto com subcomponentes
interface DeadlineCardProps {
  deadline: Deadline
  onEdit?: (id: string) => void
  onDelete?: (id: string) => void
}

export function DeadlineCard({ deadline, onEdit, onDelete }: DeadlineCardProps) {
  return (
    <Card>
      <DeadlineCard.Header>
        <DeadlineCard.Title>{deadline.title}</DeadlineCard.Title>
        <DeadlineCard.Actions onEdit={onEdit} onDelete={onDelete} />
      </DeadlineCard.Header>
      <DeadlineCard.Content>
        <PriorityLabel level={deadline.priority} />
        <DeadlineCard.Date date={deadline.deadlineDate} />
      </DeadlineCard.Content>
    </Card>
  )
}

// Subcomponentes para melhor composição
DeadlineCard.Header = function DeadlineCardHeader({ children }: { children: React.ReactNode }) {
  return <CardHeader className="flex flex-row items-center justify-between">{children}</CardHeader>
}
```

## 🪝 Custom Hooks

### 1. Hooks de Data Fetching

```typescript
// ✅ Hook bem estruturado com tratamento de erro
'use client'

import { useConvexMutation } from '@convex-dev/react-query'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '../../../convex/_generated/api'

type CreateDeadlineArgs = {
  title: string
  type: DeadlineType
  priorityLevel?: PriorityLevelType
  assignedTo?: string
  infos?: string
}

export function useCreateDeadline() {
  const queryClient = useQueryClient()

  const mutation = useMutation({
    mutationFn: useConvexMutation(api.deadlines.create),
    onSuccess: () => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({ queryKey: ['deadlines'] })
    },
    onError: (error) => {
      console.error('Failed to create deadline:', error)
      // Aqui você pode adicionar toast de erro
    },
  })

  return {
    createDeadline: mutation.mutate,
    createDeadlineAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    data: mutation.data,
    reset: mutation.reset,
  }
}
```

### 2. Hooks Utilitários

```typescript
// ✅ Hook simples e focado
import { useState, useEffect } from 'react'

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined)

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    mql.addEventListener('change', onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    
    return () => mql.removeEventListener('change', onChange)
  }, [])

  return !!isMobile
}
```

## 📝 TypeScript e Tipagem

### 1. Definição de Tipos

```typescript
// ✅ Tipos bem definidos e reutilizáveis
import type { DEADLINE_TYPES, PRIORITY_LEVELS } from '@/constants'

export type DeadlineType = (typeof DEADLINE_TYPES)[number]
export type PriorityLevelType = (typeof PRIORITY_LEVELS)[number]

export interface Deadline {
  id: string
  title: string
  type: DeadlineType
  deadlineDate: string // ISO format
  priorityLevel: PriorityLevelType
  isExpired: boolean
  isExtendable: boolean
  completionStatus: 'pending' | 'done' | 'missed'
  assignedTo?: string
  infos?: string
  createdAt: string
  updatedAt: string
}

// Tipos derivados para diferentes contextos
export type CreateDeadlineInput = Omit<Deadline, 'id' | 'createdAt' | 'updatedAt' | 'isExpired'>
export type UpdateDeadlineInput = Partial<CreateDeadlineInput> & { id: string }
```

### 2. Constantes Tipadas

```typescript
// ✅ Constantes como fonte de verdade para tipos
export const DEADLINE_TYPES = [
  'Contestação',
  'Audiência de Conciliação', 
  'Recurso',
  'Petição Inicial',
  'Alegações Finais',
  'Embargos de Declaração',
  'Apelação',
  'Contra-razões',
] as const

export const PRIORITY_LEVELS = ['high', 'medium', 'low'] as const

export const COMPLETION_STATUS = ['pending', 'done', 'missed'] as const
```

## 🎨 Styling e CSS

### 1. Tailwind CSS com CVA

```typescript
// ✅ Utilitário para merge de classes
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
```

### 2. Padrões de Styling

```typescript
// ✅ Use variantes consistentes
const cardVariants = cva(
  "rounded-lg border bg-card text-card-foreground shadow-sm",
  {
    variants: {
      variant: {
        default: "border-border",
        destructive: "border-destructive/50 bg-destructive/5",
        success: "border-green-500/50 bg-green-500/5",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

## ⚡ Performance

### 1. Lazy Loading e Code Splitting

```typescript
// ✅ Lazy loading de componentes pesados
import { lazy, Suspense } from 'react'
import { Skeleton } from '@/components/ui/skeleton'

const DeadlineChart = lazy(() => import('@/components/deadline-chart'))
const DeadlineTable = lazy(() => import('@/components/deadline-table'))

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<Skeleton className="h-[400px] w-full" />}>
        <DeadlineChart />
      </Suspense>
      
      <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
        <DeadlineTable />
      </Suspense>
    </div>
  )
}
```

### 2. Memoização Estratégica

```typescript
// ✅ Memoização de componentes custosos
import { memo, useMemo } from 'react'

interface DeadlineListProps {
  deadlines: Deadline[]
  filter: string
  sortBy: 'date' | 'priority'
}

export const DeadlineList = memo(function DeadlineList({ 
  deadlines, 
  filter, 
  sortBy 
}: DeadlineListProps) {
  const filteredAndSortedDeadlines = useMemo(() => {
    return deadlines
      .filter(deadline => 
        deadline.title.toLowerCase().includes(filter.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'date') {
          return new Date(a.deadlineDate).getTime() - new Date(b.deadlineDate).getTime()
        }
        return priorityWeight[a.priorityLevel] - priorityWeight[b.priorityLevel]
      })
  }, [deadlines, filter, sortBy])

  return (
    <div className="space-y-4">
      {filteredAndSortedDeadlines.map(deadline => (
        <DeadlineCard key={deadline.id} deadline={deadline} />
      ))}
    </div>
  )
})
```

### 3. Otimização de Imagens

```typescript
// ✅ Use Next.js Image para otimização automática
import Image from 'next/image'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface UserAvatarProps {
  src?: string
  name: string
  size?: number
}

export function UserAvatar({ src, name, size = 40 }: UserAvatarProps) {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <Avatar className={`h-${size/4} w-${size/4}`}>
      {src ? (
        <Image
          src={src}
          alt={name}
          width={size}
          height={size}
          className="rounded-full"
          priority={size > 64} // Priority para avatares grandes
        />
      ) : (
        <AvatarFallback>{initials}</AvatarFallback>
      )}
    </Avatar>
  )
}
```

## 🔧 Configuração e Setup

### 1. Next.js Configuration

```typescript
// ✅ Configuração otimizada
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Otimizações de performance
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },
  
  // Configuração de imagens
  images: {
    domains: ['images.clerk.dev'], // Domínios permitidos
    formats: ['image/webp', 'image/avif'], // Formatos modernos
  },
  
  // Headers de segurança
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}

export default nextConfig
```

### 2. TypeScript Configuration

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": {
      "@/*": ["./src/*"]
    },
    // Configurações adicionais para melhor DX
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 🧪 Testing e Quality

### 1. Estrutura de Testes

```typescript
// ✅ Testes focados em comportamento
import { render, screen } from '@testing-library/react'
import { PriorityLabel } from '../priority-label'

describe('PriorityLabel', () => {
  it('should render high priority with red badge', () => {
    render(<PriorityLabel level="high" />)
    
    expect(screen.getByText('Alta')).toBeInTheDocument()
    expect(screen.getByTestId('badge')).toHaveClass('bg-red-500')
  })

  it('should not render when level is null', () => {
    const { container } = render(<PriorityLabel level={null} />)
    expect(container.firstChild).toBeNull()
  })
})
```

### 2. Linting e Formatting

```json
{
  "extends": ["@tc96/biome-config"],
  "linter": {
    "rules": {
      "complexity": {
        "noExcessiveCognitiveComplexity": "error"
      },
      "style": {
        "useConsistentArrayType": "error",
        "useShorthandFunctionType": "error"
      }
    }
  }
}
```

## 📚 Padrões de Clean Code

### 1. Nomenclatura

```typescript
// ✅ Nomes descritivos e intencionais
const isDeadlineExpired = (deadline: Deadline): boolean => {
  return new Date(deadline.deadlineDate) < new Date()
}

const calculateRemainingDays = (deadlineDate: string): number => {
  const deadline = new Date(deadlineDate)
  const today = new Date()
  const diffTime = deadline.getTime() - today.getTime()
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
}

// ❌ Evite nomes genéricos
// const check = (d: any) => { ... }
// const calc = (date: string) => { ... }
```

### 2. Funções Pequenas e Focadas

```typescript
// ✅ Funções pequenas com responsabilidade única
export const formatDeadlineDate = (date: string): string => {
  return dayjs(date).format('DD/MM/YYYY HH:mm')
}

export const getDeadlineUrgency = (deadline: Deadline): 'urgent' | 'warning' | 'normal' => {
  const remainingDays = calculateRemainingDays(deadline.deadlineDate)
  
  if (remainingDays <= 1) return 'urgent'
  if (remainingDays <= 7) return 'warning'
  return 'normal'
}

export const groupDeadlinesByStatus = (deadlines: Deadline[]) => {
  return deadlines.reduce((acc, deadline) => {
    const status = deadline.completionStatus
    acc[status] = acc[status] || []
    acc[status].push(deadline)
    return acc
  }, {} as Record<string, Deadline[]>)
}
```

### 3. Evitar Comentários Desnecessários

```typescript
// ✅ Código auto-explicativo
const isHighPriorityAndExpired = (deadline: Deadline): boolean => {
  return deadline.priorityLevel === 'high' && isDeadlineExpired(deadline)
}

// ❌ Comentário desnecessário
// Verifica se o prazo é de alta prioridade e está vencido
// const check = (deadline: Deadline): boolean => {
//   return deadline.priorityLevel === 'high' && isDeadlineExpired(deadline)
// }
```

## 🔒 Segurança e Boas Práticas

### 1. Validação de Dados

```typescript
// ✅ Validação com Zod
import { z } from 'zod'
import { DEADLINE_TYPES, PRIORITY_LEVELS } from '@/constants'

export const createDeadlineSchema = z.object({
  title: z.string().min(1, 'Título é obrigatório').max(100, 'Título muito longo'),
  type: z.enum(DEADLINE_TYPES),
  priorityLevel: z.enum(PRIORITY_LEVELS).optional(),
  deadlineDate: z.string().datetime('Data inválida'),
  assignedTo: z.string().optional(),
  infos: z.string().max(500, 'Informações muito longas').optional(),
})

export type CreateDeadlineInput = z.infer<typeof createDeadlineSchema>
```

### 2. Tratamento de Erros

```typescript
// ✅ Tratamento robusto de erros
export function DeadlineForm() {
  const { createDeadline, isPending, error } = useCreateDeadline()
  
  const handleSubmit = async (data: CreateDeadlineInput) => {
    try {
      await createDeadline(data)
      toast.success('Prazo criado com sucesso!')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      } else {
        toast.error('Erro inesperado ao criar prazo')
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error.message}</AlertDescription>
        </Alert>
      )}
    </form>
  )
}
```

## 📱 Responsividade e Acessibilidade

### 1. Design Responsivo

```typescript
// ✅ Grid responsivo com Tailwind
export function DeadlineGrid({ deadlines }: { deadlines: Deadline[] }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {deadlines.map(deadline => (
        <DeadlineCard key={deadline.id} deadline={deadline} />
      ))}
    </div>
  )
}
```

### 2. Acessibilidade

```typescript
// ✅ Componente acessível
export function DeadlineActions({ deadline }: { deadline: Deadline }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          aria-label={`Ações para ${deadline.title}`}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => onEdit(deadline.id)}>
          <Edit className="mr-2 h-4 w-4" />
          Editar
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onDelete(deadline.id)}
          className="text-destructive focus:text-destructive"
        >
          <Trash className="mr-2 h-4 w-4" />
          Excluir
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
```

## 🚀 Deploy e Monitoramento

### 1. Configuração de Build

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "biome check --write",
    "lint:ci": "biome ci",
    "type-check": "tsc --noEmit",
    "build:analyze": "ANALYZE=true next build"
  }
}
```

### 2. Monitoramento de Performance

```typescript
// ✅ Web Vitals tracking
export function reportWebVitals(metric: any) {
  if (process.env.NODE_ENV === 'production') {
    // Enviar métricas para serviço de monitoramento
    console.log(metric)
  }
}
```

## 📋 Checklist de Qualidade

### Antes de cada PR:

- [ ] **Código**: Segue os padrões estabelecidos
- [ ] **TypeScript**: Sem erros de tipo
- [ ] **Linting**: Passa no Biome sem erros
- [ ] **Testes**: Componentes testados
- [ ] **Performance**: Sem re-renders desnecessários
- [ ] **Acessibilidade**: ARIA labels quando necessário
- [ ] **Responsividade**: Funciona em diferentes tamanhos
- [ ] **Documentação**: README atualizado se necessário

### Antes do deploy:

- [ ] **Build**: Compila sem erros
- [ ] **Bundle**: Tamanho otimizado
- [ ] **SEO**: Meta tags configuradas
- [ ] **Performance**: Core Web Vitals dentro dos limites
- [ ] **Segurança**: Headers de segurança configurados

---

**Este documento deve ser revisado e atualizado regularmente conforme o projeto evolui e novas práticas são adotadas pela equipe.**