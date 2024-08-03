import { Key } from "./key.js";

const filmes = document.querySelector("#filmes");
const key = new Key();
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + key.token,
  },
};

fetch(
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
  options
)
  .then((response) => response.json())
  .then((response) => {
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
  })
  .catch((err) => console.error(err));
