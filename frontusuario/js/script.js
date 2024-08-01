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
                    <div>
                        <h3>${rs.nometitulo}</h3>
                        <p class="card-text">Autor: ${rs.autor}</p>
                        <p class="card-text livro">De: R$ ${rs.precoatual}</p>
                        <p id="desconto" class="card-text">Por: R$ ${rs.precodesconto<1 ? rs.precoatual : rs.precodesconto}</p>
                    </div>
                    <div class=botao>
                        <a href="detalhes.html?idlivro=${rs.idtitulo}" id="botao" class="btn btn-dark">Saiba Mais</a>
                    </div>
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

            document.querySelector("h2").innerHTML = `Detalhes do livro: `+rs.nometitulo
            let porcentagem = ((rs.precoatual - rs.precodesconto) / rs.precoatual) * 100
            
            let card = 
            `<div class="card mb-3 col-md-12">
            <div class="row g-0">
              <div class="col-md-3">
                <div id="carouselExampleIndicators" class="carousel slide carouselDetalhe">
            <div class="carousel-inner ">
              <div class="carousel-item active ">
                <img src="${rs.foto1}" class="d-block w-100 carouselImage" alt="Capa do Livro">
              </div>
              <div class="carousel-item">
                <img src="${rs.foto2}" class="d-block w-100 carouselImage" alt="Imagens do livro 1">
              </div>
              <div class="carousel-item">
                <img src="${rs.foto3}" class="d-block w-100 carouselImage" alt="Imagens do livro 2">
              </div>
              <div class="carousel-item active ">
                <img src="${rs.foto4}" class="d-block w-100 carouselImage" alt="Capa do Livro">
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
                  <p id="desconto" class="card-text precodesconto">${rs.precodesconto < 1 ? porcentagem = "Sem desconto disponível" : `${porcentagem.toFixed(0)}%`}</p>
                  <a href=carrinho_total.html?idlivro=${rs.idtitulo} class="carrinho" onclick="adicionarcarrinho()">
                  <img src="img/carrinho.png" width = 40px; height = 40px>Incluir no carrinho</a>
                </div>
            </div>
          </div>`

          conteudo.innerHTML += card
        })
    })
    .catch((error) => console.error (`Erro na api ${error}`))
}

function buscar() {
    const conteudo = document.querySelector(".conteudo")
    conteudo.innerHTML = ''

    let palavra = document.querySelector("input").value
    if (palavra == null || palavra == "" || palavra == " ") {
        location.reload()
    } else {
        document.querySelector("h2").innerHTML = `Você pesquisou por: ${palavra}`
    }

    fetch("http://127.0.0.1:9001/api/v1/livros/detalhes/titulo/"+palavra)
    .then((res) => res.json())
    .then((dados) => {
        dados.payload.map((rs) => {

            let porcentagem = ((rs.precoatual - rs.precodesconto) / rs.precoatual) * 100

            let card = 
            `<div class="card mb-3 col-md-12">
            <div class="row g-0">
              <div class="col-md-3">
                <div id="carouselExampleIndicators" class="carousel slide carouselDetalhe">
            <div class="carousel-inner ">
              <div class="carousel-item active ">
                <img src="${rs.foto1}" class="d-block w-100 carouselImage" alt="Capa do Livro">
              </div>
              <div class="carousel-item">
                <img src="${rs.foto2}" class="d-block w-100 carouselImage" alt="Imagens do livro 1">
              </div>
              <div class="carousel-item">
                <img src="${rs.foto3}" class="d-block w-100 carouselImage" alt="Imagens do livro 2">
              </div>
              <div class="carousel-item active ">
                <img src="${rs.foto4}" class="d-block w-100 carouselImage" alt="Capa do Livro">
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
                  <p id="desconto" class="card-text precodesconto">${rs.precodesconto < 1 ? porcentagem = "Sem desconto disponível" : `${porcentagem.toFixed(0)}%`}</p>
                  <a href=carrinho.html?idlivro=${rs.idtitulo} class="carrinho">
                  <img src="img/carrinho.png" width = 40px; height = 40px>Incluir no carrinho</a>
                </div>
            </div>
          </div>`

          conteudo.innerHTML += card
        })
    })
    .catch((error) => console.error (`Erro na api ${error}`))
}

function carrinhototal() {
  const carrinho = document.querySelector(".carrinho")
  fetch("http://127.0.0.1:9002/api/v1/carrinho/listar/")
  .then((res) => res.json())
  .then((dados) => {
      dados.payload.map((rs) => {

          let card = `<div>
              <div>
                  <div>
                      <h3>${rs.quantidade}</h3>
                      <p>${rs.total}</p>
                  </div>
              </div>
          </div>`

        carrinho.innerHTML += card
      })
  })
  .catch((error) => console.error (`Erro na api ${error}`))

  const total = document.querySelector(".total")
  fetch("http://127.0.0.1:9002/api/v1/carrinho/exibirtotal")
  .then((res) => res.json())
  .then((dados) => {
      dados.payload.map((rs) => {

          let card = `<div>
              <div>
                  <div>
                      <p id="total">${rs.total}</p>
                  </div>
              </div>
          </div>`

        total.innerHTML += card
      })
  })
  .catch((error) => console.error (`Erro na api ${error}`))
}

