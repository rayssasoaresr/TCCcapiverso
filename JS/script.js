//lista de perguntas do quiz
const perguntas = [
    {
        texto: "Pergunta 1",
        opcoes: [
            { letra: "A", texto: "Opção A", area: "jogos" },
            { letra: "B", texto: "Opção B", area: "esporte" },
            { letra: "C", texto: "Opção C", area: "musica" },
            { letra: "D", texto: "Opção D", area: "idiomas" }
        ]
    },
    {
        texto: "Pergunta 2",
        opcoes: [
            { letra: "A", texto: "Opção A", area: "jogos" },
            { letra: "B", texto: "Opção B", area: "esporte" },
            { letra: "C", texto: "Opção C", area: "musica" },
            { letra: "D", texto: "Opção D", area: "idiomas" }
        ]
    },
    {
        texto: "Pergunta 3",
        opcoes: [
            { letra: "A", texto: "Opção A", area: "jogos" },
            { letra: "B", texto: "Opção B", area: "esporte" },
            { letra: "C", texto: "Opção C", area: "musica" },
            { letra: "D", texto: "Opção D", area: "idiomas" }
        ]
    },
    {
        texto: "Pergunta 4",
        opcoes: [
            { letra: "A", texto: "Opção A", area: "jogos" },
            { letra: "B", texto: "Opção B", area: "esporte" },
            { letra: "C", texto: "Opção C", area: "musica" },
            { letra: "D", texto: "Opção D", area: "idiomas" }
        ]
    }
];

//resultado das ONGs por tema 
const ongsPorArea = {
    jogos: {
        nome: "ONG Recomendada 1",
        descricao: "Descrição da ONG recomendada para este perfil."
    },
    esporte: {
        nome: "ONG Recomendada 2",
        descricao: "Descrição da ONG recomendada para este perfil."
    },
    musica: {
        nome: "ONG Recomendada 3",
        descricao: "Descrição da ONG recomendada para este perfil."
    },
    idiomas: {
        nome: "ONG Recomendada 4",
        descricao: "Descrição da ONG recomendada para este perfil."
    }
};

//controle da pergunta atual e respostas marcadas
let indiceAtual = 0;
let respostasUsuario = [];

if (document.getElementById("texto-pergunta")) {
    mostrarPergunta();
}


//mostra a pergunta atual e cria os botões A, B, C e D na tela
function mostrarPergunta() {
    const perguntaAtual = perguntas[indiceAtual];
    document.getElementById("contador-pergunta").innerText = `PERGUNTA ${indiceAtual + 1} DE ${perguntas.length}`;
    document.getElementById("texto-pergunta").innerText = perguntaAtual.texto;

    const porcentagem = ((indiceAtual + 1) / perguntas.length) * 100;
    document.getElementById("barra-progresso").style.width = porcentagem + "%";

    document.getElementById("btn-voltar").style.visibility = indiceAtual === 0 ? "hidden" : "visible";

    const btnProxima = document.getElementById("btn-proxima");
    btnProxima.innerText = indiceAtual === perguntas.length - 1 ? "Ver meu resultado ★" : "Próxima →";

    const listaOpcoes = document.getElementById("lista-opcoes");
    listaOpcoes.innerHTML = "";

    perguntaAtual.opcoes.forEach((opcao) => {
        const botao = document.createElement("button");
        botao.className = "opcao-btn";
        if (respostasUsuario[indiceAtual] === opcao.area) {
            botao.classList.add("selecionada");
        }
        botao.innerHTML = `<span class="letra-opcao">${opcao.letra}</span> <span>${opcao.texto}</span>`;
        botao.onclick = () => selecionarOpcao(opcao.area, botao);
        listaOpcoes.appendChild(botao);
    });
}

//salva a opção que clicou e destaca o botão que escolheu
function selecionarOpcao(area, botaoClicado) {
    respostasUsuario[indiceAtual] = area;
    const todosBotoes = document.querySelectorAll(".opcao-btn");
    todosBotoes.forEach(btn => btn.classList.remove("selecionada"));
    botaoClicado.classList.add("selecionada");
}


//avança para uma próxima pergunta ou finaliza o quiz
function proximaPergunta() {
    if (!respostasUsuario[indiceAtual]) {
        alert("Por favor, escolha uma das opções antes de continuar!");
        return;
    }

    if (indiceAtual < perguntas.length - 1) {
        indiceAtual++;
        mostrarPergunta();
    } else {
        mostrarResultado();
    }
}


//volta pra pergunta anterior
function perguntaAnterior() {
    if (indiceAtual > 0) {
        indiceAtual--;
        mostrarPergunta();
    }
}


//mostra o tema com mais pontos e recomenda a ONG
function mostrarResultado() {
    document.getElementById("area-quiz").style.display = "none";
    document.getElementById("area-resultado").style.display = "block";

    const contagem = {};
    respostasUsuario.forEach(area => {
        contagem[area] = (contagem[area] || 0) + 1;
    });

    const areaVencedora = Object.keys(contagem).reduce((a, b) => contagem[a] > contagem[b] ? a : b);
    const ong = ongsPorArea[areaVencedora];

    document.getElementById("lista-ongs-recomendadas").innerHTML = `
        <div class="ong-card">
            <h3>${ong.nome}</h3>
            <p>${ong.descricao}</p>
        </div>
    `;
}