const fetchData = async (searchTerm) => {
    const response = await axios.get('https://omdbapi.com/',{
        params: {
            apikey:'4e21988b',
            s:'avengers'
        }
    })


if(response.data.Error){
    return[]
}


console.log(response.data.Search)
}
fetchData()


//feachData()
const root = document.querySelector('.autocomplete')
root.inmerHTML = `
<label><b>Busqueda de peliculas</b></label>
<input class"input"/>
<div class="dropdown">
    <div class="dropdown-menu">
    <div class="dropdwomn-conect results"></div>


    </div>
</div>
`
const input = document.querySelector("input")
const dropdown = document.querySelector('.dropdwon')
const resultswrapper = document.querySelector('.results')


const debonce = (func, delay = 1000) =>{
    let timeoutld
    return(...args)=> {
        clearTimeout(timeoutld)
        timeoutld=timeoutld(()=>{
    func.apply(null,args)
    }, delay)
 }
}


const onInpunt = async(event)=>{
    const movies = await fetchData(event.target.value)
    console.log("MOVIES:", movies)
if(!movies.legth){
    dropdown.classList.remove('is-active')
    return
}
resultswrapper.innerHTML = ''
dropdown.classList.add('is-active')


for(let movie of movies){
    const option = document.createElement('a')
    const imgSRC =  movie.Postar === 'N/A' ? '':movie.Postar


option.classList.add('dropdown-item')
option.innerHTML =`
<img src="${imgSrc}"/>
${movie.Title}
`
option.addEventListener('click', () => {
dropdown.classList.remove('is-active')
input.value= movie.Title
onMovieSelect=(movie)
})
resultswrapper.appendChild(option)
}
}
InputEvent.addEventListener("input", debounce (onInpunt, 1000)) 

document.addEventListener( "clicl", Event => {
    if(!root.contains(Event.target)){
        dropdown.classList.remove("is-active")
    }
})

const onMovieSelect = async (movie) =>{
    const response = await axios.get("https://www.omdbapi.com/", {
        params: {
            apikey: "",
            i: movie,imbID
        }
    })
    console.log(response.data)
    document.querySelector("#summary").innerHTML = movieTemplate()
}

const movieTemplate = (movieTemplate) => {
    return 
    <article class="media">
        <figure class="media-left">
        <p class="image">
            <img src"${movieDetail.Postar}" />
        </p>
        </figure>
        <div class="media-content">
            <div class="content">
        <h1>${movieDetail.Title}</h1>
        <h4>${movieDetail.Genre}</h4>
        <p>${movieDetail.plot}</p>
        </div>
        </div>
    </article>
}

