const filmes = document.querySelector("#filmes");
const buscarBtn = document.querySelector(".lupa");
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWEyYTQzMjM5OTIxZmJlZWQ3ZTY0M2FhODk0ZWU4NiIsIm5iZiI6MTcyMjcwOTI4MC4xMzE2MzEsInN1YiI6IjY2YWU3MzcwOTlkOGU2MjA5MWQ4ZWIyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8ievS79oI7PKX0RtMujZYCijVCY6QvH5qmC3I-Yx9CA",
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
    renderizaFilmes(response);
  })
  .catch((err) => console.error(err));

buscarBtn.addEventListener("click", (e) => {
  console.log("Clicou");
  e.preventDefault();
  const inputValue = buscarBtn.previousElementSibling.value;
  pesquisarFilmes(inputValue);
});

function pesquisarFilmes(nomeDoFilme) {
  filmes.innerHTML = "";
  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${nomeDoFilme}&include_adult=false&language=en-US&page=1`,
    options
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      renderizaFilmes(response);
    })
    .catch((err) => console.error(err));
}
function renderizaFilmes(response) {
  response.results.forEach((movie) => {
    filmes.innerHTML += `
    
  <div class="filme">
      <img
        src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}"
        alt="imagem do filme ${movie.original_title}"
        class="imagemDoFilme"
      />
      <div class="informacoesDoFilme">
        <p>${movie.original_title}</p>
        <div class="feedback">
          <div class="avaliacao">
            <i class="fa-solid fa-star"></i>
            <p>${movie.vote_average.toFixed(2)}</p>
          </div>
          <div class="favoritar">
            <i class="fa-solid fa-heart"></i>
            <p>Favoritar</p>
          </div>
        </div>
      </div>
      <p class="descricaoDoFilme">
        ${movie.overview}
      </p>
    </div>
`;
  });
}
