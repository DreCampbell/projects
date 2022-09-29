document.querySelector('button').addEventListener('click', getAnime)

function getAnime(){
  const choice = document.querySelector('input').value
  const url = `https://api.jikan.moe/v4/anime?q=${choice}&sfw`

  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data.data)
        document.querySelector('h2').innerText = data.data[0].title
        document.querySelector('img').src = data.data[0].images.jpg.image_url
        document.querySelector('#synopsis').innerText = data.data[0].synopsis
        document.querySelector('#episodes').innerText = `No. of Episodes: ${data.data[0].episodes}`
        document.querySelector('#genre').innerText = `Genre: ${data.data[0].genres[0].name}`
        document.querySelector('#rating').innerText = `Rating: ${data.data[0].rating}`
        document.querySelector('#year').innerText = `Year Released: ${data.data[0].year}`
      })
      .catch(err => {
          console.log(`error ${err}`)
      });
}