const modalAddNewNote = document.querySelector('.note-app__modal-add-new-note');
const LIST_NOTE_KEY = "LIST_NOTE";
const listNote = localStorage.getItem(LIST_NOTE_KEY) ? JSON.parse(localStorage.getItem(LIST_NOTE_KEY)) : [];
let editableNoteIndex = -1;
const listNoteRef = new Proxy({
    value: listNote
}, {
    set: function (target, prop, value) {
        target[prop] = value;
        renderList();
        return true;
    },
    get(target, p, receiver) {
        return target[p];
    }
})

function renderList() {
    const listNoteElement = document.querySelector('.note-app__list-note');
    listNoteElement.innerHTML = '';
    Array.from(listNoteRef.value).forEach((note, index) => {
        console.log(note);
        listNoteElement.innerHTML += `
          <li class="note-app__list-note-item">
            <div>
                <div>
                <p class="note-app__list-note-item__title">${note.title}</p>
                <p class="note-app__list-note-item__content">${note.content}</p>
                </div>
         
                <div class="note-app__list-note-item__btn-operation">
                    <button class="note-app__list-note-item__btn-operation-edit" onclick="editNoteItem(${index})">Edit</button>
                    <button class="note-app__list-note-item__btn-operation-delete" onclick="removeNoteItem(${index})">Delete</button>
                </div>
            </div>
        </li>`;
    })
}


renderList();

function showModalAddNewNote() {
    modalAddNewNote.classList.toggle('note-app__modal-add-new-note--show');
}

function hideModalAddNewNote() {
    modalAddNewNote.classList.remove('note-app__modal-add-new-note--show');
}

function saveNote(event) {
    event.preventDefault();
    const title = document.querySelector('.note-app__input-title').value;
    const content = document.querySelector('.note-app__input-content').value;

    if (editableNoteIndex === -1) {
        listNoteRef.value = [
            ...listNoteRef.value,
            {
                title,
                content
            }
        ];
    } else {
        listNoteRef.value[editableNoteIndex] = {
            title,
            content
        }

        listNoteRef.value = [...listNoteRef.value];
    }
    editableNoteIndex = -1;
    localStorage.setItem(LIST_NOTE_KEY, JSON.stringify(listNoteRef.value));
    //reset input
    document.querySelector('.note-app__modal-content-form').reset();
    hideModalAddNewNote();
}

function removeNoteItem(index) {
    listNoteRef.value = listNoteRef.value.filter((note, idx) => idx !== index);
    localStorage.setItem(LIST_NOTE_KEY, JSON.stringify(listNoteRef.value));
}

function editNoteItem(index) {
    showModalAddNewNote();
    const note = listNoteRef.value[index];
    document.querySelector('.note-app__input-title').value = note.title;
    document.querySelector('.note-app__input-content').value = note.content;
    editableNoteIndex = index;
}