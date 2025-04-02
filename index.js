const fetchData = async (searchTerm) => {
    const response = await axios.get('https://omdbapi.com/',{
        params: {
            apikey: "ad36e279",
            i: movie.imdbID
        }
    })
    console.log(response.data)
    summaryElement.innerHTML = movieTemplate(response.data)

        //preguntamos cual lado es?
    if(side === "left"){
        Leftmovie = response.data

    }else{
        rightMovie = response.data
    }
    //preguntamos si tenemos ambos lados
    if(Leftmovie && rightMovie){
        //entonces ejecutamos la funcion de comparacion
        runComparison()

    }

}

const runComparison = () => {
    console.log("comparacion de peliculas")
    const leftSideStats = document.querySelector("left-summary . notification")
    const rightSideStats = document.querySelector("rightft-summary . notification")
    leftSideStats.foreach((leftStat, index) =>{
        const rightStat = rightSideStats[index]
        const leftSideValue = parseInt(leftStat.dataset.value)
        const rightSideValue = parseInt(rightSideStats.dataset.value)
        
        if(rightSideValue > leftSideValue){
            leftStat.classList.remove("is-primary")
            leftStat.classList.add("is-danger")
        }else{
            rightStat.classList.remove("is-primary")
            rightStat.classList.add("is-danger")

        }
    })
}
const MovieTemplate = (MovieDetails) => {
    // Transformar a numeros los strings que llegan de los datos
    const dollars = parseInt(MovieDetails.Boxoffice.replace(/\$/g, "").replace(/,/g, ""))
    console.log(dollars)
    const metascore = parseInt(MovieDetails.MetaScore)
    const imdbRating = parseFloat(MovieDetails.imdbRating)
    const imdbVotes = parseInt (MovieDetails.imdbVotes.replace(/,/g, ""))
    console.log(metascore, imdbRating, imdbVotes)
    const awards = MovieDetails.awards.split("").reduce((prev,word) => {
        const value = parseInt(word)

        if(isNaN(value)){
            return prev
        }else{
            return prev + value
        }
        
    },0)
    console.log("awards", awards)
    //agregar la propiedad data-value a cada elemento del template
    return `
    <article class="media">
        <figure class="media-left">
        <p class="image">
        <img src="${movieDetails.Poster}"/>
        </p>
        </figure>
  
        <div class="media-content">
            <div class="content">
            <h1>${movieDetails.Title}</h1>
            <h4>${movieDetails.Genre}</h4>
            <p>${movieDetails.Plot} <p>

        </div>
            </div>

         </article>
         <article data-values=${awards} class="notification is-primary">
             <p class="title">${movieDetail.Awards} </p>
             <p class="subtitle">Awards</p>
              </article>
              <article data-values=${dollars} class="notification is-primary">
             <p class="title">${movieDetail.BoxOffice} </p>
             <p class="subtitle">Box Office</p>
         </article>
         <article data-values=${metascore} class="notification is-primary">
             <p class="title">${movieDetail.Metascore} </p>
             <p class="subtitle">Meta score</p>
             </article>
        <article data-values=${imdbRating} class="notification is-primary">
             <p class="title">${movieDetail.imdbRating} </p>
             <p class="subtitle">IMDB Rating</p>
  </article>
             <article data-values=${imdbVotes} class="notification is-primary">
             <p class="title">${movieDetail.imdbVotes} </p>
             <p class="subtitle">IMDB Votes</p>
             `
}



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


const debounce = (func, delay = 1000) =>{
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
            apikey: "ad36e279",
            i: movie,imbID
        }
    })
    console.log(response.data)
    document.querySelector("#summary").innerHTML = movieTemplate()
}

const movieTemplate = (movieTemplate) => {
    return `
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
    `
}

