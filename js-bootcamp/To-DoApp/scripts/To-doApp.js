'use strict'

var todos = getSavedTodos()

//EventListners
const filters = {
    searchText: '',
    checked : false
}

renderTodos(todos,filters)

document.querySelector('#searchText').addEventListener('input',(e) => {
    filters.searchText = e.target.value
    renderTodos(todos,filters)
})

document.querySelector('#todoForm').addEventListener('submit',(e) => {
    const text = e.target.elements.addTodo.value.trim()
    e.preventDefault()

    if(text.length > 0){
        todos.push({
            id : uuidv4(),
            text,
            completed : false
        })
        e.target.elements.addTodo.value = ""
        saveTodos(todos)
        renderTodos(todos,filters) 
    }

    
})

document.querySelector('#hide').addEventListener('change',(e) => {
    filters.checked = e.target.checked
    renderTodos(todos,filters)
})

window.addEventListener('storage',(e) => {
    if(e.key === 'todos'){
        todos=JSON.parse(e.newValue)
        renderTodos(todos,filters)
    }
})