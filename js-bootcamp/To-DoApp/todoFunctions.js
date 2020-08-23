'use strict'

// Get Existing Data from LocalStorage
const getSavedTodos = () => {
    const todoJSON = localStorage.getItem('todos')
    try{
        if(todoJSON){
            return JSON.parse(todoJSON)
        }
        else 
            return []
    }catch(e){
        return []
    }
}

// Save Todos to LocalStorage
const saveTodos = (todos) => {
    localStorage.setItem('todos',JSON.stringify(todos))
}

// Remove a todo from list using id
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id == id)

    if(todoIndex > -1){
        todos.splice(todoIndex, 1)
    }
}

// change Completed based on boolean value and id
const toggleTodo = (id) => {
    const todo = todos.find(function(todo){
        return todo.id == id
    })
    if(todo){
        todo.completed = !todo.completed
    }
    
}

// Generate DOM elements
const generateTodoDOM = (todo) => {
    const divEl = document.createElement('div')
    const checkboxEl = document.createElement('input')
    const textEl = document.createElement('span')
    const removeButtonEl = document.createElement('button')

    //setup checkbox 
    checkboxEl.setAttribute('type','checkbox')
    checkboxEl.checked = todo.completed
    divEl.appendChild(checkboxEl)
    checkboxEl.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        saveTodos(todos) 
        renderTodos(todos,filters)
    })

    //setup text
    textEl.textContent = todo.text  
    divEl.appendChild(textEl)

    //setup remove Button
    removeButtonEl.textContent = 'x'
    divEl.appendChild(removeButtonEl)
    removeButtonEl.addEventListener('click',(e) => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })
    return divEl
}

// Generate Summary DOM
const summaryDOM = (incomplete) => {
    const newParagraph = document.createElement('h2')
    newParagraph.textContent = `You have ${incomplete.length} todos left`
    return newParagraph
}

// Render Todos
const renderTodos = (todos,filters) => {
    const filterTodos = todos.filter((todo) => (todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) && (!filters.checked || !todo.completed)))
    
    const incomplete = filterTodos.filter((todo) => !todo.completed)

    document.querySelector('#todos').innerHTML = ''
    document.querySelector('#todos').appendChild(summaryDOM(incomplete))

    filterTodos.forEach((todo) => {
        const newParagraph = generateTodoDOM(todo)
        document.querySelector('#todos').appendChild(newParagraph)
    })
}