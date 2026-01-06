# 📝 Task Manager API + Frontend

Projeto completo de **gerenciamento de tarefas** com backend em **Django
REST Framework** e frontend separado utilizando **HTML + jQuery +
AJAX**.

Este projeto demonstra na prática como integrar um frontend independente
com uma API REST real.

------------------------------------------------------------------------

## 🚀 Funcionalidades

-   Criar tarefas
-   Listar tarefas
-   Editar título (edição inline)
-   Atualizar status (PATCH)
-   Excluir tarefas
-   Carregar choices direto do backend
-   Integração Frontend ↔ Backend via AJAX
-   Tratamento de CORS

------------------------------------------------------------------------

## 🛠 Tecnologias

### Backend

-   Python 3.12
-   Django 6
-   Django REST Framework
-   SQLite

### Frontend

-   HTML5
-   CSS3
-   JavaScript
-   jQuery
-   AJAX

------------------------------------------------------------------------

## 📂 Estrutura do Projeto

    Tarefas/
    │
    ├── back/                # Backend Django
    │   ├── core/
    │   ├── api/
    │   └── manage.py
    │
    ├── front/               # Frontend separado
    │   ├── index.html
    │   ├── app.js
    │   └── style.css
    │
    └── README.md

------------------------------------------------------------------------

## ▶️ Como rodar o projeto

### 1️⃣ Backend

``` bash
cd back
py -3.12 -m venv env
env\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

API disponível em:

    http://127.0.0.1:8000

------------------------------------------------------------------------

### 2️⃣ Frontend

Abra o arquivo:

    front/index.html

ou utilize um servidor local:

``` bash
npx serve
```

------------------------------------------------------------------------

## 🔗 Endpoints

  Método   Rota                     Descrição
  -------- ------------------------ -------------------
  GET      /tasks/                  Listar tarefas
  POST     /tasks/                  Criar tarefa
  PATCH    /tasks/{id}/             Atualizar tarefa
  DELETE   /tasks/{id}/             Excluir tarefa
  GET      /tasks/status-choices/   Choices do status

------------------------------------------------------------------------

## 📸 Demonstração

-   CRUD completo
-   Edição inline
-   Atualização sem recarregar página
-   Comunicação direta com API REST

------------------------------------------------------------------------

## 💼 Por que esse projeto importa?

Este projeto demonstra:

-   Integração real Frontend + Backend
-   Consumo de API REST
-   Arquitetura desacoplada
-   Boas práticas de versionamento
-   Organização de código

------------------------------------------------------------------------

## 👤 Autor

**Davi Galdino**\
Desenvolvedor em formação 🚀

------------------------------------------------------------------------

## ⭐ Contribuições

Sinta-se à vontade para abrir issues ou pull requests.
