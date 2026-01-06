const API_BASE = "http://127.0.0.1:8000";

// ===== STATUS CHOICES =====
function loadStatusChoices() {
    return $.ajax({
        url: API_BASE + "/tasks/status-choices/",
        method: "GET",
        success: function(data) {
            const select = $("#status");
            select.empty();

            data.forEach(item => {
                select.append(
                    `<option value="${item.value}">${item.label}</option>`
                );
            });
        }
    });
}

// ===== LIST TASKS =====
function getListTasks() {
    return $.ajax({
        url: API_BASE + "/tasks/",
        method: "GET",
        success: function(data) {
            const taskList = $("#taskList");
            taskList.empty();

            if (data.length === 0) {
                taskList.append("<li>Nenhuma task encontrada</li>");
                return;
            }

            data.forEach(task => {
                taskList.append(`
                    <li>
                        <span class="task-title" data-id="${task.id}">${task.title}</span> - ${task.status}
                        <button class="btn-edit" data-id="${task.id}">
                            Editar
                        </button>
                        <button class="btn-finish" data-id="${task.id}">
                            Concluir
                        </button>
                        <button class="btn-delete" data-id="${task.id}">
                            Deletar
                        </button>
                        
                    </li>
                `);
            });
        }
    });
}



// ===== CREATE TASK =====
function createTask() {
    const data = {
        title: $("#title").val(),
        description: $("#description").val(),
        status: $("#status").val()
    };

    $.ajax({
        url: API_BASE + "/tasks/",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function () {
            alert("Task criada");
            getListTasks();
        }
    });
}

// ===== PATCH TASK =====
function updateTask(taskId, data) {
    return $.ajax({
        url: API_BASE + `/tasks/${taskId}/`,
        method: "PATCH",
        contentType: "application/json",
        data: JSON.stringify(data),
        success: function () {
            getListTasks();
        }
    });
}

function deleteTask(taskId) {
    return $.ajax({
        url: API_BASE + `/tasks/${taskId}/`,
        method: "DELETE",
        success: function () {
            getListTasks();
        },
        error: function () {
            alert("Erro ao deletar task");
        }
    });
}

// ===== EVENTS =====
$(function () {
    loadStatusChoices();

    $("#loadTasks").on("click", getListTasks);
    $("#createTask").on("click", createTask);

    $(document).on("click", ".btn-finish", function () {
        const taskId = $(this).data("id");
        updateTask(taskId, { status: "done" });
    });

    // transformar em input
    $(document).on("click", ".btn-edit", function () {
        const taskId = $(this).data("id");

        const li = $(this).closest("li");
        const span = li.find(".task-title");   // agora é o ELEMENTO
        const currentTitle = span.text();      // texto real
        const button = $(this);

        const input = $(`
            <input
                type="text"
                class="edit-title"
                data-id="${taskId}"
                value="${currentTitle}"
            />
        `);

        const botao_salvar = $(`
            <button data-id="${taskId}" class="btn-save">Salvar</button>
        `);

        button.replaceWith(botao_salvar);
        
        span.replaceWith(input);
        input.focus();
    });

    $(document).on("click", ".btn-save", function() {
        const taskId = $(this).data("id");

    const li = $(this).closest("li");
    const input = li.find(".edit-title");

    const newTitle = input.val();

    if (!newTitle.trim()) {
        alert("O título não pode ficar vazio");
        return;
    }

    // 🔥 PATCH
    updateTask(taskId, { title: newTitle });
    })


    $(document).on("click", ".btn-delete", function () {
        const taskId = $(this).data("id");

        const confirmDelete = confirm("Tem certeza que deseja excluir?");
        if (!confirmDelete) return;

        deleteTask(taskId);
    });

});
