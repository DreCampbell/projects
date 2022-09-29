//The user will enter a date. Use that date to get the NASA picture of the day from that date! https://api.nasa.gov/

document.querySelector('button').addEventListener('click', getPic)

function getPic(){
    const picOfDay = document.querySelector('input').value
// console.log(picOfDay)

    const url = `https://api.nasa.gov/planetary/apod?api_key=sgqaJ8XrMeOIhyt8sdD8dxeDC0UR0TRSjZK3V2ZO&date=${picOfDay}`

    fetch(url)
        .then(res => res.json())
        .then(data =>{
            console.log(data)
            if(data.media_type == 'image'){
                document.querySelector('img').src = data.hdurl
                document.querySelector('iframe').style.display = 'none'
                document.querySelector('img').style.display = 'block'
            }else if(data.media_type == 'video'){
                document.querySelector('iframe').src = data.url
                document.querySelector('img').style.display = 'none'
                document.querySelector('iframe').style.display = 'block'
            }
            document.querySelector('h2 ').innerText = data.title
            document.querySelector('p').innerText = data.explanation
    })
    .catch(err =>{
        console.log(`Error ${err}`)
    })

}