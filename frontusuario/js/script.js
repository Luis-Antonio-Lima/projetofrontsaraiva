function login() {
    const usuario = document.querySelector("#nomeusuario")
    const senha = document.querySelector("#senha")

    // Usamos o comando trim() para eliminar os espaços

    if (usuario.value.trim() == "" || senha.value.trim() == "") {
        return alert("Preencha os dois campos")
    }
    //alert(usuario.value+" - "+senha.value)

    fetch("http://127.0.0.1:9000/api/v1/users/login",{
        method:"POST",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({
            nomeusuario:usuario.value,
            senha:senha.value
        })
    }).then((res) => res.json())
    .then((result) => {
        console.log(result)
    })
    .catch ((error) => console.error(`Erro ao tentar acessar a api ${error}`))
}

function cadastrarUsuario() {
    const usuario = document.querySelector("#txtusuario")
    const senha = document.querySelector("#txtsenha")
    const foto = document.querySelector("#txtfotoperfil")

    if (usuario.value.trim() == "" || senha.value.trim() == "" || foto.value.trim() == "") {
        return alert("Preencha os dois campos")
    }
    fetch("http://127.0.0.1:9000/api/v1/users/cadastrar",{
        method:"POST",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        },
        body:JSON.stringify({
            nomeusuario:usuario.value,
            senha:senha.value,
            foto:foto.value
        })
    }).then((res) => res.json())
    .then((result) => {
        console.log(result)
    })
    .catch ((error) => console.error(`Erro ao tentar acessar a api ${error}`))
}

function carregarLivros() {
    const conteudo = document.querySelector(".conteudo")
    fetch("http://127.0.0.1:9001/api/v1/livros/detalhes")
    .then((res) => res.json())
    .then((dados) => {
        dados.payload.map((rs) => {

            let card = `<div class="card space" style="width: 242px;">
                <img src=${rs.foto1} class="card-img-top altura" alt="...">
                <div class="card-body">
                    <h3>${rs.nometitulo}</h3>
                    <p class="card-text">Autor: ${rs.autor}</p>
                    <p class="card-text livro">De: R$ ${rs.precoatual}</p>
                    <p class="card-text">Por: R$ ${rs.precodesconto<1 ? rs.precoatual : rs.precodesconto}</p>
                    <a href="detalhes.html?idlivro=${rs.idtitulo}" class="btn btn-dark">Saiba Mais</a>
                </div>
            </div>`

          conteudo.innerHTML += card
        })
    })
    .catch((error) => console.error (`Erro na api ${error}`))
}

function detalhes() {
    let id_url = window.location.search.split('=')
    //console.log(id_url)
    const conteudo = document.querySelector(".conteudo")
    fetch("http://127.0.0.1:9001/api/v1/livros/detalhes/"+id_url[1])
    .then((res) => res.json())
    .then((dados) => {
        dados.payload.map((rs) => {

            let card = 
            `<div class="card mb-3 col-md-12">
            <div class="row g-0">
              <div class="col-md-3">
                <div id="carouselExampleIndicators" class="carousel slide carouselDetalhe">
            <div class="carousel-inner ">
              <div class="carousel-item active ">
                <img src="${rs.foto1}" class="d-block w-100" alt="Capa do Livro">
              </div>
              <div class="carousel-item">
                <img src="${rs.foto2}" class="d-block w-100" alt="Imagens do livro 1">
              </div>
              <div class="carousel-item">
                <img src="${rs.foto3}" class="d-block w-100" alt="Imagens do livro 2">
              </div>
              <div class="carousel-item active ">
                <img src="${rs.foto4}" class="d-block w-100" alt="Capa do Livro">
              </div>
            </div>
            <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Previous</span>
                </button>
                <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="visually-hidden">Next</span>
                </button>
              </div>
              </div>
              <div class="col-md-9">
                <div class="card-body">
                  <h3 class="card-title">${rs.nometitulo}</h3>
                  <h5 class="card-title">Autor: ${rs.autor}</h5>
                  <p class="card-text">${rs.sinopse}</p>
                  <p id="preco" class="card-text precoatual">R$ ${rs.precodesconto < 1 ? rs.precoatual : rs.precodesconto}</p>
                </div>
            </div>
          </div>`

          conteudo.innerHTML += card
        })
    })
    .catch((error) => console.error (`Erro na api ${error}`))
}