(function(win, doc) {
  'use strict';
  /*
  Nossa calculadora agora está funcional! A ideia desse desafio é modularizar
  o código, conforme vimos na aula anterior. Quebrar as responsabilidades
  em funções, onde cada função faça somente uma única coisa, e faça bem feito.
  - Remova as duplicações de código;
  - agrupe os códigos que estão soltos em funções (declarações de variáveis,
  listeners de eventos, etc);
  - faça refactories para melhorar esse código, mas de forma que o mantenha com a
  mesma funcionalidade.
  */

  var $visor, $buttonsNumbers, $buttonsOperations, $buttonCE, $buttonEqual;

  function initialize() {
    setMyHTMLItensAsJSElements();
    initEvents();
  }

  function setMyHTMLItensAsJSElements() {
    $visor = doc.querySelector('[data-js="visor"]');
    $buttonsNumbers = doc.querySelectorAll('[data-js="button-number"]');
    $buttonsOperations = doc.querySelectorAll(
      '[data-js="button-operation"]'
    );
    $buttonCE = doc.querySelector('[data-js="button-ce"]');
    $buttonEqual = doc.querySelector('[data-js="button-equal"]');
  }

  function initEvents() {
    addEventListenerButton($buttonsNumbers, handleClickNumber);
    addEventListenerButton($buttonsOperations, handleClickOperation);
    addEventListenerButton($buttonCE, handleClickCE, true);
    addEventListenerButton($buttonEqual, handleClickEqual, true);
  }
  
  function addEventListenerButton(buttonName, doThis, onlyOneButton) {
    onlyOneButton
      ? buttonName.addEventListener('click', doThis, false)
      : (Array.prototype.forEach.call(buttonName, function (button) {
          button.addEventListener('click', doThis, false);
        }));
  }

  function getOperations() {
    return Array.prototype.map.call($buttonsOperations, function(button) {
      return button.value;
    });
  }

  function getRegexOperations() {
    return new RegExp('\\d+[' + getOperations().join('') + ']?', 'g');
  }

  function getLastOperator(value) {
    return isLastItemAnOperation(value) ? value.split('').pop() : '';
  }

  function isLastItemAnOperation(number) {
    var operations = getOperations();
    var lastItem = number.split('').pop();

    return operations.some(function (operator) {
      return operator === lastItem;
    });
  }

  function removeLastItemIfItIsAnOperator(string) {
    if (isLastItemAnOperation(string)) 
      return string.slice(0, -1);
    
    return string;
  }

  function calculator(accumulated, actual) {
    var firstValue = accumulated.slice(0, -1);
    var operator = accumulated.split('').pop();
    var lastValue = removeLastItemIfItIsAnOperator(actual);
    var lastOperator = getLastOperator(actual)
    
    return doThisOperation(operator, firstValue, lastValue) + lastOperator;
  }

  function doThisOperation(operator, firstValue, lastValue, lastOperator) {
    switch (operator) {
      case '+':
        return Number(firstValue) + Number(lastValue);
      case '-':
        return Number(firstValue) - Number(lastValue);
      case 'x':
        return Number(firstValue) * Number(lastValue);
      case '÷':
        return Number(firstValue) / Number(lastValue);
    }
  }

  function handleClickNumber() {
    $visor.value += this.value;
  }

  function handleClickOperation() {
    $visor.value = removeLastItemIfItIsAnOperator($visor.value);
    $visor.value += this.value;
  }

  function handleClickCE() {
    $visor.value = 0;
  }

  function handleClickEqual() {
    $visor.value = removeLastItemIfItIsAnOperator($visor.value);
    var allValues = $visor.value.match(getRegexOperations());
    $visor.value = allValues.reduce(calculator);
  }

  initialize();
})(window, document);