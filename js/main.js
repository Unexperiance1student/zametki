const noteHeadingTextArea = document.querySelector('.note__heading')
const noteAmount = document.querySelector('.notes__amount')
const noteList = document.querySelector('.notes__list')
const addBtn = document.querySelector('.filters__add')
const noteHideBtn = document.querySelector('.note__img')
const notes = document.querySelector('.notes')
const note = document.querySelector('.note')
const notesPlaceholderDelete = document.querySelector('.notes__delete')
const textareaHead = document.querySelector('.note__heading')
const textareaBody = document.querySelector('.note__text')
const textarea = document.querySelectorAll('#textarea')
const noteDate = document.querySelector('.note__date')
const filters = document.querySelector('.filters')

let tasks = []

// Возвращает сохраненые данные
loadWithLocalStorage()

checkAmountNote()

//Проверяет количество в списке
function checkAmountNote(){
    let noteAmountKol = noteList.childElementCount
    if(noteAmountKol === 0){
        noteAmountKol = noteList.childElementCount
        noteAmount.innerText = `Rоличество заметок: ${noteAmountKol}`
        
        const emptyListHTML = `
        <li id="emptyList" class="list__item empty">
            <div class="list__empty">Список пуст</div>
            <img class= "list__img" src="./img/leaf.svg" alt="">
        </li>`
        noteList.insertAdjacentHTML('afterbegin', emptyListHTML)
    }else{
        const emptyListEl = document.querySelector('#emptyList')
        emptyListEl ? emptyListEl.remove() : null
        noteAmountKol = noteList.childElementCount
        noteAmount.innerText = `Rоличество заметок: ${noteAmountKol}`
    }

}

// Добавление в список
function addNote(){
    const newTask = {
        id: Date.now(),
        head: "Название",
        desc: "Описание",
        dateDayCreat: day,
        dateMonthCreat: month,
        dateChangeCode: 0,
        dateChange: [0,'',0,0,0],
        textHead: '',
        textBody: '',
    }

    tasks.push(newTask)

    const noteInList = `
    <li  id="${newTask.id}" class="list__item" draggable="true">
        <button data-action="del" class="list__delete delbtn">Удалить</button>
        <div class="list__name">${newTask.head}</div>
		<div class="list__descript">${newTask.desc}</div>
		<div class="list__date">Дата создания: ${newTask.dateDayCreat} ${newTask.dateMonthCreat}</div>
	</li>`

    noteList.insertAdjacentHTML('beforeend', noteInList)

    saveToLocalStorage()
    checkAmountNote()
}

//Удаление из списка
function delNote(event){
    if(event.target.dataset.action === 'del'){
        event.preventDefault()
        const parentNode = event.target.closest('.list__item')

        //Определяем ID задачи
        const id = Number(parentNode.id)

        // Фильтруем массив
        tasks = tasks.filter(task => task.id !== id)

        parentNode.remove()

        saveToLocalStorage()
        checkAmountNote()

        textarea.forEach(item=>{
            noteDate.innerText= ''
            item.value = ''
        })
    }
}

// Прячем список
function hideNotesList() {
    notes.classList.toggle('hide')
    if (notes.classList.contains('hide')) {
        note.style.maxWidth = `1800px`
        noteHideBtn.innerHTML = `<svg class="note__img" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" class="oOL5I9FxKWkGQb9Ptl0O"><path fill-rule="evenodd" d="M6 3a3 3 0 00-3 3v11a3 3 0 003 3h11a3 3 0 003-3V6a3 3 0 00-3-3H6zm2.864 6.78H6.546a.625.625 0 100 1.25h3.817c.35 0 .635-.285.635-.636V6.577a.625.625 0 00-1.25 0v2.319L6.833 5.98a.625.625 0 00-.884.883L8.864 9.78zm5.299 3.468h2.318a.625.625 0 100-1.25h-3.817a.635.635 0 00-.635.635v3.817a.625.625 0 101.25 0V14.13l2.915 2.915a.625.625 0 10.884-.884l-2.915-2.914z"></path></svg>`
    } else {
        note.style.maxWidth = `1500px`
        noteHideBtn.innerHTML = `<svg class="note__img" width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M6.031 3a3 3 0 00-3 3v11a3 3 0 003 3h11a3 3 0 003-3V6a3 3 0 00-3-3h-11zm4.47 4.289H8.184l2.915 2.914a.625.625 0 01-.884.884L7.3 8.172v2.319a.625.625 0 11-1.25 0V6.674c0-.351.285-.635.635-.635h3.818a.625.625 0 010 1.25zM12.6 15.76h2.318l-2.915-2.915a.625.625 0 11.884-.884l2.915 2.915V12.56a.625.625 0 011.25 0v3.817c0 .35-.285.635-.635.635H12.6a.625.625 0 110-1.25z"></path></svg>`
    }
}

