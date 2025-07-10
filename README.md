# 📇 Agenda de Contatos

Projeto completo de uma **API RESTful em PHP puro** com **MySQL** para gerenciar uma agenda de contatos, acompanhado de uma interface web moderna com **HTML + Bootstrap 5 + JavaScript ESModules**.

---


## Link do projeto em produção:

👉 **[Front-end](https://github.com/msilvalucas/agenda-de-contatos-backend)**

---

## 🚀 Funcionalidades

- ✅ Listar contatos
- ✅ Buscar contato por ID
- ✅ Criar novo contato
- ✅ Editar contato existente
- ✅ Excluir contato
- ✅ Validação de dados (front e back-end)
- ✅ Máscara de telefone com jQuery Mask

---

## 🛠️ Tecnologias Utilizadas

- **Frontend**: HTML, Bootstrap 5, JavaScript (ESModules), jQuery
- **Backend**: PHP 8+, MySQL
- **Libs**: jQuery Mask
- **Deploy**: GitHub Pages (Frontend) + Render (API PHP)

---

## 📘 Estrutura do Contato

Cada contato possui os seguintes campos:

| Campo     | Tipo    | Regras                              |
|-----------|---------|-------------------------------------|
| `id`      | int     | Auto-incremento                     |
| `nome`    | string  | Obrigatório                         |
| `telefone`| string  | Obrigatório, 10 ou 11 dígitos       |
| `cidade`  | string  | Obrigatório                         |
| `estado`  | string  | Obrigatório, sigla como "SP", "RS" |
| `email`   | string  | Obrigatório, formato de e-mail      |
| `categoria`| enum   | "Aluno", "Responsável", "Professor", "Funcionário", "Gestor" |

---

## 🔗 Repositório da API (Back-end)

Para seguir boas práticas de separação de responsabilidades, o projeto da API foi criado em um **repositório separado**:

👉 **[agenda-de-contatos-backend](https://github.com/msilvalucas/agenda-de-contatos-backend)**

Esse repositório contém:

- Estrutura MVC com `controllers`, `models`, `validations`
- Conexão com banco de dados via `config/db.php`
- Roteamento RESTful básico
- Validações de entrada
- Dockerfile para deploy no Render
