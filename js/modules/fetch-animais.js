import AnimaNumeros from './anima-numeros.js';

export default function fetchAnimais(url, target) {
  //Cria a div contendo o total de animais
  function createAnimal(animal){
    const div = document.createElement('div');
    div.classList.add('numero-animal');  
    div.innerHTML = `<h3>${animal.especie}</h3><span data-numero>${animal.total}</span>`;
    return div
  }

  //preenche cada animal no dom
  const numeroGrid = document.querySelector(target);
  function preencherAnimais(animal){
    const divAnimal = createAnimal(animal);
    numeroGrid.appendChild(divAnimal);
  }

  //anima os números de cada animal
  function animaAnimaisNumeros(){
    const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
    animaNumeros.init();
  }

  //Puxa os animais através de um arquivo .json
  //e cria cada animal utilizando createAnimal
  async function criarAnimais(){
    try {
      //fetch, espera a resposta e transforma e json
      const animaisResponse = await fetch(url);
      const animaisJson = await animaisResponse.json(); 

      //após transformar em json, ativam as funções para preencher e animar os números
      animaisJson.forEach(animal => preencherAnimais(animal));
      animaAnimaisNumeros();
    
    } catch(erro) {
        console.log(erro)
    }
  } 

  return criarAnimais();
}

