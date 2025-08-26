# Documentação dos Tipos de Processo

Este documento explica como usar as interfaces e DTOs criados para o módulo de processos.

## Tipos Disponíveis

### 1. `Process`
Type alias para o documento do Convex. Representa os dados como são armazenados no banco de dados.

```typescript
export type Process = Doc<'processes'>
```

**Estrutura:**
- `_id`: ID único do processo
- `_creationTime`: Timestamp de criação
- `case_number`: Número do processo
- `tribunal_name?`: Nome do tribunal (opcional)
- `area`: Área do direito
- `parties`: Partes envolvidas (autor, réu, advogados)
- `status`: Status atual do processo

### 2. `ProcessInput`
Interface para entrada de dados ao criar ou editar processos.

```typescript
interface ProcessInput {
  case_number: string
  tribunal_name?: string
  area: string
  parties: {
    defendant: {
      name: string
      type: ProcessPartyType
      document?: string
    }
    plaintiff: {
      name: string
      type: ProcessPartyType
      document?: string
    }
    lawyers?: {
      defendant?: string[]
      plaintiff?: string[]
    }
  }
  status: string
}
```

### 3. `ProcessTableData`
DTO para exibição na tabela. Mapeia os campos do banco para os campos esperados pelas colunas.

```typescript
interface ProcessTableData {
  _id: Id<'processes'>
  _creationTime: number
  register: string // mapeado de case_number
  client: string // mapeado de parties.plaintiff.name
  adverse: string | null // mapeado de parties.defendant.name
  status: string
  originalData: Process // dados originais completos
}
```

## Função de Mapeamento

### `mapProcessToTableData(process: Process): ProcessTableData`
Converte um documento `Process` do Convex para o formato esperado pela tabela.

```typescript
const tableData = processes.map(mapProcessToTableData)
```

## Exemplo de Uso

### No Data Table
```typescript
export function DataTable({ columns }: DataTableProps) {
  const { processes } = useQueryProcesses() // retorna Process[]
  
  // Mapeia para o formato da tabela
  const tableData: ProcessTableData[] = processes.map(mapProcessToTableData)
  
  return (
    <DataTableWrapper
      columns={columns}
      data={tableData}
      // ... outras props
    />
  )
}
```

### Nas Colunas
```typescript
export const columns: ColumnDef<ProcessTableData>[] = [
  {
    accessorKey: 'register', // usa o campo mapeado
    header: 'Número do Processo',
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('register')}</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const process = row.original
      return (
        <EditProcessDialog
          process={process.originalData} // usa os dados originais completos
          // ...
        />
      )
    },
  },
]
```

## Benefícios

1. **Separação de Responsabilidades**: 
   - `Process`: Representa dados do banco
   - `ProcessInput`: Validação de entrada
   - `ProcessTableData`: Otimização para exibição

2. **Type Safety**: 
   - TypeScript garante que os tipos estejam corretos
   - Intellisense funciona perfeitamente

3. **Flexibilidade**: 
   - Facilita mudanças na estrutura da tabela
   - Mantém acesso aos dados originais quando necessário

4. **Manutenibilidade**: 
   - Código mais limpo e organizados
   - Fácil de entender e modificar
