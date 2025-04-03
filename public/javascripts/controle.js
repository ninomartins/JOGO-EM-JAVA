let audio = document.querySelector('audio');
let canvas = document.getElementById("meuCanvas");
let ctx = canvas.getContext("2d");
console.log(canvas.width)
let x = 250; // Posição inicial X da nave
let y = 150; // Posição inicial Y da nave
let velocidade = 10; // Velocidade da nave

let a = Math.random() * canvas.width; // Posição inicial aleatória do inimigo
let b = 7;   // Posição inicial Y do inimigo
let velocidadeQueda = 0.5; // Velocidade de queda do inimigo

let aa = 1 // Munição do inimigo 
let t = a+aa
// let bb = Math.random()*canvas.width;
let velocidademunicaoInimigo = 1

let tiros = []; // Array para armazenar os tiros
let i;
let c = 0;
let score = 0;
let somTiros = new Audio("/audio/acerto.mp3");
// Carregar imagem da nave
let naveImg2 = new Image()
naveImg2.src = "/images/meteoro-removebg-preview.png";
let naveImg = new Image();
naveImg.src = "/images/naveReal.png"; // Substitua pelo caminho correto

// Carregar imagem de fundo
let fundoImg = new Image();

if (score < 20) {
  
  fundoImg.src = "/images/espaco.avif"; // Caminho da imagem de fundo
}





function desenhar() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpa o canvas

    // Desenha o fundo
    ctx.drawImage(fundoImg, 0, 0, canvas.width, canvas.height);

    // Desenha a nave
    ctx.drawImage(naveImg, x - 15, y - 15, 50, 50);

    // Desenha o inimigo
    if (score < 20) {
      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.arc(a, b, 10, 0, Math.PI * 2);
      ctx.fill();
    }
    
   

    if (score > 20) {
      ctx.fillStyle = "red"
      ctx.beginPath();
      ctx.drawImage(naveImg2, a, b, 40, 40);
      ctx.fill();
      ctx.beginPath();
    ctx.fillStyle = "blue";
    ctx.arc(a, b+aa, 5, 0, Math.PI * 2);
    ctx.fill();
    };

    if (score > 30) {
      ctx.fillStyle = "tomato"
    };
    
    // ctx.beginPath();
    // ctx.arc(a, b, 10, 0, Math.PI * 2);
    // ctx.fill();
    if (score > 20) {
        if (colisao(x, y, a, b+aa)){
            gameover()
        }
    }
  

    if (colisao(x, y, a, b)) {
        gameover();
    }

    // Atualiza e desenha os tiros 
    for (i = 0; i < tiros.length; i++) {


        tiros[i].y -= 30; // Move o tiro para cima
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.arc(tiros[i].x, tiros[i].y, 5, 0, Math.PI * 2);
        ctx.fill();
      
        // Verifica a colisão
        if (colisao(tiros[i].x, tiros[i].y, a, b)) {
            // console.log("💥 Inimigo atingido!");
            c++;
            placar(c);
            acerto();
            
            // Remove inimigos e tiros após a colisão
            b = 0;
            aa=1
            a = Math.random() * (canvas.width - 20) + 10;
            tiros.splice(i, 1);
            i--;
        }
    }

    // Remove tiros que saíram da tela
    tiros = tiros.filter(tiro => tiro.y > 0);
  
}

function placar(valor) {
    score += valor;
    document.querySelector('.score').textContent = score;
    
    if (score > 20) {
        velocidadeQueda = 1;
        velocidade = 20;
          fundoImg = new Image();
   fundoImg.src = "/images/3549556-espaco-galaxia-fundo-vetor.jpg"
    }
    if (score > 30) {
        velocidadeQueda = 2;
        velocidade = 25;
         fundoImg = new Image();
   fundoImg.src = "/images/fundo_2.avif"
    }  
}

function colisao(tiroX, tiroY, inimigoA, inimigoB) {
    //Esse cálculo matemático usa o Teorema de Pitágoras para medir a distância entre dois pontos em um plano cartesiano bidimensional.
    //Distancia = raiz de x2-x1 ao quadrado + y2 -y1 ao quadrado
   //(x1 e y1) representa a posição do tiro (tiroX, tiroY)
   //(x2, y2) Representa a posição do inimigo (inimigoA, inimigoB)
    let distancia = Math.sqrt(Math.pow(tiroX - inimigoA, 2) + Math.pow(tiroY - inimigoB, 2));
    // console.log(distancia)
   
    return distancia < 25;// se a distância for menor que 25 ele retorna a função com valor true;
}

function atualizar() {
    b += velocidadeQueda; // Move o inimigo para baixo
    aa += velocidademunicaoInimigo; // Move o tiro do inimigo 

    if (colisao(x, y, a, b)) {
        gameover();
        return;
    }

    if (aa>canvas.height){
        aa=1
    }

    if (b > canvas.height) {
        gameover();
        b = 0; // Reseta a posição vertical do objeto para o topo
        a = Math.random() * (canvas.width - 20) + 10; // Define uma nova posição horizontal aleatória
    }

    desenhar();
    requestAnimationFrame(atualizar);// O método requestAnimationFrame(atualizar) é usado para criar animações suaves em JavaScript, sincronizadas com a taxa de atualização da tela. Ele roda a aproximadamente 60 FPS (frames por segundo), proporcionando uma animação fluida.
}



function gameover() {
    document.querySelector('.content_jogo').innerHTML = '<div> <h1> GAME OVER </h1> </div>';
    alert('Voce prdeu')
}

// Detecta quando uma tecla é pressionada
window.addEventListener("keydown", function(event) {
    if (event.key === "ArrowUp" && y > 10) {
        y -= velocidade;
    } else if (event.key === "ArrowDown" && y < canvas.height - 10) {
        y += velocidade;
    } else if (event.key === "ArrowLeft" && x > 10) {
        x -= velocidade;
    } else if (event.key === "ArrowRight" && x < canvas.width - 10) {
        x += velocidade;
    } else if (event.key === "Enter") {
        // Cria um tiro na posição atual da nave
        tiros.push({ x: x, y: y });

        let somTiro = new Audio("/audio/laser.mp3");
        somTiro.volume = 0.7; // Ajusta o volume
        somTiro.currentTime = 2;
        somTiro.play();

        setTimeout(() => {
          somTiro.pause();
        }, 600); // Para o som após 200ms  
    }

    desenhar();
});

// Inicia a animação
fundoImg.onload = () => {
    atualizar();
};
