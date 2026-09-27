/* =========================================================
   SUAS MÚSICAS
   ---------------------------------------------------------
   Para trocar as músicas, edite só esta lista.
   Exemplo:

   const MUSICAS = [
       { nome: "Nome da música", autor: "artista" },
       { nome: "Outra música", autor: "artista" }
   ];

   Se deixar o array vazio ([]), o card mostra
   só o aviso de que você ainda precisa preencher.
   ========================================================= */

const MUSICAS = [
    { nome: "Legendary Lovers", autor: "Katy Perry" },
    { nome: "Equalize", autor: "Pitty" },
    { nome: "Meu Bem Querer", autor: "Yasmim Sensação" },
];


/* =========================================================
   ELEMENTOS
   ========================================================= */

const intro = document.getElementById("intro");
const heartScreen = document.getElementById("heartScreen");
const finalScreen = document.getElementById("finalScreen");

const startButton = document.getElementById("startButton");
const continueButton = document.getElementById("continueButton");
const backButton = document.getElementById("backButton");

const heart = document.getElementById("heart");
const miniHeart = document.getElementById("miniHeart");
const heartMessage = document.getElementById("heartMessage");

const songList = document.getElementById("songList");
const playlistHint = document.getElementById("playlistHint");


/* =========================================================
   TROCA DE TELAS
   ========================================================= */

function showScreen(screen) {

    document.querySelectorAll(".screen").forEach(tela => {
        tela.classList.remove("active");
    });

    screen.classList.add("active");
}


/* =========================================================
   CORAÇÃO
   ---------------------------------------------------------
   Fórmula matemática do coração:

   x = 16 sin³(t)

   y = 13 cos(t)
       - 5 cos(2t)
       - 2 cos(3t)
       - cos(4t)
   ========================================================= */

function drawHeart(box, { tamanho, passo }) {

    box.innerHTML = "";

    const largura = box.offsetWidth;
    const altura = box.offsetHeight;

    if (!largura || !altura) return;

    const total = tamanho;

    const escala = Math.min(largura / 34, altura / 30);

    const centroX = largura / 2;
    const centroY = altura / 2 - 2.5 * escala;

    for (let i = 0; i < total; i++) {

        const t = (Math.PI * 2 * i) / total;

        const x = 16 * Math.pow(Math.sin(t), 3);

        const y =
            13 * Math.cos(t)
            - 5 * Math.cos(2 * t)
            - 2 * Math.cos(3 * t)
            - Math.cos(4 * t);

        const palavra = document.createElement("span");

        palavra.classList.add("love-word");

        /*
            Umas frases mais curtas misturadas
            com as outras, pra não ficar repetitivo.
        */

        palavra.textContent = Math.random() < 0.25
            ? "te adoro"
            : "eu te adoro";

        /*
            Um pouco de irregularidade, senão
            o coração fica mecânico.
        */

        const ruidoX = (Math.random() - 0.5) * 0.6;
        const ruidoY = (Math.random() - 0.5) * 0.6;
        const torto = (Math.random() - 0.5) * 16;

        palavra.style.left = `${centroX + (x + ruidoX) * escala}px`;
        palavra.style.top = `${centroY - (y + ruidoY) * escala}px`;
        palavra.style.rotate = `${torto}deg`;

        box.appendChild(palavra);

        setTimeout(() => {

            palavra.classList.add("show");

        }, i * passo);
    }

    return total * passo;
}


/* coração grande da segunda tela */

function createHeart() {

    const mobile = window.innerWidth < 600;

    const duracao = drawHeart(heart, {
        tamanho: mobile ? 105 : 160,
        passo: 26
    });

    setTimeout(() => {

        heartMessage.classList.add("show");

    }, duracao + 1000);

    setTimeout(() => {

        continueButton.classList.add("show");

    }, duracao + 2600);
}


/* coração pequeno da última tela */

function createMiniHeart() {

    drawHeart(miniHeart, {
        tamanho: window.innerWidth < 600 ? 64 : 82,
        passo: 18
    });
}


/* =========================================================
   CARD DAS MÚSICAS
   ========================================================= */

function montaCard() {

    if (MUSICAS.length === 0) return;

    songList.innerHTML = "";

    MUSICAS.forEach(musica => {

        const item = document.createElement("li");

        item.textContent = musica.nome;

        if (musica.autor) {

            const autor = document.createElement("small");

            autor.textContent = musica.autor;
            item.appendChild(autor);
        }

        songList.appendChild(item);
    });

    playlistHint.classList.add("hide");
}


/* =========================================================
   BOTÕES
   ========================================================= */

startButton.addEventListener("click", () => {

    showScreen(heartScreen);

    setTimeout(createHeart, 500);
});

continueButton.addEventListener("click", () => {

    showScreen(finalScreen);

    setTimeout(createMiniHeart, 400);
});

backButton.addEventListener("click", () => {

    miniHeart.innerHTML = "";

    heart.innerHTML = "";
    heartMessage.classList.remove("show");
    continueButton.classList.remove("show");

    showScreen(intro);
});


/* =========================================================
   RESPONSIVIDADE
   ========================================================= */

let timer;

window.addEventListener("resize", () => {

    clearTimeout(timer);

    timer = setTimeout(() => {

        if (heartScreen.classList.contains("active")) {

            heartMessage.classList.remove("show");
            continueButton.classList.remove("show");

            createHeart();
        }

        if (finalScreen.classList.contains("active")) {

            createMiniHeart();
        }

    }, 300);
});


/* =========================================================
   INICIA O CARD
   ========================================================= */

montaCard();