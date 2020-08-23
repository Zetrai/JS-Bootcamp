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
    const noteEl = document.createElement('div')
    const textEl = document.createElement('a')
    const button = document.createElement('button')

    // Setup the remove note button
    button.textContent = 'x'
    noteEl.appendChild(button)
    button.addEventListener('click',(e) => {
        removeNote(note.id)
        saveNotes(notes)
        renderNotes(notes,filters)
    })

    //Setup the note title text
    if(note.title.length >0){
        textEl.textContent = note.title
    }
    else{
        textEl.textContent = 'Unnamed Note'
    }
    textEl.setAttribute('href',`/edit.html#${note.id}`)
    noteEl.appendChild(textEl)
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
    notes = sortNotes(notes,filters.sortBy)
    const filterNotes = notes.filter((note) => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
    document.querySelector('#notes').innerHTML = ''
    filterNotes.forEach((note) => {
        const noteEl = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}

// Generates Last edited Message
const lastEdited = (timestamp) => `Last Edited at ${moment(timestamp).fromNow()}`
