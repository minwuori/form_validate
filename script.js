var form;

function formValidation() {

  form = {
    quest1: {},
    quest2: {},
    quest3: {}
  }

  var quests = document.querySelectorAll(".quest");
  var errorMessage = document.querySelectorAll(".errorMessage");
  for (var a = 0; a <errorMessage.length; a++){ //очистить ошибки
    errorMessage[a].style.display = 'none';
  }

  for (var i = 0; i < quests.length; i++) { //перебор вопросов 
    var options = quests[i].querySelectorAll('.option');
    var textAnswerAnother = quests[i].querySelector(".text-answer-another");
    var numberQuest = 'quest' + quests[i].getAttribute("data-quest");

    for (var j = 0; j < options.length; j++) { //перебор вариантов ответов

      if (options[j].checked) {
        var nameOption = 'option' + options[j].getAttribute('data-option'); // записать чекнутый вариант в объект
        
        if (options[j].classList.contains('checkbox-another')) {
          form[numberQuest][nameOption]  = textAnswerAnother.value; //записать значение поля "другое" в объект
          console.log('вопрос ' + quests[i].getAttribute("data-quest") + ':   ' + textAnswerAnother.value); 
        } else {
          form[numberQuest][nameOption]  = true; 
          console.log('вопрос ' + quests[i].getAttribute("data-quest") + ': ' + options[j].parentNode.innerText); 
        }
      }
    }

    var textAnswer = quests[i].querySelector(".text-answer"); //условие для вопроса без вариантов выбора
    if (textAnswer != null) {
      form[numberQuest].option1 = textAnswer.value; //записать значение поля в объект
      console.log('вопрос ' + quests[i].getAttribute("data-quest") + ':   ' + textAnswer.value);
    }

    form[numberQuest].errorEmpty = quests[i].querySelector('.error-empty-field');
    form[numberQuest].errorCheck = quests[i].querySelector('.error-non-check');
  }

  for (questName in form) {//непосредственно валидация формы

    var flagError = true;
    
    for (optionName in form[questName]) { //переборка вариантов в вопросе для вывода соответствующих ошибок
      //console.log("quest:" + questName + " option: " + optionName + " value: " + form[questName][optionName]);
      if (form[questName][optionName] === '' && form[questName].errorEmpty) {
        form[questName].errorEmpty.style.display = 'block';
        flagError = false;
        break;
      } 

      if (form[questName][optionName]  && optionName.indexOf("error") == -1) {
        flagError = false;
      }
    } 
    
    if (flagError && form[questName].errorCheck ) {
        form[questName].errorCheck.style.display = 'block';
    }
  }
  console.log(form);
}

var send = document.querySelector('button[type=button]');
send.addEventListener('click', formValidation);