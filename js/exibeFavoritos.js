import { exibirFilmesPopulares, renderizaFilmes } from "./app.js";

export async function exibeFavoritos(botao, options) {
  if (botao.checked) {
    const filmesNaLocalStorage =
      JSON.parse(localStorage.getItem("filmes")) || [];
    filmes.innerHTML = "";
    try {
      let filmesBuscados = await Promise.all(
        filmesNaLocalStorage.map(async (filme) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/search/movie?query=${filme}&include_adult=false&language=en-US&page=1`,
            options
          );
          const data = await response.json();
          return data.results[0];
        })
      );
      renderizaFilmes(filmesBuscados);
    } catch (err) {
      console.error(err);
    }
  } else {
    exibirFilmesPopulares();
  }
}
