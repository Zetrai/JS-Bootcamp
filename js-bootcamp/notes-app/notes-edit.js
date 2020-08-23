'use strict'

const titleEl = document.querySelector("#noteTitle")
const bodyEl = document.querySelector("#noteBody")
const removeEl = document.querySelector("#removeNote")
const spanEl = document.querySelector("#lastEdited")
const noteId = location.hash.substring(1) 

let notes = getSavedNotes()
let note = notes.find((note) => note.id === noteId)

if(!note)
    location.assign("/index.html")

spanEl.textContent = lastEdited(note.updatedAt)

titleEl.value = note.title
bodyEl.value = note.body

titleEl.addEventListener('input',(e) => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    spanEl.textContent = lastEdited(note.updatedAt)
    saveNotes(notes)
})
bodyEl.addEventListener('input',(e) => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    spanEl.textContent = lastEdited(note.updatedAt)
    saveNotes(notes)
})
removeEl.addEventListener('click',(e) => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign("/index.html")

})

window.addEventListener('storage',(e) => {
    if(e.key === 'notes'){
        notes=JSON.parse(e.newValue)
        let note = notes.find((note) => note.id === noteId)
        
        if(!note)
            location.assign("/index.html")
        
        titleEl.value = note.title
        bodyEl.value = note.body
        spanEl.textContent = lastEdited(note.updatedAt)
    }
})