

function acerto () {
    somTiros.volume = 0.7; // Ajusta o volume
    somTiros.currentTime = 3.8;
    somTiros.play();
  
    setTimeout(() => {
      somTiros.pause();
    }, 600); // Para o som após 200m
  }
window.acerto = acerto