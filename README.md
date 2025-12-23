#  Gerenciamento de Posts – Angular

Aplicação desenvolvida em **Angular** que consome uma API pública para  gerenciamento de Posts e Comentários.

---

##  Objetivo do Projeto

Demonstrar domínio dos principais conceitos do Angular, incluindo:
- Arquitetura de aplicação
- Consumo de API REST
- CRUD completo
- Uso adequado de Services e RxJS
- Paginação, busca e modais
- Tratamento de estados de carregamento e erro

## Requisitos Implementados
-  Consumo da API pública: https://jsonplaceholder.typicode.com/posts
-  CRUD de Posts (Criar, Listar, Editar, Excluir)
-  Modal para criação e edição de Posts
-  Confirmação antes da exclusão
-  Busca por título e conteúdo
-  Paginação da listagem de Posts
-  Cache local em memória
-  Tratamento de loading e estados vazios
-  Estilização com Tailwind CSS
-  Código tipado e organizado
-  Separação de responsabilidades (Component x Service)

-  ## Arquitetura Escolhida
  
A aplicação segue uma arquitetura baseada em responsabilidades:
- **Components**  
  Responsáveis pela lógica de interface e interação com o usuário.
- **Services**  
  Centralizam o acesso à API e a lógica de dados (CRUD), evitando duplicação de código.

  ## Decisões Técnicas
  
- **API JSONPlaceholder**
  - Não persiste dados.
  - Foi utilizado cache local em memória para simular comportamento real de CRUD.
- **Paginação no frontend**
  - A API não oferece paginação real.
  - Implementação feita via controle local dos arrays.
- **RxJS de forma objetiva**
  - Uso de subscribe apenas quando necessário.
  - Mantido simples para atender o escopo do desafio.
As decisões priorizam clareza, simplicidade e entrega funcional.

## Como Rodar o Projeto
### Pré-requisitos
- Node.js (LTS)
- Angular CLI
### Passos

```bash
# Clonar o repositório
git clone <url-do-repositorio>

# Entrar na pasta do projeto
cd nome-do-projeto

# Instalar dependências
npm install

# Rodar a aplicação
ng serve

# Acesse no navegador:
http://localhost:4200
```
## Como Testar

- Visualizar a listagem inicial de posts
- Utilizar o campo de busca por título ou conteúdo
- Navegar entre páginas
- Editar um post existente
- Excluir um post com confirmação
- Validar atualização imediata da interface
