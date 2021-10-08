(function() {
  'use strict';
/*
  No HTML:
  - Crie um formulário com um input de texto que receberá um CEP e um botão
  de submit;
  - Crie uma estrutura HTML para receber informações de endereço:
  "Logradouro, Bairro, Estado, Cidade e CEP." Essas informações serão
  preenchidas com os dados da requisição feita no JS.
  - Crie uma área que receberá mensagens com o status da requisição:
  "Carregando, sucesso ou erro."
  No JS:
  - O CEP pode ser entrado pelo usuário com qualquer tipo de caractere, mas
  deve ser limpo e enviado somente os números para a requisição abaixo;
  - Ao submeter esse formulário, deve ser feito um request Ajax para a URL:
  "https://viacep.com.br/ws/[CEP]/json/", onde [CEP] será o CEP passado
  no input criado no HTML;
  - Essa requisição trará dados de um CEP em JSON. Preencha campos na tela
  com os dados recebidos.
  - Enquanto os dados são buscados, na área de mensagens de status, deve mostrar
  a mensagem: "Buscando informações para o CEP [CEP]..."
  - Se não houver dados para o CEP entrado, mostrar a mensagem:
  "Não encontramos o endereço para o CEP [CEP]."
  - Se houver endereço para o CEP digitado, mostre a mensagem:
  "Endereço referente ao CEP [CEP]:"
  - Utilize a lib DOM criada anteriormente para facilitar a manipulação e
  adicionar as informações em tela.
*/
  function DOM(elements) {
    this.element = document.querySelectorAll(elements);
  }

  DOM.prototype.on = function on(eventType, callback) {
    Array.prototype.forEach.call(this.element, function(element) {
      element.addEventListener(eventType, callback, false)
    });
  };

  DOM.prototype.off = function off(eventType, callback) {
    Array.prototype.forEach.call(this.element, function(element) {
      element.removeEventListener(eventType, callback, false)
    });
  };

  DOM.prototype.get = function get() {
    return this.element;
  };

  DOM.prototype.forEach = function forEach() {
    return Array.prototype.forEach.apply(this.element, arguments);
  };

  DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.element, arguments);
  };

  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.element, arguments);
  };

  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.element, arguments);
  };

  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  };

  DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.element, arguments);
  };

  DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.element, arguments);
  };

  DOM.isArray = function isArray (param) {
    return Object.prototype.toString.call(param) === '[object Array]';
  };

  DOM.isObject = function isObject (param) {
    return Object.prototype.toString.call(param) === '[object Object]';
  };

  DOM.isFunction = function isFunction (param) {
    return Object.prototype.toString.call(param) === '[object Function]';
  };

  DOM.isNumber = function isNumber (param) {
    return Object.prototype.toString.call(param) === '[object Number]';
  };

  DOM.isString = function isString (param) {
    return Object.prototype.toString.call(param) === '[object String]';
  };

  DOM.isBoolean = function isBoolean (param) {
    return Object.prototype.toString.call(param) === '[object Boolean]';
  };

  DOM.isNull = function isNull (param) {
    return Object.prototype.toString.call(param) === '[object Null]' ||
      Object.prototype.toString.call(param) === '[object Undefined]';
  };

  var ajax = new XMLHttpRequest();

  var $formCEP = new DOM('[data-js="form-cep"]');
  var $inputCEPSubmit = new DOM('[data-js="input"]');
  var $inputLogradouro = new DOM('[data-js="input-logradouro"]');
  var $inputBairro = new DOM('[data-js="input-bairro"]');
  var $inputEstado = new DOM('[data-js="input-estado"]');
  var $inputCidade = new DOM('[data-js="input-cidade"]');
  var $inputCEP = new DOM('[data-js="input-cep"]');
  var $status = new DOM('[data-js="status"]');

  $formCEP.on('submit', handleSubmitForm);

  function handleSubmitForm(e) {
    e.preventDefault();
    var url = getURL();
    ajax.open('GET', url, true);
    ajax.send();
    getMessage('loading');
    ajax.addEventListener('readystatechange', handleReadyStateChange);
  }

  function getURL() {
    return replaceCEP('https://ws.apicep.com/cep/[CEP].json')
  }

  function getResponse() {
    var data = parseData();
    if(!data) {
      getMessage('error');
      data = clearData();
    }

    $inputLogradouro.get()[0].value = data.address;
    $inputBairro.get()[0].value = data.district;
    $inputEstado.get()[0].value = data.state;
    $inputCidade.get()[0].value = data.city;
    $inputCEP.get()[0].value = data.code;
  }

  function clearData() {
    return {
      address: '-',
      district: '-',
      state: '-',
      city: '-',
      code: '-'
    };
  }

  function getMessage (type) {
    var messages = {
      loading: 'Buscando informações para o CEP [CEP]...',
      ok: 'Endereço referente ao CEP [CEP]',
      error: 'Não encontramos o endereço para o CEP [CEP].'
    };

    $status.get()[0].innerText = replaceCEP(messages[type]);
  }

  function parseData () {
    var result = JSON.parse(ajax.responseText);
    return result.erro ? null : result;
  }

  function isRequestOk () {
    return ajax.readyState === 4 && ajax.status === 200;
  }

  function isCEPInvalid () {
    return ajax.readyState === 4 && ajax.status === 0;
  }

  function handleReadyStateChange() {
    if(isRequestOk()) {
      getMessage('ok');
      getResponse();
    }

    if(isCEPInvalid()) {
      getMessage('error');
    }
  }

  function replaceCEP (message) {
    return message.replace('[CEP]', clearCEP());
  }

  function clearCEP () {
    return $inputCEPSubmit.get()[0].value.replace(/\D+/g, '');
  }

  // console.log($teste.get()[0].innerText);

})();