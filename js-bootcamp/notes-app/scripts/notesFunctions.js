'use strict'

// Read existing notes from localStorage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    try{
        if(notesJSON)
            return JSON.parse(notesJSON)
        else
            return []
    }catch(e){
        return []
    }
    
}
// Save Note to LocalStorage
const saveNotes = (note) => {
    localStorage.setItem('notes',JSON.stringify(notes))
}

//remove a Note from a list using id
const removeNote = (id) =>{
    const noteIndex = notes.findIndex((note) => note.id == id)

    if(noteIndex > -1){
        notes.splice(noteIndex, 1)
    }
}

// Generate DOM Structure for a note
const generateNoteDOM = (note) => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')

    //Setup the note title text
    if(note.title.length >0){
        textEl.textContent = note.title
    }
    else{
        textEl.textContent = 'Unnamed Note'
    }
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    // setup Link
    noteEl.setAttribute('href',`/edit.html#${note.id}`)
    noteEl.classList.add('list-item')

    // status Message
    statusEl.textContent = lastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}

// Sorting the Notes by one of three ways
const sortNotes = (notes,sortBy) => {
    if(sortBy === 'byEdited'){
        return notes.sort(function(a, b){
            if(a.updatedAt > b.updatedAt){
                return -1
            }
            else if(a.updatedAt < b.updatedAt){
                return 1
            }
            else{
                return 0
            }
        })
    }
    else if (sortBy === 'byCreated'){
        return notes.sort(function(a, b){
            if(a.createdAt > b.createdAt){
                return -1
            }
            else if(a.createdAt < b.createdAt){
                return 1
            }
            else{
                return 0
            }
        })
    }
    else if (sortBy === 'alphabetical'){
        return notes.sort(function(a, b){
            if(a.title.toLowerCase() < b.title.toLowerCase()){
                return -1
            }
            else if(a.title.toLowerCase() > b.title.toLowerCase()){
                return 1
            }
            else{
                return 0
            }
        })
    }
    else{
        return notes
    }
}

// Render Notes
const renderNotes = (notes,filters) => {
    const notesEl = document.querySelector('#notes')
    notes = sortNotes(notes,filters.sortBy)
    const filterNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''
    if(filterNotes.length > 0){
        filterNotes.forEach((note) => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    }
    else{
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No Notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }

    
}

// Generates Last edited Message
const lastEdited = (timestamp) => `Last Edited at ${moment(timestamp).fromNow()}`
