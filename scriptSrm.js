
window.addEventListener('DOMContentLoaded', () => {new App()})


class App {

    constructor(){
        this.url = 'http://localhost:3000'

        this.objData = []

        this.querySelectors()   // поиск всех тегов по селектору
        this.addListeners()  // функция вешает слушатели событий
        this.newSelect()
        this.getApi() // при загрузке страницы получает данные клиентов в сервера
        this.filterId()
        this.filterCreate()
        this.filterUpdate()
        this.filterFio()
        this.listenerSearch()
    }



    getApi(){
      this.loading();
      setTimeout(() => {
        return fetch(this.url + '/api/clients')
        .then(clients => clients.json())
        .then(clients => clients.forEach(item => this.createCard(item))) //вызов функции создания карточки
      }, 1000)
    }

    // функция включает (убирает none) со спинера
    loading(){
      setTimeout(() => {
         this.loadingItem = document.querySelector('.loading')
         this.loadingItem.classList.add('none')
        }, 1000);
     }

    // функция удаление старых карточек с дисплея
    delFromDisplay(){
      console.log("Удаление");
      this.cards = document.querySelectorAll('.card-display')
      this.arr = Array.from(new Set(this.copyArrClient));
      this.cards.forEach(i => i.remove());
    }

    // функция анимации загрузки
    loadElement(){
      this.delFromDisplay()
      this.loadingItem = document.querySelector('.loading')
      this.loadingItem.classList.remove('none')
    }

