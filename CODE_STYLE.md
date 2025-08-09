# Guia de Estilo de Código - Challenge App Backend

Este documento define as regras e convenções de estilo de código para o projeto Challenge App Backend.

## Configuração do Ambiente

### Extensões Recomendadas
- ESLint
- Prettier - Code formatter
- TypeScript and JavaScript Language Features

### Scripts Disponíveis

```bash
# Verificar problemas de linting
npm run lint:check

# Corrigir problemas de linting automaticamente
npm run lint:fix

# Verificar formatação de código
npm run format:check

# Formatar código automaticamente
npm run format

# Verificar e corrigir tudo
npm run code:check  # apenas verificar
npm run code:fix    # verificar e corrigir
```

## Regras de Estilo

### TypeScript
- Use `const` sempre que possível, evite `var`
- Prefira arrow functions para callbacks
- Use template literals ao invés de concatenação de strings
- Evite `any`, seja específico com os tipos
- Use async/await ao invés de Promises diretas quando apropriado

### Formatação
- Indentação: 2 espaços
- Aspas simples para strings
- Vírgula final obrigatória em objetos/arrays multilinhas
- Ponto e vírgula obrigatório
- Largura máxima da linha: 80 caracteres

### NestJS Específico
- Controllers devem ser assíncronos apenas quando necessário
- Use DTOs para validação de entrada
- Organize imports: bibliotecas externas primeiro, depois locais
- Use decorators apropriados (@Injectable, @Controller, etc.)

### Nomenclatura
- Classes: PascalCase (ex: `UserService`)
- Métodos/variáveis: camelCase (ex: `findUserById`)
- Constantes: UPPER_SNAKE_CASE (ex: `MAX_RETRY_ATTEMPTS`)
- Arquivos: kebab-case (ex: `user-service.ts`)

### Estrutura de Arquivos
```
src/
  ├── auth/
  │   ├── auth.controller.ts
  │   ├── auth.service.ts
  │   ├── auth.module.ts
  │   └── dto/
  ├── user/
  └── challenge/
```

## Git Hooks

O projeto está configurado com Husky para executar verificações antes dos commits:
- Lint check é executado automaticamente antes de cada commit
- Se houver erros, o commit será bloqueado

## Problemas Comuns

### Métodos async sem await
```typescript
// ❌ Errado
async findAll() {
  return this.repository.find();
}

// ✅ Correto
findAll() {
  return this.repository.find();
}

// ou se realmente precisar de async
async findAll() {
  return await this.repository.find();
}
```

### Variáveis não utilizadas
```typescript
// ❌ Errado
const { password, ...user } = userData;
return user;

// ✅ Correto
const { password: _password, ...user } = userData;
return user;
```

### Promises não aguardadas
```typescript
// ❌ Errado
app.listen(3000);

// ✅ Correto
await app.listen(3000);
```

## Configuração do Editor

O arquivo `.vscode/settings.json` já está configurado para:
- Formatar código ao salvar
- Corrigir problemas de ESLint automaticamente
- Organizar imports
- Configurações específicas do TypeScript
