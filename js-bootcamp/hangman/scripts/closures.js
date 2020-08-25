const createAdder = (a) => {
    return (b) => {
        return a + b
    }
}
const addChar = createAdder('a')
console.log(addChar('b'))