const update = document.querySelector('#update-button')

update.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'put',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Naruto',
            quote: 'Uzumaki Barrage!!'
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response =>{
        window.location.reload(true)
    })
})

const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

deleteButton.addEventListener('click', _ => {
    fetch('/quotes', {
        method: 'delete',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            name: 'Naruto'
        })
    })
    .then(res => {
        if(res.ok) return res.json()
    })
    .then(response => {
        if(response === 'No quote to delete'){
            messageDiv.textContent = 'No more Naruto quotes to delete'
        }else{
            window.location.reload(true)
        }
    })
    .catch(error => console.error(error))
})

const deleteText = document.querySelectorAll('.fa-trash')

Array.from(deleteText).forEach((element)=>{
    element.addEventListener('click', deleteQuote)
})

async function deleteQuote(){
    const name = this.parentNode.childNodes[1].innerText
    const quote = this.parentNode.childNodes[3].innerText
    try{
        const response = await fetch('deleteQuote', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: name,
                quote: quote
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}