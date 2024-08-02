const filmes = document.querySelector("#filmes");

filmes.innerHTML += `
    <div class="filme">
        <img
          src="./assets/imagem-de-filme.png"
          alt="imagem do filme"
          class="imagemDoFilme"
        />
        <div class="informacoesDoFilme">
          <p>Avengers EndGame (2019)</p>
          <div class="feedback">
            <div class="avaliacao">
              <i class="fa-solid fa-star"></i>
              <p>9.2</p>
            </div>
            <div class="favoritar">
              <i class="fa-solid fa-heart"></i>
              <p>Favoritar</p>
            </div>
          </div>
        </div>
        <p class="descricaoDoFilme">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>
      </div>
`