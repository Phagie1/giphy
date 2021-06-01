const api = (v) => `https://api.giphy.com/v1/gifs/translate?api_key=bb2006d9d3454578be1a99cfad65913d&s=${v}`
const myInit = {mode: 'cors'}
const myRequest = new Request(api('dog'), myInit)

const img = document.querySelector('img');

(async () => {
  const response = await fetch(myRequest);
  const dogData = await response.json()
  img.src = dogData.data.images.original.url
})()
.catch(e => {
  console.log(e)
})


async function addImg(){
  const newImg = document.createElement('img')
  let nodes = document.querySelectorAll('img')
  let last = nodes[nodes.length -1]
  try{
    const response = await fetch(myRequest)
    const result = await response.json()
    newImg.src = result.data.images.original.url
    last.after(newImg)
  }
  catch(e){
     newImg.src = 'https://i.giphy.com/media/4Zo41lhzKt6iZ8xff9/giphy.webp'
     last.after(newImg)
     console.error(e, 'in addImage()')
  }    
}


function addTenImg(){
  for(let i = 0; i < 10; i++){
    addImg()
  }
}


document.querySelector('input').addEventListener('keypress', (e) => searchImg(e))

function searchImg(e){
   const newImg = document.createElement('img')
   let nodes = document.querySelectorAll('img')
   let last = nodes[nodes.length -1]
   const searchRequest = new Request(api(e.target.value), myInit)
   if(e.key === 'Enter'){
    fetch(searchRequest)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json()
    })
    .then(function(response) {
      console.log(response)
      newImg.src = response.data.images.original.url
      last.after(newImg)
      document.querySelector('p').innerHTML = ''
      e.target.value = ''
    })
    .catch(e => {
      document.querySelector('p').innerHTML = 'sorry, try somehing else'
      console.error(e.message, 'in searchImg')
    })
  }
  
}