// Получаем месяц и день
let date = new Date()
let month = getMonthNow(date.getMonth())
let day = date.getDate()
function getMonthNow(date) {
    let month = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    return month[date];
}

// Удаление перетаскиванием
function dragStart(event){
    if(event.target.classList.contains('list__item')){
        event.target.classList.add('hold')
    }
}

function dragEnd(event){
    if(event.target.classList.contains('list__item')){
        if(event.dataTransfer.dropEffect !== 'none'){
            event.target.remove();
            //Определяем ID задачи
            const id = Number(event.target.id)

            // Фильтруем массив
            tasks = tasks.filter(task => task.id !== id)

            saveToLocalStorage()
            checkAmountNote()

        }
        setTimeout(()=>{
            event.target.classList.remove('hold')
        }, 0)
    }
    document.querySelectorAll('.notes__list .list__item').forEach(item => item.classList.remove('hold'));
    textarea.forEach(item=>{
        item.setAttribute("disabled", "disabled");
        noteDate.innerText= ''
        item.value = ''
    })
}

function dragOver(event){
    event.preventDefault()
}

function dragEnter(event){
    event.target.classList.add('hovered')
}

function dragLeave(event){
    event.target.classList.remove('hovered')
}

function dragDrop(event){
    event.target.classList.remove('hovered')
}

// Фокус на выбраной заметке
function focus(event){
    document.querySelectorAll('.notes__list .list__item').forEach(item => item.classList.remove('hold'));
    if(event.target.classList.contains('list__item')){
        const id = Number(event.target.id)
        event.target.classList.add('hold')
        textarea.forEach(item=>{
            item.removeAttribute("disabled");
        })
        tasks.forEach(task =>{
            if(task.id === id){
                noteDate.innerText = task.dateChange[0] === 0 ? null : `Изменено: ${task.dateChange[0]} ${task.dateChange[1]} ${task.dateChange[2]}:${task.dateChange[3]}:${task.dateChange[4]}`
                textareaHead.value = task.textHead
                textareaBody.value = task.textBody
            }
        })
    }else{
        textarea.forEach(item=>{
            item.setAttribute("disabled", "disabled");
            noteDate.innerText= ''
            item.value = ''
        })
    }
    saveToLocalStorage()
}

// Сохранение текста заметки
function saveText(){
    const noteListItem = document.querySelectorAll('.list__item')
    let id = 0
    noteListItem.forEach((e)=>{
        if(e.classList.contains('hold')){
            id = Number(e.id)
            tasks.forEach(task=>{
                if(task.id === id){
                task.desc = textareaBody.value.replace(/\n/g, '')
                task.head = textareaHead.value.replace(/\n/g, '')
                task.textHead = textareaHead.value
                task.textBody = textareaBody.value
                task.dateChangeCode = Date.now();
                }
            })
        }
    })
    saveToLocalStorage()
}


// Ищем текущее время
function searchTime(){
    let date = new Date()
    let time = [0,'',0,0,0]
    let minuts = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    let hours = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    let seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    let day = date.getDate()
    let month = getMonthNow(date.getMonth())
    time = [day,month,hours, minuts, seconds]
    return time
}

// Обновляем время при изменение
function updateTimeChange(){
    setTimeout(()=>{
        const noteListItem = document.querySelectorAll('.list__item')
        let time = searchTime()
        let id = 0
        noteListItem.forEach((e)=>{
            if(e.classList.contains('hold')){
                id = Number(e.id)
                tasks.forEach(task=>{
                    if(task.id === id){
                        task.dateChange = time
                        noteDate.innerText = `Изменено: ${task.dateChange[0]} ${task.dateChange[1]} ${task.dateChange[2]}:${task.dateChange[3]}:${task.dateChange[4]}`
                    }
                })
            }
        })
    },500)
    saveToLocalStorage()
}

