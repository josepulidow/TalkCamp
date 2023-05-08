const nav = document.querySelector('.nav');
const open = document.querySelector('.open-menu');
const close = document.querySelector('.close-menu');
const name = document.querySelector('#name');
const ul = document.querySelector('.comment');
const addBtn = document.querySelector('.send');
const empty = document.querySelector('.empty');
const comment = document.querySelector('#message');

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
        li.className = 'comments'

        ul.appendChild(li);
        li.appendChild(h4);
        li.appendChild(p);
        li.appendChild(deleteBtn());

        name.value = '';
        comment.value = '';
        empty.style.display = 'none';
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