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
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkboxEl = document.createElement('input')
    const textEl = document.createElement('span')
    const removeButtonEl = document.createElement('button')

    //setup checkbox 
    checkboxEl.setAttribute('type','checkbox')
    checkboxEl.checked = todo.completed
    containerEl.appendChild(checkboxEl)
    checkboxEl.addEventListener('change', (e) => {
        toggleTodo(todo.id)
        saveTodos(todos) 
        renderTodos(todos,filters)
    })

    // setup text
    textEl.textContent = todo.text  
    containerEl.appendChild(textEl)
    
    // Setup Container
    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    //setup remove Button
    removeButtonEl.textContent = 'Remove'
    removeButtonEl.classList.add('button', 'button--text')
    todoEl.appendChild(removeButtonEl)
    removeButtonEl.addEventListener('click',(e) => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos,filters)
    })
    return todoEl
}

// Generate Summary DOM
const summaryDOM = (incomplete) => {
    let todoText = 'todos'
    const summary = document.createElement('h2')
    if(getSavedTodos().length == 1)
        todoText = 'todo'
    summary.textContent = `You have ${incomplete.length} ${todoText} left`
    summary.classList.add('list-title')
    return summary
}

// Render Todos
const renderTodos = (todos,filters) => {
    const todoEl = document.querySelector('#todos')
    const filterTodos = todos.filter((todo) => (todo.text.toLowerCase().includes(filters.searchText.toLowerCase()) && (!filters.checked || !todo.completed)))
    
    const incomplete = filterTodos.filter((todo) => !todo.completed)

    todoEl.innerHTML = ''
    todoEl.appendChild(summaryDOM(incomplete))

    if(filterTodos.length > 0){
        filterTodos.forEach((todo) => {
            const newParagraph = generateTodoDOM(todo)
            todoEl.appendChild(newParagraph)
        })
    }
    else{
        const msgEl = document.createElement('p')
        msgEl.classList.add('empty-message')
        msgEl.textContent = 'No to-do to show'
        todoEl.appendChild(msgEl)
    }

}