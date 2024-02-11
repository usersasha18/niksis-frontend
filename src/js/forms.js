const MAX_LENGTH = 30;
const MIN_LENGTH = 3;
let canSend = false;

window.addEventListener('DOMContentLoaded', function () {
    //нашел nodeList с кнопками и прошелся циклом по всем кнопкам и получил элементы
    const buttons = document.querySelectorAll('button');
    for(let buttonEl of buttons ) {
        validateForm(buttonEl);
        addCities(true , buttonEl.closest('form'));
    }
    function validateInput(input) {
        let value = input.value;
        // тут мне нужно создать конструкцию свитч кейс, которая будет проветрять взависимости
        // названия свойства name валидность введенных данных
        if (!value) {
            input.placeholder = "поле не должно быть пустым";
            return false;
        }

        switch (input.name) {
            case 'name':
                // в этом место нужно проверить валидность логина
                // match - находит совпадение
                const regName = /[^а-яё\d\-\s]/gi;

                if(input.value.length <= MIN_LENGTH) {
                    input.placeholder = "имя не может быть меньше трех букв";
                    return false;
                }

                if (value.match(regName)) {
                    input.value = ""
                    input.placeholder = "Имя на русском";
                    return false;
                }
                else {
                    input.placeholder = input.name;
                    return input.value;
                }
                    break;
            case 'login':
                    // в эт
                    if(input.value.length <= MIN_LENGTH) {
                        input.placeholder = "имя не может быть меньше трех букв";
                        return false;
                    }

                    if (value.match(reg)) {
                        input.value = ""
                        input.placeholder = "Имя на русском";
                        return false;
                    }
                    else {
                        input.placeholder = input.name;
                        return input.value;
                    }
                break;
            case 'email':
                    // в этом место нужно проверить валидность электронного адреса
                    const regEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
                    if (!value.match(regEmail)) {
                        input.value = ""
                        input.placeholder = "Введите корректный email";
                        return false;
                    }
                    else {
                        input.placeholder = input.name;
                        return input.value;
                    }
                break;
            case 'tel':
                    // в этом место нужно проверить валидность телефона
                    const min = 10,
                        max = 11;
                    const regTel = /^([+]?[0-9\s-\(\)]{3,25})*$/i;

                    if (input.value.length < min || input.value.length > max) {
                        input.value = "";
                        input.placeholder = 'неверный номер';
                        return false;
                    }

                    if (!value.match(regTel)) {
                        input.value = "";
                        input.placeholder = "Введите корректный номер телефона";
                        return false;
                    }
                    else {
                        input.placeholder = input.name;
                        return input.value;
                    }
                break;
            case 'cities':
                if (input.value) {
                    return input.value;
                }
                break;
            case "message":
                if (input.value) {
                    return input.value
                }
            default:
                if(input.value.length <= MIN_LENGTH) {
                    input.placeholder = "инофрмация должна быть более трех букв";
                    return false;
                }
                if (input.value.length > MAX_LENGTH) {
                    input.placeholder = "информация должно быть меньше 30 букв";
                    return false;
                }
        }
    }

    function validateForm(buttonEl) {
        buttonEl.addEventListener('click', (event) => {
            // отмена объявления формы на странице

            event.preventDefault();
            const inputForms = buttonEl.closest('form');
            // объект, в который будут заноситься name с инпутов в качестве свойств
            const check = {};


            // при нажатии на кнопку нахожу все инпуты с атрибутом name внутри формы
            const dirtyInputs = Array.from(inputForms.querySelectorAll('[name]'));

            // цикл, который проходит по всем инпутам и добавляет в объект свойство name инпута
            for (let input of  dirtyInputs ) {
                check[input.name] = validateInput(input);
                if(!check[input.name]) canSend = false;
            }
            console.log(check);
            validateData(check, buttonEl)

        })


    }
    function addCities(boolean, domForm) {
           if(!boolean) return false;
           const select = domForm.querySelector('[name="cities"]');
           const citiesList = [];


           fetch('https://api.hh.ru/areas')
               .then(res => res.json())
               .then(data => {
                   const regionCity= data[0].areas[27].areas
                       for(let cityName of regionCity) {
                           citiesList.push(cityName.name)
                       }
                       for (let i = 0; i < citiesList.length; i++) {
                           let optionElement = document.createElement('option');
                           optionElement.text += citiesList[i];
                           select?.appendChild(optionElement);
                       }
               })

       }
})

 function validateData(obj, button) {
    let isValid = true;
     for( let key in obj ) {
        if(!obj[key]){
            console.log("не все данные заполнены");
            isValid = false;
            break; // Выходим из цикла, если хотя бы одно поле не заполнено
        } else {
            console.log('данные готовы к отправке')
        }
     }
     if (isValid) {
        console.log('Данные готовы к отправке');
        sendDateForm(obj, button);
      }
 }

 function sendDateForm(value, button) {
    console.log(value)
    console.log(JSON.stringify(value));
  
    fetch('http://localhost:3000/submit-form', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json' // Указываем тип содержимого
      },
      body: JSON.stringify(value),
    })
      .then((response) => {
        if (response.ok) {
          // Успешный ответ от сервера
          console.log('Данные успешно отправлены');
          // Вызов функции showWindow(button) или любой другой логики
        } else {
          // Ошибка на сервере
          console.log('Ошибка на сервере');
        }
      })
      .catch((error) => {
        // Ошибка сети или другие ошибки
        console.log(error);
      });
  }

function showWindow(button) {

    const closeClass = document.querySelector('.closedForm');

    closeClass.classList.add('hidden');

    setTimeout(() => {
        closeClass.classList.remove('hidden')
    }, 2000)

}