    // функция отправки данных на сервер
    postData(body){
        return fetch(this.url + '/api/clients', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify(body)
        }).then(responce => responce.json())

    }

    // функция удаления данных с сервера
    deleteCard(id){
    return fetch(this.url + '/api/clients/' + id, {
        method : 'DELETE',
        body: JSON.stringify()
    })
    }

    // функция изменения данных на сервере
    editCard(body, id){
    return fetch(this.url + '/api/clients/' + id, {
        method : 'PATCH',
        headers : {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(body)
    })
    }

    // функция клиента данных на сервере
    listenerSearch() {
        this.searchClient.addEventListener('input', () => {
          clearTimeout(this.id);

          this.id = setTimeout(() => {
            fetch(`http://localhost:3000/api/clients?search=${this.searchClient.value}`)
                .then(client => client.json())
                // .then(client => console.log('TEST', client))
                .then(client => {

                // удаление старых карточек с дисплея
                this.delFromDisplay()
                this.createCard(client[0])

                // при очищении инпута - выгружаются все карточки
                if (this.searchClient.value == 0 ) {
                  // очищаю дисплей
                  this.delFromDisplay()
                  // онимация загрузки
                  this.loadElement();
                  // получение карточек клиентов с сервера
                  this.getApi()
                }
                })
          }, 1000);
        })



    }

    // функция получения данных из инпута нового клиента, которая возвращает объект с данными
    getDataInput(){
      this.obj = {};
      this.arrVal = [];
      this.arrSel = [];
      this.arrContacts = [];
      this.inpNC = document.querySelectorAll('.inp-add_number');
      this.select = document.querySelectorAll('.select-add_contact');
      this.inpNC.forEach(element => this.arrVal.push(element.value));
      this.select.forEach(element => this.arrSel.push(element.value));
      console.log(this.arrVal);
      console.log(this.arrSel);
      for (let i = 0; i < this.arrSel.length; i++) {

      this.arrContacts.push(
      {
          type: this.arrSel[i],
          value: this.arrVal[i],
      }
      )
      }
      this.obj.name = this.inputNameNewForm.value;
      this.obj.surname = this.inputSurnameNewForm.value;
      this.obj.lastName = this.inputLastnameNewForm.value;
      this.obj.contacts = this.arrContacts;

      // отправка (изменение) данных на сервер
      this.postData(this.obj);
    }

    querySelectors(){
        this.disabled = document.querySelector('.disabled_main');
        this.modalCreate = document.querySelector('.modal');
        this.modalNew = document.querySelector('.modal-new-client');
        this.modalDel= document.querySelector('.modal-del-client');
        this.form = document.querySelector('.modal-form')
        this.formInputEdit = document.querySelector('.modal-form-edit')
        this.inputName = document.querySelector('.name')
        this.inputSurname = document.querySelector('.surname')
        this.inputLastname = document.querySelector('.lastname')
        this.inputName = document.querySelector('.name')
        this.inputNameNewForm = document.querySelector('.name-new')
        this.inputSurnameNewForm = document.querySelector('.surname-new')
        this.inputLastnameNewForm = document.querySelector('.lastname-new')
        this.inputNameEditForm = document.querySelector('.name-edit')
        this.inputSurnameEditForm = document.querySelector('.surname-edit')
        this.inputLastnameEditForm = document.querySelector('.lastname-edit')
        this.addClientBtn = document.querySelector('.add-btn')
        this.searchClient = document.querySelector('.nav__inp')
        this.ul = document.querySelector('.actions')
        this.btnSave = document.querySelector('.save')
        this.btnSaveNewClient = document.querySelector('.save_new-client')
        this.delClient = document.querySelector('.del')
        this.addContactBtn = document.querySelector('.bt-plus')
        this.openDelForm = document.querySelector('.open-del-form')
        this.addNumber = document.querySelector('.add-number-input-cont')
        this.contForAddContacts = document.querySelector('.cont-for-addContact')
        this.contForEditContacts = document.querySelector('.cont-for-editContact')
        this.testBtn = document.querySelector('.test-btn')
        this.display = document.querySelector('.display')
        this.delClientOperation = document.querySelector('.modal-del-client')
        this.cancelModalNewClient = document.querySelector('.del-cancel-x-new')
        this.editModalCancel = document.querySelector('.del-cancel-x-edit')
        this.btnSaveEditForm = document.querySelector('.save_edit-client')
        this.editContactBtn = document.querySelector('.plus-edit-form')
        this.canselDelForm = document.querySelector('.del-cancel')
        this.canselDelFormBtn = document.querySelector('.del-cancel-x')
        this.arrDown = document.querySelector('.arr-down')
        this.arrDownFio = document.querySelector('.arr-down-fio')
        this.arrDownCreate = document.querySelector('.arr-down-create')
        this.arrDownUpdate = document.querySelector('.arr-down-update')
        this.filterArrowId = document.querySelector('.filter-id')
        this.filterArrowFio = document.querySelector('.filter-fio')
        this.filterArrowCreate = document.querySelector('.filter-create')
        this.filterArrowUpdate = document.querySelector('.filter-update')


    }

    // функция сортироваки карточек по id
    filterId(){
        this.filterArrowId.addEventListener('click', () => {
            // console.log(this.objData);
            this.copyArrClient = this.objData.slice()
            // console.log(this.copyArrClient);

            if  (this.filterArrowId.id == 'down') {
                this.arrDown.classList.remove('filter-arrow-down')
                this.arrDown.classList.add('filter-arrow-up')
                this.filterArrowId.id = 'up'
                this.cards = document.querySelectorAll('.card-display')

                //удаление старых карточек с дисплея
                this.delFromDisplay()

                this.sortById =  this.arr.sort((a, b) => {
                      return  b.id -  a.id
                  }
                  );
                this.sortById.forEach(item => this.createCard(item))
                //   console.log(this.copyArrClient);
            }

            else if (this.filterArrowId.id == 'up') {
                this.arrDown.classList.remove('filter-arrow-up')
                this.arrDown.classList.add('filter-arrow-down')
                this.filterArrowId.id = 'down'
                this.cards = document.querySelectorAll('.card-display')

                //удаление старых карточек с дисплея
                this.delFromDisplay()
                this.sortById =  this.arr.sort((a, b) => {
                      return  a.id -  b.id
                  }
                  );
                this.sortById.forEach(item => this.createCard(item))
                //   console.log(this.copyArrClient);
            }
        })

    }

    // функция сортироваки карточек по id
    filterFio(){
        this.filterArrowFio.addEventListener('click', () => {
            this.copyArrClient = this.objData.slice()

            if  (this.filterArrowFio.id == 'down-fio') {
                this.arrDownFio.classList.remove('filter-arrow-down')
                this.arrDownFio.classList.add('filter-arrow-up')
                this.filterArrowFio.id = 'up-fio'
                this.cards = document.querySelectorAll('.card-display')

                //удаление старых карточек с дисплея
                this.delFromDisplay()

                this.arr.map(elem => {
                   elem.alph = elem.surname[0]

                })
                console.log(this.arr);

                this.sortById = this.arr.sort((a, b) => a.alph > b.alph ? 1 : -1);
                console.log(this.sortById);

                this.sortById.forEach(item => this.createCard(item))
            }

            else if (this.filterArrowFio.id == 'up-fio') {
                this.arrDownFio.classList.remove('filter-arrow-up')
                this.arrDownFio.classList.add('filter-arrow-down')
                this.filterArrowFio.id = 'down-fio'
                this.cards = document.querySelectorAll('.card-display')

                //удаление старых карточек с дисплея
                this.delFromDisplay()
                this.arr.map(elem => {
                    elem.alph = elem.surname[0]

                 })
                this.sortById =  this.arr.sort((a, b) => b.alph > a.alph ? 1 : -1);
                this.sortById.forEach(item => this.createCard(item))
            }
        })

    }

    // функция сортироваки карточек по дате создания
    filterCreate(){
        this.filterArrowCreate.addEventListener('click', () => {
            this.copyArrClient = this.objData.slice();
            console.log(this.copyArrClient);
            if  (this.filterArrowCreate.id == 'down-create') {
                this.arrDownCreate.classList.remove('filter-arrow-down');
                this.arrDownCreate.classList.add('filter-arrow-up');
                this.filterArrowCreate.id = 'up-create';
                this.cards = document.querySelectorAll('.card-display');

                //удаление старых карточек с дисплея
                this.delFromDisplay()

                this.arr.map(elem => {
                    elem.createdAt = new Date(elem.createdAt);
                })
                this.sortById =  this.arr.sort((a, b) => {
                      return b.createdAt - a.createdAt
                  });
                this.sortById.forEach(item => this.createCard(item));
            }

            else if (this.filterArrowCreate.id == 'up-create') {
                this.arrDownCreate.classList.remove('filter-arrow-up');
                this.arrDownCreate.classList.add('filter-arrow-down');
                this.filterArrowCreate.id = 'down-create';
                this.cards = document.querySelectorAll('.card-display');

                //удаление старых карточек с дисплея
                this.delFromDisplay()

                this.arr.map(elem => {
                    elem.createdAt = new Date(elem.createdAt);
                })
                this.sortById =  this.arr.sort((a, b) => {
                      return a.createdAt - b.createdAt
                  });
                this.sortById.forEach(item => this.createCard(item));
            }
        })

        }

    // функция сортироваки карточек по дате изменения
    filterUpdate(){
        this.filterArrowUpdate.addEventListener('click', () => {
            this.copyArrClient = this.objData.slice();
            console.log(this.copyArrClient);

            if  (this.filterArrowUpdate.id == 'down-update') {
                this.arrDownUpdate.classList.remove('filter-arrow-down');
                this.arrDownUpdate.classList.add('filter-arrow-up');
                this.filterArrowUpdate.id = 'up-update';
                this.cards = document.querySelectorAll('.card-display');

                //удаление старых карточек с дисплея
                this.delFromDisplay()

                this.arr.map(elem => {
                   return elem.updatedAt = new Date(elem.updatedAt);
                })
                this.sortById =  this.arr.sort((a, b) => {
                      return b.updatedAt - a.updatedAt
                  });
                this.sortById.forEach(item => this.createCard(item));
            }

            else if (this.filterArrowUpdate.id == 'up-update') {
                this.arrDownUpdate.classList.remove('filter-arrow-up');
                this.arrDownUpdate.classList.add('filter-arrow-down');
                this.filterArrowUpdate.id = 'down-update';
                this.cards = document.querySelectorAll('.card-display');

                //удаление старых карточек с дисплея
                this.delFromDisplay()

                this.arr.map(elem => {
                    return elem.updatedAt = new Date(elem.updatedAt);
                })
                this.sortById =  this.arr.sort((a, b) => {
                      return a.updatedAt - b.updatedAt
                  });
                this.sortById.forEach(item => this.createCard(item));
            }
        })

    }

    // функция конструктора карточки на дисплее
    createCard(data){

        console.log(data);

        // помещаю входящие с сервера данные в массив с объектами
        this.objData.push(data);
        this.dataUpdate = new Date(data.updatedAt)
        this.dataCreate = new Date(data.createdAt)

        // создаю на дисплее карточку с данными клиента
        this.card = document.createElement('div');
        this.card.classList.add('card-display')
        this.display.append(this.card)

        this.dateCreate = document.createElement('p');
        this.timeCreate = document.createElement('p');
        this.dateChange = document.createElement('p');
        this.timeChange = document.createElement('p');
        this.btnEditCard = document.createElement('p');
        this.btnDelCard = document.createElement('p');
        this.iconsDisplay = document.createElement('div');
        this.actionsDisplay = document.createElement('div');
        this.blockCreateDate = document.createElement('div');
        this.blockChangeDate = document.createElement('div');
        this.idtoDisplay = document.createElement('p');
        this.fioToDisplay = document.createElement('p');

        this.actionsDisplay.classList.add('actions_display');
        this.blockChangeDate.classList.add('time-div');
        this.blockChangeDate.classList.add('time-of-create');
        this.blockChangeDate.classList.add('changes-d');
        this.blockCreateDate.classList.add('time-div');
        this.blockCreateDate.classList.add('time-of-changes');
        this.blockCreateDate.classList.add('create-d');
        this.dateCreate.classList.add('create-d');
        this.timeCreate.classList.add('create-time');
        this.dateChange.classList.add('changes-d');
        this.timeChange.classList.add('changes-time');
        this.timeChange.classList.add('time');
        this.timeCreate.classList.add('time');
        this.btnEditCard.classList.add('changes-p-btn');
        this.btnDelCard.classList.add('del-p-btn');
        this.iconsDisplay.classList.add('icons_display');
        this.idtoDisplay.classList.add('id');
        this.fioToDisplay.classList.add('fio');

        this.iconsEdit = document.createElement('div')
        this.iconsEdit.classList.add('icon-edit')
        this.iconsDEl = document.createElement('div')
        this.iconsDEl.classList.add('icon-cancel')

        this.btnEditCard.textContent = "Изменить"
        this.btnDelCard.textContent = "Удалить"

        this.dateCreate.innerHTML = `${this.dataCreate.toString().split('').slice(4, 10).join('')}`
        this.timeCreate.innerHTML = `${this.dataCreate.toString().split('').slice(15, 21).join('')}`
        this.dateChange.innerHTML = `${this.dataUpdate.toString().split('').slice(4, 10).join('')}`
        this.timeChange.innerHTML = `${this.dataUpdate.toString().split('').slice(15, 21).join('')}`
        this.idtoDisplay.innerHTML = `${data.id.toString().split('').slice(5, data.id.length-1).join('')}`
        this.fioToDisplay.innerHTML = `${data.surname} ${data.name} ${data.lastName}`


        for (let i = 0; i < data.contacts.length; i++ ) {

            // в этот контейнер будет помещен контейнер для иконки и всплывающее окно с информацией
            this.contForModalAndIcons = document.createElement('div')


            // icons - контейнер для иконки контакта
            this.icons = document.createElement('div');
            this.icons.classList.add('icons-cont');
            // console.log(data.contacts[i].type);
            this.icons.innerHTML =`<img class="icons-card icon-ph" src="./img/${data.contacts[i].type}.png" alt="">`;

            // модальное окно с информацией, которое будет всплывать
            this.modlaIcons = document.createElement('div');
            // this.modlaIcons.classList.add('none');

            //поместил иконку и модальное в контейнер
            this.contForModalAndIcons.append(this.icons);
            this.contForModalAndIcons.append(this.modlaIcons);
            this.contForModalAndIcons.classList.add('cont-icons')
            this.modlaIcons.classList.add('info');
            this.modlaIcons.classList.add('none');

            // iconsDisplay - контейнер для всех иконок внутри карточки клиента
            this.iconsDisplay.append(this.contForModalAndIcons);

            this.contForModalAndIcons.addEventListener('mousemove', (e) => {
              e.currentTarget.querySelector('.info').classList.remove('none');
              data.contacts[i].type == "VK" ? e.currentTarget.querySelector('.info').innerHTML = `Вконтакте: ${data.contacts[i].value}` : false;
              data.contacts[i].type == "Facebook" ? e.currentTarget.querySelector('.info').innerHTML = `Фэйсбук: ${data.contacts[i].value}` : false;
              data.contacts[i].type == "number" ? e.currentTarget.querySelector('.info').innerHTML = `Телефон: ${data.contacts[i].value}` : false;
              data.contacts[i].type == "Email" ? e.currentTarget.querySelector('.info').innerHTML = `Почты: ${data.contacts[i].value}` : false;

          })

          this.contForModalAndIcons.addEventListener('mouseout', (e) => {
              e.currentTarget.querySelector('.info').classList.add('none');

          })

        }

        this.card.append(this.idtoDisplay);
        this.card.append(this.fioToDisplay);
        this.card.append(this.blockCreateDate);
        this.card.append(this.blockChangeDate);
        this.card.append(this.iconsDisplay);
        this.card.append(this.actionsDisplay);
        this.blockCreateDate.append(this.dateCreate);
        this.blockCreateDate.append(this.timeCreate);
        this.blockChangeDate.append(this.dateChange);
        this.blockChangeDate.append(this.timeChange);
        this.actionsDisplay.append(this.iconsEdit);
        this.actionsDisplay.append(this.btnEditCard);
        this.actionsDisplay.append(this.iconsDEl);
        this.actionsDisplay.append(this.btnDelCard);

        // вызов меню подтверждения операции удаления
        this.btnDelCard.addEventListener('click', () => {
            console.log(data.id);
            this.delClientOperation.classList.remove('none')
            this.confirmDel = document.querySelector('.del')
            this.confirmDel.addEventListener('click', () => {
            this.deleteCard(data.id)
            })

        })

        // вызов формы изменения существующего клиента
        this.btnEditCard.addEventListener('click', () => {
            this.modalEdit = document.querySelector('.modal-edit-client');
            this.modalEdit.classList.remove('none');
            document.querySelectorAll('.add-class').forEach(i => i.remove())

            this.idInCard = document.querySelector('.data-id')
            this.idInCard.textContent = `id ${data.id}`

            this.inputNameEditForm.value = data.name;
            this.inputSurnameEditForm.value = data.surname;;
            this.inputLastnameEditForm.value = data.lastName;;

            data.contacts.forEach(item => console.log(item.type))

            data.contacts.forEach(item => {
              // генерирую случайное число, чтобы присвоить его к кнопке и select (так кнопка и селект будут связаны уникальным id)
              this.i = Math.floor(Math.random() * 999) + 1;

              this.editElemContact = document.createElement('div');
              this.editElemContact.classList.add('add-class');
              this.editElemContact.classList.add('add-number-input-cont')
              this.editElemContact.id = `${item.type}${this.i}`
              // this.i++
              console.log(this.editElemContact.id)
              this.select = document.createElement('select');
              this.select.classList.add('select-add_contact');
              this.select.name = 'choice';
              item.type == "number" ? this.select.innerHTML = `<option class="opt" id="${item.type}" value="${item.type}">Телефон</option>` : false
              item.type == "VK" ? this.select.innerHTML = `<option class="opt" id="${item.type}" value="${item.type}">VK</option>` : false
              item.type == "Facebook" ? this.select.innerHTML = `<option class="opt" id="${item.type}" value="${item.type}">Facebook</option>` : false
              item.type == "Email" ? this.select.innerHTML = `<option class="opt" id="${item.type}" value="${item.type}">Почта</option>` : false
              this.inpNC = document.createElement('input');
              this.inpNC.classList.add('inp-add_number');
              this.inpNC.classList.add('edit_number');
              this.inpNC.value = `${item.value}`;
              this.delContactBtn = document.createElement('button')
              this.delContactBtn.classList.add('del-cont')
              this.delContactBtn.id = `${item.type}${this.i}`
              this.delContactBtn.classList.add(`${item.type}`)
              this.delContactBtn.innerHTML = `
                  <img class="x" src="./img/cancel.png" alt="">
              `
              this.contForEditContacts.append(this.editElemContact)
              this.editElemContact.append(this.select);
              this.editElemContact.append(this.inpNC);
              this.editElemContact.append(this.delContactBtn);
              //кнока удалить клиента в карточке редактирования
              this.delEditFormBtn = document.querySelector('.del-edit')
              this.delEditFormBtn.addEventListener('click', () => {
                this.modalEdit.classList.add('none');
                this.delClientOperation.classList.remove('none')
                this.confirmDel = document.querySelector('.del')
                this.confirmDel.addEventListener('click', () => {
                this.deleteCard(data.id)
                })
              })
              // перебераю все кнопки "Х", вешаю на них слушатели при клике, при нажатии, перебираю id контейнеров с контактом, удаляю при совпадении (так совмещаю Х и Секшен)
              document.querySelectorAll('.del-cont').forEach(i => {
                  i.addEventListener('click', (event)=> {
                      document.querySelectorAll('.add-number-input-cont').forEach(elem => {
                          elem.id == event.currentTarget.id ? elem.remove() : false
                      })
                  })
              })
            })

            //слушатель на кнопку сохранения из карточки изменения существующего клиента
            this.btnSaveEditForm.addEventListener('click', () => {
                this.editDataInput(data.id)
            })

        })

     }

    // функция получения данных из инпута существущего клиента, которая возвращает объект с данными для отправки изменений на сервер

    editDataInput(id) {
    this.obj = {};
    this.arrVal = [];
    this.arrSel = [];
    this.arrContacts = [];
    this.inpNC = document.querySelectorAll('.inp-add_number');
    this.select = document.querySelectorAll('.select-add_contact');
    this.inpNC.forEach(element => this.arrVal.push(element.value));
    this.select.forEach(element => this.arrSel.push(element.value));
    console.log(this.arrVal);
    console.log(this.arrSel);
    for (let i = 0; i < this.arrSel.length; i++) {

    this.arrContacts.push(
    {
        type: this.arrSel[i],
        value: this.arrVal[i],
    }
    )
    }

    this.obj.name = this.inputNameEditForm.value;
    this.obj.surname = this.inputSurnameEditForm.value;
    this.obj.lastName = this.inputLastnameEditForm.value;
    this.obj.contacts = this.arrContacts;
    this.objData.length = 0

    this.editCard(this.obj, id)
    }

    // функкция создания формы и изменения данных существующего клиента
    editSelect() {
    this.editElemContact = document.createElement('div');
    this.editElemContact.classList.add('addClass');
    this.select = document.createElement('select');
    this.select.classList.add('select-add_contact');
    this.select.name = 'choice';
    this.select.innerHTML = `
        <option class="em" value="Email">Email</option>
        <option class="num" value="number" selected>Доп. телефон</option>
        <option class="vk" value="VK">VK</option>
        <option class="fc" value="Facebook">Facebook</option>
    `
    this.inpNC = document.createElement('input');
    this.inpNC.classList.add('inp-add_number');
    this.inpNC.classList.add('edit_number');
    this.inpNC.placeholder = "Введите данные контакта";
    this.inpNC.type = "text";
    this.delContactCont = document.createElement('div')
    this.delContactCont.classList.add('del-cont')
    this.delContactCont.innerHTML = `
        <img class="x" src="./img/cancel.png" alt="">
    `

    this.editElemContact.append(this.select);
    this.editElemContact.append(this.inpNC);
    this.editElemContact.append(this.delContactCont);
    }

    // функкция создания формы и введения данных нового клиента
    newSelect() {
        this.newElemContact = document.createElement('div');
        this.newElemContact.classList.add('addClass');
        this.select = document.createElement('select');
        this.select.classList.add('select-add_contact');
        this.select.name = 'choice';
        this.select.innerHTML = `
            <option class="em" value="Email">Email</option>
            <option class="num" value="number" selected>Доп. телефон</option>
            <option class="vk" value="VK">VK</option>
            <option class="fc" value="Facebook">Facebook</option>
        `
        this.inpNC = document.createElement('input');
        this.inpNC.classList.add('inp-add_number');
        this.inpNC.placeholder = "Введите данные контакта";
        this.inpNC.type = "text";

        this.newElemContact.append(this.select);
        this.newElemContact.append(this.inpNC);
    }

    addListeners() {

        //слушатель на кнопку + добавление контактов нового клиента
        this.addContactBtn.addEventListener('click', ()=> {
            this.newSelect()
            this.newElemContact.classList.add('add-number-input-cont')
            this.contForAddContacts.append(this.newElemContact)
        })

        //слушатель на кнопку + изменения контактов существующего клиента
        this.editContactBtn.addEventListener('click', ()=> {
            this.editSelect()
            this.editElemContact.classList.add('add-number-input-cont')
            this.contForEditContacts.append(this.editElemContact)
        })

        //слушатель на кнопку сохранения из карточки нового клиента
        this.btnSaveNewClient.addEventListener('click', (e)=> {
            e.preventDefault();
            this.getDataInput()
        })

        this.addClientBtn.addEventListener('click', (event)=> {

            event.preventDefault()

            this.modalNew.classList.remove('none')
            this.select = document.createElement('select')
            this.loading()
        })

        this.openDelForm.addEventListener('click', (event)=> {
            event.preventDefault()

            this.modalNew.classList.add('none')
            this.modalDel.classList.remove('none')
        })

        // отмена операции
        this.canselDelForm.addEventListener('click', () => {
            this.delClientOperation.classList.add('none')
        })

        // отмена операции
        this.canselDelFormBtn.addEventListener('click', () => {
            this.delClientOperation.classList.add('none')
        })

        // закрытие окна нового клиента
        this.cancelModalNewClient.addEventListener('click', () => {
            this.modalNew.classList.add('none')
        })

        // закрытие окна изменения клиента
        this.editModalCancel.addEventListener('click', () => {
            this.modalEdit.classList.add('none')
        })


    }
}

