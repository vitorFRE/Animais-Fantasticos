import AnimaNumeros from './anima-numeros.js';

export default function fetchAnimais(url, target) {
  // cria a div contendo informações
  // com o total de animais
  function createAnimal(animal) {
    const div = document.createElement('div');
    div.classList.add('numero-animal');
    div.innerHTML = `<h3>${animal.specie}</h3><span data-numero>${animal.total}</span>`;
    return div;
  }

  // preenche cada animal no dom
  const numerosGrid = document.querySelector(target);
  function preencherAnimais(animal) {
    const divAnimal = createAnimal(animal);
    numerosGrid.appendChild(divAnimal);
  }

  // anima os numeros de cada animal
  function animaAnimaisNumero() {
    const animaNumeros = new AnimaNumeros('[data-numero]', '.numeros', 'ativo');
    animaNumeros.init();
  }

  // puxa os animais atraves de um arquivo json
  // e cria cada animal utilando o create animal
  async function criarAnimais() {
    try {
      // fetch espera resposta
      const animaisResponse = await fetch(url);
      // transforma a resposta em json
      const animaisJSON = await animaisResponse.json();
      animaisJSON.forEach((animal) => {
        preencherAnimais(animal);
      });
      animaAnimaisNumero();
    } catch (erro) {
      console.log(erro);
    }
  }

  return criarAnimais();
}