//Сохранение названия и описания в листе заметок
function saveNameAndDescr(){
    setTimeout(()=>{
        const noteListItem = document.querySelectorAll('.list__item')
        let id = 0
        noteListItem.forEach((e)=>{
        if(e.classList.contains('hold')){
            id = Number(e.id)
            const listName = e.querySelector('.list__name')
            const listDescr = e.querySelector('.list__descript')
            tasks.forEach(task=>{
                if(task.id === id){
                listName.innerText = task.head != "" ? `${task.head}` : (task.head="Название")
                listDescr.innerText = task.desc != "" ? `${task.desc}` : (task.desc="Описание")
                }
            })
        }
    })
    }, 500)
    saveToLocalStorage()
}

//Переход в основную часть заметок при клике на Enter
function transitionOnKey() {
    let key = window.event.keyCode;

    if (key === 13) {
        textareaBody.focus()
    }
}

// Сохранение в локальное хранилище
function saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(tasks))
}

// Вытаскиваем из локального
function loadWithLocalStorage(){
    if (localStorage.getItem('tasks')) {
        tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach((task) => renderTask(task));
    }
}

// Замена при сортировке
function changeHTML(){
    const noteListItem = document.querySelectorAll('.list__item')
    noteListItem.forEach((item)=>{
        item.remove()
    })
    saveToLocalStorage()
    loadWithLocalStorage()
}

// Формируем разметку
function renderTask(task) {
    const noteInList = `
    <li  id="${task.id}" class="list__item" draggable="true">
        <button data-action="del" class="list__delete delbtn">Удалить</button>
        <div class="list__name">${task.head}</div>
		<div class="list__descript">${task.desc}</div>
		<div class="list__date">Дата создания: ${task.dateDayCreat} ${task.dateMonthCreat}</div>
	</li>`

    noteList.insertAdjacentHTML('beforeend', noteInList)
}

// Сортировка
function filter(event){
    if(event.target.classList.contains('filters__sorting')){
        event.target.nextElementSibling.classList.toggle('hide')
    }
    if(event.target.classList.contains('settings__date')){
        if(event.target.classList.contains('l')){
            tasks = tasks.sort((a,b)=>{
                if(a['dateChangeCode'] < b['dateChangeCode']) return -1
            })
            event.target.classList.remove('l')
            event.target.classList.add('h')
        }
        else{
            tasks = tasks.sort((a,b)=>{
                if(a['dateChangeCode'] > b['dateChangeCode']) return -1
            })
            event.target.classList.remove('h')
            event.target.classList.add('l')
        }
        changeHTML()
    }else if(event.target.classList.contains('settings__create')){
        if(event.target.classList.contains('l')){
            tasks = tasks.sort((a,b)=>{
                if(a['id'] < b['id']) return -1
            })
            event.target.classList.remove('l')
            event.target.classList.add('h')
        }else{
            tasks = tasks.sort((a,b)=>{
                if(a['id'] > b['id']) return -1
            })
            event.target.classList.remove('h')
            event.target.classList.add('l')
        }
        changeHTML()
    }
    
}


noteList.addEventListener('dragstart', dragStart)
noteList.addEventListener('dragend', dragEnd)
noteList.addEventListener('click', delNote)
noteList.addEventListener('click', focus)

notesPlaceholderDelete.addEventListener('dragenter', dragEnter)
notesPlaceholderDelete.addEventListener('dragleave', dragLeave)
notesPlaceholderDelete.addEventListener('drop', dragDrop)
notesPlaceholderDelete.addEventListener('dragover', dragOver)

noteHideBtn.addEventListener('click', hideNotesList)

addBtn.addEventListener('click', addNote)

textarea.forEach(item=>{
    item.addEventListener('input', saveText)
})

textarea.forEach(item=>{
    item.addEventListener('input', updateTimeChange)
})

textarea.forEach(item=>{
    item.addEventListener('input', saveNameAndDescr)
})

textareaHead.addEventListener('keypress', transitionOnKey)

filters.addEventListener('click', filter)