function carrinho() {
    let id_url = window.location.search.split('=')
    const carrinho = document.querySelector(".carrinho")
    fetch("http://127.0.0.1:9002/api/v1/carrinho/listar/"+id_url[1])
    .then((res) => res.json())
    .then((dados) => {
        dados.payload.map((rs) => {

            let card = `
            <div class="card row mb-3 col-md-12">
              <div class="col-md-12" id="bottom">
                <img src="${rs.foto1}" class="d-block w-100 carouselImage imagem" alt="Capa do Livro">
                <div class="col-md-7" id="coluna">
                  <p class="precototal">${rs.total}</p>
                  <p class="card-text livro">De: R$ ${rs.precoatual}</p>
                  <p id="preco" class="card-text precoatual">R$ ${rs.precodesconto < 1 ? rs.precoatual : rs.precodesconto}</p>
                  <select class="opcao" onchange="atualizarcarrinho(this.value, ${rs.precodesconto < 1 ? rs.precoatual : rs.precodesconto}, ${rs.total}, ${rs.idcarrinho})">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                  </select>
                  <button type="button" class="btn btn btn-outline-dark botao2" onclick="removercarrinho(${rs.idcarrinho})">Excluir</button>
                </div>              
              </div>
            </div>`

          carrinho.innerHTML += card
        })
    })
    .catch((error) => console.error (`Erro na api ${error}`))

    let idurl = window.location.search.split('=')
    const total = document.querySelector(".total")
    fetch("http://127.0.0.1:9002/api/v1/carrinho/exibir/"+idurl[1])
    .then((res) => res.json())
    .then((dados) => {
        dados.payload.map((rs) => {

            let card = `<div id="total">
              <p>${rs.total}</p>
            </div>` 

          total.innerHTML += card
        })
    })
    .catch((error) => console.error (`Erro na api ${error}`))
}

function adicionarcarrinho() {
  let id_url = window.location.search.split('=')
  fetch("http://127.0.0.1:9002/api/v1/carrinho/adicionarlivro/"+id_url[1],{
        method:"POST",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        }
      })
  .then((res) => res.json())
  .catch((error) => console.error (`Erro na api ${error}`))
}                 

function removercarrinho(id) {
  //alert("teste: " + id)
  fetch("http://127.0.0.1:9002/api/v1/carrinho/removerlivro/"+id,{
        method:"DELETE",
        headers:{
            "accept":"application/json",
            "content-type":"application/json"
        }
      })
  .then((res) => res.json())
  .catch((error) => console.error (`Erro na api ${error}`))
  location.reload()
}


function atualizarcarrinho(quantidade, real, total, id) {
  //alert(quantidade)
  if (quantidade == 1) {
    //alert("teste, a quantidade do seu produto é 1 " + total)
    total = real
    //alert("teste, a quantidade do seu produto é 1 " + total + " " + id)
  } else if (quantidade == 2) {
    //alert("teste, a quantidade do seu produto é 2 " + total)
    total = real * 2
    //alert("teste, a quantidade do seu produto é 2 " + total + " " + id)
  } else if (quantidade == 3) {
    //alert("teste, a quantidade do seu produto é 3 " + total)
    total = real * 3
    //alert("teste, a quantidade do seu produto é 3 " + total + " " + id)
  } else if (quantidade == 4) {
    //alert("teste, a quantidade do seu produto é 4 " + total)
    total = real * 4
    //alert("teste, a quantidade do seu produto é 4 " + total + " " + id)
  } else if (quantidade == 5) {
    //alert("teste, a quantidade do seu produto é 5 " + total)
    total = real * 5
    //alert("teste, a quantidade do seu produto é 5 " + total.toFixed(2) + " " + id)
  }
  
  const quantidadeProdutos = quantidade
  const quantidadeTotal = total
  
  //alert(quantidadeProdutos + " " + quantidadeTotal.toFixed(2))
  
  fetch("http://127.0.0.1:9002/api/v1/carrinho/atualizarlivro/"+id, {
    method: "PUT",
    headers: {
      "accept": "application/json",
      "content-type": "application/json"
    },
    body: JSON.stringify({
      carrinhoQuantidade: quantidade,
      carrinhoTotal: total
    })
  }).then((res) => res.json())
    .then((result) => {
      console.log(result)
    })
    .catch((error) => console.error(`Erro ao acessar a api ${error}`))
    //location.reload()
}