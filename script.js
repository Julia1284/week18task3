let array = []; // создаем массив, куда будут складываться имена и аватарки

document.querySelector('.button').onclick = () => {
    // Получаем данные из формы
    let name = document.querySelector('.card_name').value;
    let avatar = document.querySelector('.card_avatar').src;
    let message = document.querySelector('#message').value;
    message = message.replace(/viagra|xxx/gi, '***'); //проверка сообщения

    // Добавляем имя, аватар и сообщение на страницу
        let newComment = createComment(name, avatar, message) //  выполняется функция по созданию комментария

        //Получаем контейнер для коммментария и добавляем в него новый комментарий
        let commentContainer = document.querySelector('.container');
        commentContainer.appendChild(newComment);

        // Заполняем массив именем и аватаркой  и доавлем его в Local Storage
        addElementToArrayLocalStorage(name, avatar);//выполняем функцию, которая это делает

        //Очищаем поле комментария
        document.querySelector('#message').value = '';
    }


//Добавление аватарки

document.querySelector('#avatar').addEventListener('change', (e) => {
    const file = e.target.files[0]; //Через <input> можно выбрать несколько файлов, поэтому input.files – псевдомассив выбранных файлов. Здесь у нас только один файл, поэтому мы просто берём input.files[0].
    const reader = new FileReader(); //FileReader объект, цель которого читать данные из file
    
    reader.readAsDataURL(file); //считать данные как base64-кодированный URL(специальный метод кодирования информации в 64-разрядный код)

    reader.onload = () => {
            const avatar = reader.result; //результат чтения, если оно успешно
            document.querySelector('.card_avatar').src = avatar;
        };
})

// Функция создания нового комментария
const createComment = function (name, avatar, message) {
    let comment = document.createElement('div');// создаем контейнер для комментария
    comment.classList.add ('comment_container')
    let comment_name = document.createElement('span'); //создаем контейнер для имени, и кладем в него имя
    comment_name.classList.add ('comment_name');
    comment_name.innerHTML = name;

    let comment_avatar = document.createElement('img'); //создаем контейнер для аватара, и кладем в него аватар
    comment_avatar.classList.add ('comment_image');
    comment_avatar.src = avatar

    let comment_message = document.createElement('span');
    comment_message.classList.add ('comment_message');
    comment_message.innerHTML = message + '<hr>'; //создаем контейнер для сообщения, и кладем в него сообщение
    // Собираем комментарий
    comment.appendChild(comment_avatar);
    comment.appendChild(comment_name);
    comment.appendChild(comment_message);

    return comment;
}
// функция, которая проверяет, есть ли в хранилище данные с такими значениями

const getElementFromLocalStorage = () => {
    let array1 = JSON.parse(localStorage.getItem ('contacts'))// получаем из Local Storage элемент с ключом "contacts". Так как данные в хранилище хранятся как строки, то мы их переводим обратно в массив.
    if (array1){
        array = array1;
    }// если array1 уже существует, то array  присваиваем array1
}

//функция, которая добавлет элементы имени и аватарки в массив, и выполняет функцию добавления его в Local Storage
const addElementToArrayLocalStorage = (name, avatar) => {
    array.push ([name, avatar]);
    setElementsToLocalStorage();
    console.log( array)
}

//функция, которая добавляет массив в local Storage

const setElementsToLocalStorage =  () => {
    localStorage.setItem ('contacts', JSON.stringify (array));
}

//Нужно получить данные при загрузке страницы
document.addEventListener ('DOMContentLoaded', function (){
    getElementFromLocalStorage()//получаем данные из хранилища и добавляем их в значения input
    for (i=0; i<array.length; i++){
        document.querySelector('.card_name').value = array[i][0];
        document.querySelector('.card_avatar').src = array[i][1];
    }
})

// localStorage.clear()