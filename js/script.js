// Declaramos variables
const nav = document.querySelector('.nav');
const open = document.querySelector('.open-menu');
const close = document.querySelector('.close-menu');
const name = document.querySelector('#name');
const ul = document.querySelector('.comment');
const addBtn = document.querySelector('.send');
const empty = document.querySelector('.empty');
const comment = document.querySelector('#message');

// Se le agrega funcionalidad al boton de menu para que se oculte o se haga visible al hacer clic
open.addEventListener('click', () => {
    nav.classList.add('visible');
});

close.addEventListener('click', () => {
    nav.classList.remove('visible');
});

addBtn.addEventListener('click', (e) => {
    e.preventDefault();

    const text = name.value;
    const message = comment.value;

    if (text && message !== '') {
        const li = document.createElement('li');
        const h4 = document.createElement('h4');
        const p = document.createElement('p');
        h4.textContent = text;
        p.textContent = message;
        li.className = 'comments';

        ul.appendChild(li);
        li.appendChild(h4);
        li.appendChild(p);
        li.appendChild(deleteBtn());
        li.appendChild(editBtn({name: text, message: message}, h4, p));

        name.value = '';
        comment.value = '';
        empty.style.display = 'none';

        // Creamos un objeto con la información del comentario
        const newComment = {
            name: text,
            message: message
        };

        // Convertimos el objeto a JSON y lo guardamos en localStorage
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        comments.push(newComment);
        localStorage.setItem('comments', JSON.stringify(comments));
    }
});

function deleteBtn() {
    const deleteBtn = document.createElement('button');

    deleteBtn.textContent = 'X';
    deleteBtn.className = 'btn-delete';

    deleteBtn.addEventListener('click', (e) => {
        const removeComment = e.target.parentElement;
        ul.removeChild(removeComment);

        const noComent = document.querySelectorAll('.comments');
        if (noComent.length == 0) {
            empty.style.display = 'block';
        }
    });
    return deleteBtn;
}

function editBtn(comment, h4, p) {
    const editBtn = document.createElement('button');

    editBtn.textContent = 'Edit';
    editBtn.className = 'btn-edit';

    editBtn.addEventListener('click', () => {
        // Al hacer click en Edit, mostramos un prompt que permite editar el nombre y mensaje
        const newName = prompt('Edit name:', comment.name);
        const newMessage = prompt('Edit message:', comment.message);

        if (newName !== null && newName !==  undefined) {
            comment.name = newName;
            h4.textContent = comment.name;
        }

        if (newMessage !== null && newMessage !==  undefined) {
            comment.message = newMessage;
            p.textContent = comment.message;
        }

        localStorage.setItem('comments', JSON.stringify(comment));
    });

    return editBtn;
}
