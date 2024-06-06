// Add event listener to the form to handle submission
document.querySelector("form").addEventListener("submit", addMovies);

function addMovies(e) {

  e.preventDefault();

  
  let title = document.getElementById("title").value;
  let plot = document.getElementById("plot").value;
  let poster = document.getElementById("poster").value;


  const movieObject = {
    Title: title,
    Plot: plot,
    Poster: poster,
  };

  console.log(movieObject);

  fetch("http://localhost:3000/movies", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(movieObject) 
  })
  .then(response => response.json())
  .then(newMovie => {
    addMovie(newMovie);
  })
  .catch(error => console.error('Error:', error)); 
}

// Function to add a movie to the DOM
function addMovie(movie) {
  let row = document.getElementById("card");
  let div = document.createElement("div");
  div.classList.add("col-3"); 
  div.innerHTML = `
    <div class="card">
      <img src="${movie.Poster}" class="card-img-top" alt="" height="300px">
      <div class="card-body bg-warning">
        <h5 class="card-title hind-bold text-primary">${movie.Title}</h5>
        <p class="card-text hind-light text-dark">${movie.Plot}</p>
        <button class="btn btn-danger hind-light" <i class="bi bi-trash3"></i><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3" viewBox="0 0 16 16">
  <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
</svg></button> 
        <button class="btn btn-danger hind-light">Watch</button> 
      </div>
    </div>
  `
  
 
  row.appendChild(div);
  div.querySelector("button").addEventListener("click", function () {
    div.remove();
    deletemovie(movie.id)
  function deletemovie() {
    fetch(`http://localhost:3000/movies/${movie.id}`, {
      method: "DELETE"
    })
   //.then(response => response.json())
  }
  });
}

// Function to fetch and display movies from the server
function getMovies() {
  fetch("http://localhost:3000/movies") 
    .then(res => res.json()) 
    .then(movies => {
      movies.forEach(addMovie);
    })
    .catch(error => console.error('Error:', error)); 
}

document.addEventListener("DOMContentLoaded", function() {
  getMovies();
});
