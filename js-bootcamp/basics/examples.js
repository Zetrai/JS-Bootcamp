// --Single--
// p
// #id
// .class

// --Multiple
// p#id
// button.class
// h1#id.class
// h2.class#id


/* //query and remove
const h1 = document.querySelector('h1') //matches 1st h1

console.log(h1)
h1.remove()

//query all and remove
const p = document.querySelectorAll('p') //matches 1st h1

p.forEach(function(p) {
    p.textContent = "**************"
    //console.log(p.textContent)
    //p.remove()
})

//add new element
const newParagraph = document.createElement('p')
newParagraph.textContent = 'This is a new element from JavaScript'
document.querySelector('body').appendChild(newParagraph) */


//Add To-dos
/* let count = 0
const incomplete = todos.filter(function(todo){
    if(todo.completed == false)
        count++;
    const newParagraph = document.createElement('p')
    newParagraph.textContent = todo.text
    document.querySelector('body').appendChild(newParagraph)
})

const newParagraph = document.createElement('h2')
newParagraph.textContent = `You have ${count} todos left`
document.querySelector('body').appendChild(newParagraph)
 */

//remove paragrpahs with 'the' in it
/* const p = document.querySelectorAll('p') //matches 1st h1

p.forEach(function(p) {
    let text = p.textContent

    if(p.textContent.includes('the')){
        p.remove()
    }
}) */