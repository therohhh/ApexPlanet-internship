// FORM VALIDATION

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate() {

    let valid = true;

    const fields = [
        {
            id: "fname",
            err: "fname-err",
            msg: "First name is required"
        },
        {
            id: "lname",
            err: "lname-err",
            msg: "Last name is required"
        }
    ];

    fields.forEach((field) => {

        const input = document.getElementById(field.id);
        const error = document.getElementById(field.err);

        if (input.value.trim() === "") {

            error.innerText = field.msg;
            valid = false;

        } else {

            error.innerText = "";

        }

    });

    // EMAIL VALIDATION

    const email = document.getElementById("email");
    const emailErr = document.getElementById("email-err");

    if (email.value.trim() === "") {

        emailErr.innerText = "Email is required";
        valid = false;

    } else if (!emailRegex.test(email.value)) {

        emailErr.innerText = "Enter valid email";
        valid = false;

    } else {

        emailErr.innerText = "";

    }

    // MESSAGE

    const message = document.getElementById("message");
    const messageErr = document.getElementById("message-err");

    if (message.value.trim().length < 10) {

        messageErr.innerText = "Message must be at least 10 characters";
        valid = false;

    } else {

        messageErr.innerText = "";

    }

    return valid;
}

document
    .getElementById("contact-form")
    .addEventListener("submit", function (e) {

        e.preventDefault();

        if (validate()) {

            alert("Form Submitted Successfully!");

            this.reset();

        }

    });


// TODO LIST

let todos = [];
let nextId = 1;

function addTodo() {

    const input = document.getElementById("todo-input");

    const text = input.value.trim();

    if (text === "") {

        alert("Please enter task");
        return;

    }

    todos.push({
        id: nextId++,
        text: text
    });

    input.value = "";

    renderTodos();
}

function renderTodos() {

    const list = document.getElementById("todo-list");

    list.innerHTML = "";

    todos.forEach((todo) => {

        const li = document.createElement("li");

        li.className = "todo-item";

        li.innerHTML = `
            <span>${todo.text}</span>
            <button class="todo-del" onclick="deleteTodo(${todo.id})">
                Delete
            </button>
        `;

        list.appendChild(li);

    });

    document.getElementById("todo-stats").innerText =
        `${todos.length} Tasks Total`;
}

function deleteTodo(id) {

    todos = todos.filter((todo) => todo.id !== id);

    renderTodos();
}