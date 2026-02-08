# 🚀 Desenvolvimento Multi-Agent com AI

> **Objetivo**: Workflow multi-agent

---

## 🛠️ Setup Inicial

```bash
# 1. Baixe a pasta .prompts na raiz do projeto contendo os prompts (skills)
# 2. Crie no github um novo projeto. crie um novo repositório.
```

### SonarCloud - config
Adicionar o sonarcloud no github https://sonarcloud.io/login (logar com o github) configurar o SonarCloud via GitHub Actions
Botão + > analyzer new project > Select all on this page (nome do projeto) > Set up > Number of days - 30> create project
Choose your Analysis Method (Adminstration) > With GitHub Actions > Name = SONAR_TOKEN e Value =
Create a GitHub Secret > clicar em  Settings > Secrets and variables > Actions  para se renviado para o github
Dentro do github:
1-Actions secrets and variables > new repository secret > Name = SONAR_TOKEN e Value = > add secret
Vontando para o sonar:
2-Escolher o tipo do projeto> Js/ts > crie.github/workflows/build.yml > crie sonar-project.properties
vontar em Administration / Analysis Method:
1-Desabilitar Automatic Analysis: Tem que criar um pull request para funcionar

## 🤖 Workflow Multi-Agent para Issues Complexas

Configuração:

```bash
# Crie uma branch para a tarefa
git checkout -b feature/issue001
```

### **Fase 1: Planejamento** (Claude Sonnet 4.5/4.6)

- Criar um plano da implementação

Prompt 1: Nova janela de contexto Mode: Plan Sonnet 4.5

```text
Crie um plano de implementação para a criar uma api em node express javascript com a rota get Hello World
Pare após o plano. Aguarde revisão antes de escrever qualquer código.
```

Prompt 2: Mode: Agent Sonnet 4.5

```text
Dentro da pasta plan, escreva este plano na raiz do projeto com o título plan_issue0001 em markdown.
```

**Escolha do modelo:**

- **Sonnet 4.5/4.6**: maioria dos casos (equilíbrio velocidade/qualidade)
- **Opus 4.5/4.6**: issues muito complexas que exigem raciocínio profundo

---

### **Fase 2: Revisão do Plano - Opcional** (GPT-5.2/5.3 Codex) Mode: Agent

- Outra IA revisa o plano

Prompt 1: Nova janela de contexto Mode: Agent

```text
Revise #plan_issue0001.md de forma aprofundada.
Indique o que está sólido, possíveis riscos e oportunidades claras de melhoria.
Seja objetivo, crítico e não escreva código.
```

Prompt 2: Mode: Agent

```text
Por favor, aplique isso e o restante do seu feedback ao arquivo do plano @plan_issue0001.md
Não escreva código.
```

---

### **Fase 3: Segunda Opinião - Opcional** (Claude Opus 4.6/Claude Sonnet 4.5/4.6) Mode: Agent

- revisar o plano **já corrigido**
- Valida arquitetura e decisões técnicas

Prompt 1: Nova janela de contexto Mode: Agent

```text
Fiz alterações no plano #plan_issue0001.md.
Você pode revisar as mudanças que fiz e fornecer feedback?
Validar arquitetura e decisões técnicas
```

Prompt 2: Mode: Agent

```text
Aplique todo o feedback diretamente no plano
#plan_issue0001.md.
Não escreva código.
```

---

### **Fase 4: Implementação - Build** (Composer / Codex / Sonnet 4.6/4.5) Mode: Agent

Escolha conforme a necessidade:

| Modelo          | Quando Usar         | Velocidade | Qualidade  |
| --------------- | ------------------- | ---------- | ---------- |
| **Composer**    | Prototipagem rápida | ⚡ < 90s   | ⭐⭐⭐     |
| **GPT-5 Codex** | Build de produção   | 🐢 Lento   | ⭐⭐⭐⭐⭐ |
| **Sonnet 4.6**  | Equilíbrio          | 🚀 Médio   | ⭐⭐⭐⭐   |

Prompt 1: Nova janela de contexto Mode: Agent

```text
Implemente o plano #plan_issue0001.md.
Vocẽ não deve utilizar comentários no arquivo.
```

---

### **Fase 5: Revisão manual**

- Entender o que foi realizado em relação ao plano
- Revisar o que foi inserido
- Aprovar o código

---

### **Fase 6: Revisão de código com IA** (GPT-5 Codex ou Opus 4.6/4.5)

- git add, Commit
- Análise do código antes do pull request
- Fase 0: Detecção de Bugs: Encontra bugs **antes de rodar o projeto**
- Fase 1: Review Geral: Valida padrões e boas práticas

Prompt 1: Nova janela de contexto Mode: Agent

```text
Acabei de implementar este plano  #plan_issue0001.md.

#find-bugs

Nesta Branch feature/issue001, encontre bugs, vulnerabilidades e problemas de qualidade no branch atual.
Priorize por severidade:
1. Crítico - Bloqueia merge
2. Alto - Deve ser corrigido
3. Médio - Recomendado corrigir
4. Baixo - Sugestão
```

Prompt 1.1: Caso tenha encontrado algo

```text
Atualize o código com base no seu feedback, escolhendo a melhor solução para a questão em aberto.
```

Prompt 2:

```text
#requesting-code-review
Revise o trabalho e forneça seu feedback.
Revise esta Branch feature/issue001 focando em:
- Qualidade do código
- Bugs
- Segurança
- Performance
- Testes
```

