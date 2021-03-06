(function(win, doc) {
  'use strict';
  /*
  Essa semana você terá dois desafios:
  1) Revisar todo o contéudo passado até aqui, e ver se você realmente entendeu
  tudo o que foi passado! Se tiver dúvidas, anote, e então abra issues,
  ou comente no seu pull request mesmo, que eu irei ajudá-lo a entender
  o que não ficou tão claro das aulas anteriores.
  É essencial que você entenda todo o conteúdo que foi passado até aqui,
  para que possamos prosseguir para a parte mais avançada do curso :D
  2) Estudar eventos!
  Acesse a página do MDN:
  https://developer.mozilla.org/en-US/docs/Web/Events#Categories
  Tente aplicar na prática alguns dos eventos que estão ali e coloque nesse
  desafio os experimentos legais que você conseguir desenvolver :D
  */

  var $divPlane = doc.querySelector('[data-js="animationPlane"]');
  $divPlane.style.display = 'none';

  function on(element, event, callback) {
    doc.querySelector(element)
      .addEventListener(event, callback, false);
  }

  on('[data-js="link"]', 'dblclick', function(event) {
    event.preventDefault();
    alert('Você deu um clique duplo no a');
  });

  on('[data-js="p"]', 'mouseover', function() {
    alert('Você passou o mouse por cima do p');
  })

  on('[data-js="p-copy"]', 'copy', function() {
    alert('Você copiou o texto do p');
  })

  on('[data-js="button"]', 'click', function() {
    $divPlane.style.display = 'block'
  })

  on('[data-js="plane"]', 'animationstart', function() {
    alert('Prepare-se para ver o avião!');
  })

  on('[data-js="plane"]', 'animationend', function() {
    alert('O avião já passou');
    $divPlane.style.display = 'none'
  })

})(window, document);