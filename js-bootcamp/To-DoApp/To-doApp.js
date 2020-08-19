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
    e.preventDefault()
    console.log(e.target.elements.addTodo.value)
    var ele={
        id : uuidv4(),
        text : e.target.elements.addTodo.value,
        completed : false
    }
    todos.push(ele)
    e.target.elements.addTodo.value = ""
    saveTodos(todos)
    renderTodos(todos,filters)
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