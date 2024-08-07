import { exibeFavoritos } from "./exibeFavoritos.js";
const inputPesquisar = document.querySelector("#procuraFilme");
const filmes = document.querySelector("#filmes");
const buscarBtn = document.querySelector(".lupa");
const mostrarFavoritosBtn = document.querySelector("#mostrarFilmesFav");

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNWEyYTQzMjM5OTIxZmJlZWQ3ZTY0M2FhODk0ZWU4NiIsIm5iZiI6MTcyMjcwOTI4MC4xMzE2MzEsInN1YiI6IjY2YWU3MzcwOTlkOGU2MjA5MWQ4ZWIyNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.8ievS79oI7PKX0RtMujZYCijVCY6QvH5qmC3I-Yx9CA",
  },
};
export function exibirFilmesPopulares() {
  filmes.innerHTML = "";
  fetch(
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
    options
  )
    .then((response) => response.json())
    .then((response) => {
      renderizaFilmes(response.results);
    })
    .catch((err) => console.error(err));
}

buscarBtn.addEventListener("click", (e) => {
  console.log("Clicou");
  e.preventDefault();
  const inputValue = inputPesquisar.value;
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
      renderizaFilmes(response.results);
    })
    .catch((err) => console.error(err));
}
export function renderizaFilmes(response) {
  console.log(response);
  response.forEach((movie) => {
    var isFavoritado = false;
    const nomeDoFilme = movie.original_title;
    if (localStorage.getItem("filmes")) {
      var filmesFavoritados = localStorage.getItem("filmes");
      if (filmesFavoritados.includes(nomeDoFilme)) {
        isFavoritado = true;
      }
    }

    filmes.innerHTML += `
    
  <div class="filme">
      <img
        src="https://image.tmdb.org/t/p/w500/${movie.backdrop_path}"
        alt="imagem do filme ${movie.original_title}"
        class="imagemDoFilme"
      />
      <div class="informacoesDoFilme">
        <p class="tituloDoFilme">${movie.original_title}</p>
        <div class="feedback">
          <div class="avaliacao">
            <i class="fa-solid fa-star"></i>
            <p>${movie.vote_average.toFixed(2)}</p>
          </div>
          <div class="favoritar">
            ${
              isFavoritado
                ? `<i class="fa-solid fa-heart"></i>
            <p class="textoFavoritar">Desfavoritar</p>`
                : `<i class="fa-regular fa-heart"></i>
            <p class="textoFavoritar">Favoritar</p>`
            }
          </div>
        </div>
      </div>
      <p class="descricaoDoFilme">
        ${movie.overview}
      </p>
    </div>
`;
  });
  const botoesFavoritar = document.querySelectorAll(".fa-heart");
  botoesFavoritar.forEach((botao) => {
    botao.addEventListener("click", () => {
      favoritarFilme(botao);
    });
  });
}

function favoritarFilme(botao) {
  const isFavoritado = botao.classList.contains("fa-solid");
  const filme = botao.closest(".filme");
  const nomeDoFilme = filme.querySelector(".informacoesDoFilme p").textContent;
  const textoFavoritar = filme.querySelector(".textoFavoritar");
  if (isFavoritado) {
    botao.classList.remove("fa-solid");
    botao.classList.add("fa-regular");
    textoFavoritar.textContent = "Favoritar";
  } else {
    botao.classList.remove("fa-regular");
    botao.classList.add("fa-solid");
    textoFavoritar.textContent = "Desfavoritar";
  }

  armazenarFavorito(nomeDoFilme, !isFavoritado); // Passa o estado inverso
}

function armazenarFavorito(nomeDoFilme, adicionar) {
  let filmesNaLocalStorage = JSON.parse(localStorage.getItem("filmes")) || [];

  if (adicionar) {
    if (!filmesNaLocalStorage.includes(nomeDoFilme)) {
      filmesNaLocalStorage.push(nomeDoFilme);
    }
  } else {
    filmesNaLocalStorage = filmesNaLocalStorage.filter(
      (filme) => filme !== nomeDoFilme
    );
  }

  localStorage.setItem("filmes", JSON.stringify(filmesNaLocalStorage));
}

mostrarFavoritosBtn.addEventListener("click", () => {
  inputPesquisar.value = "";
  exibeFavoritos(mostrarFavoritosBtn, options);
});

exibirFilmesPopulares();