Prompt 2.1: Caso tenha encontrado algo

```text
Atualize o código com base no seu feedback, escolhendo a melhor solução para a questão em aberto.
```

🔥 Grande vantagem: menos bugs em dev

### **Fase 6: Pull Request**

- push . Abrir um pull request
- SonarCloud analisa o PR
Criar o pull request para o sonar analisar

- Dev corrige os issues do SonarCloud
- PR sai de Draft → Ready for Review

### **Fase 7: Code Review**

- Code Review (revisão humana por outro programador)

### **Fase 8: Quality Gate**

- Quality Gate aprovado → Merge

---

## 🎯 Modelos Recomendados por Fase

| Fase                 | Modelo Principal | Alternativa     | Quando Usar       |
| -------------------- | ---------------- | --------------- | ----------------- |
| **Planejamento**     | Sonnet 4.6       | Opus 4.6        | Issues complexas  |
| **Revisão do plano** | GPT-5 Codex      | Opus 4.5/4.6    | Validação técnica |
| **Segunda opinião**  | Opus 4.6         | Sonnet 4.6      | Validação final   |
| **Build rápido**     | Composer         | Sonnet 4.6      | Prototipagem      |
| **Build produção**   | GPT-5 Codex      | Opus/Sonnet 4.6 | Código final      |
| **Code Review**      | GPT-5 Codex      | Opus 4.6        | Revisão final     |

---

## 🔍 Workflow de Code Review 

### Fluxo Básico (80% dos casos)

#### **Fase 0: Detecção de Bugs** (opcional, 5 min)

```text
@find-bugs

Encontre bugs, vulnerabilidades e problemas de qualidade no branch atual:
- Branch: [nome do branch]
- Arquivos modificados: [listar ou usar git diff]

Priorize por severidade:
1. Crítico - Bloqueia merge
2. Alto - Deve ser corrigido
3. Médio - Recomendado corrigir
4. Baixo - Sugestão
```

#### **Fase 1: Review Geral** (obrigatório)

```text
@code-reviewer

Revise esta PR focando em:
- Qualidade do código
- Bugs
- Segurança
- Performance
- Testes
```

#### **Fase 2: Checklist Final**

```text
@code-review-checklist
```

---

## 🎯 Skills por Tipo de Mudança

| Tipo de Mudança        | Skills Recomendadas                                        |
| ---------------------- | ---------------------------------------------------------- |
| 🆕 Nova Feature        | `@code-reviewer` + `@architect-review`                     |
| 🐛 Bug Fix             | `@find-bugs` + `@debugger` + `@code-reviewer`              |
| 🔒 Código Sensível     | `@security-auditor` + `@code-reviewer`                     |
| ♻️ Refatoração         | `@code-refactoring-refactor-clean` + `@architect-review`   |
| 📦 Atualização de Deps | `@dependency-upgrade` + `@codebase-cleanup-deps-audit`     |
| 🚀 Migration           | `@framework-migration-code-migrate` + `@legacy-modernizer` |
| 🔍 Buscar Bugs         | `@find-bugs` + `@error-detective`                          |

---

## ✅ Checklist Final de Aprovação

Antes de aprovar, confirme:

- ✔ Código funciona
- ✔ Não quebrou nada
- ✔ Não criou risco de segurança
- ✔ Dá pra manter daqui a 6 meses
- ✔ Testes fazem sentido
- ✔ PR está bem explicada

**Se alguma resposta for "não" → não aprove.**

---

### Issue Complexa (Multi-Agent)

1. **Planejamento** (Sonnet 4.6): importar issue do Jira e criar plano
2. **Revisão** (GPT-5 Codex): validar plano
3. **Segunda opinião** (Opus 4.6): confirmar arquitetura
4. **Build** (Composer/Codex): implementar código
5. **Code Review** (GPT-5 Codex): revisar implementação

---

## 💡 Dicas Práticas

### Para Code Review

- Use `@find-bugs` antes de revisar para detectar problemas automaticamente
- Sempre classifique issues por severidade
- Não aprove se algum item do checklist falhar

### Para Workflow Multi-Agent

- Peça planos **"concise"** para o Claude
- Use Composer para iterar rápido
- Use Codex para builds finais
- Marque arquivos ao trocar de agente
- Use o botão de copiar para passar contexto
- Browser Mode no Cursor: `Ctrl + Shift + P → Cursor Open Browser`
- Opus 4.6: reserve para arquiteturas críticas e code reviews finais

---

## 📊 Quando Usar Cada Modelo Claude

### Sonnet 4.5/4.6

- Issues de complexidade média
- Prototipagem rápida
- Refatorações
- Implementações com padrões estabelecidos

### Opus 4.5/4.6

- Arquiteturas complexas
- Decisões críticas de design
- Otimizações de performance
- Revisões finais de segurança

---

## 🚀 Benefícios

✅ Menos bugs em dev  
✅ Menos testes manuais  
✅ Código mais limpo  
✅ Iteração muito mais rápida  
✅ Cada IA usada no que faz melhor  
✅ Code review de nível sênior consistente

---

## 🧠 Lembre-se

👉 **AI Skills não substituem você.**

Elas:

- Ampliam visão
- Reduzem esquecimento
- Aceleram análise

**A decisão final é sempre sua.**

Fonte: https://github.com/sickn33/antigravity-awesome-skills
