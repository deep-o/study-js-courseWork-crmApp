/* eslint-disable no-undef */
(() => {
  // задать пути
  const PATH = {
    logo: 'src/img/logo.svg',
  };
  const URL = 'http://localhost:3000/api/clients';

  // задать ключевые элементы DOM
  const DOM = {
    header: document.querySelector('.header'),
    main: document.querySelector('.main'),
    body: document.querySelector('body'),
  };
  // список классов, используемых в HTML
  const CLASSES = {
    displayNone: ['display-none'],
    hide: ['visually-hidden'],
    main: ['main-container'],
    content: ['content'],
    container: ['contain', 'main-container'],
    hContainer: ['contain', 'header__container'],
    logo: ['logo'],
    formSearch: ['form-search'],
    search: ['input', 'form-search__input', 'form-control'],
    autocompleteList: ['autocomplete-list'],
    autocompleteItem: ['autocomplete-list__item'],
    autocompleteActive: ['autocomplete-active'],
    appTitle: ['main__title'],
    tableWrap: ['table__wrap'],
    table: ['table'],
    thead: ['thead'],
    thThead: ['thead__item'],
    thBtn: ['thead__btn'],
    sortBtn: ['sort__btn'],
    thContent: ['thead__content'],
    arrow: ['arrow'],
    letters: ['letters'],
    dates: ['dates'],
    actions: ['actions'],
    actionsSvg: ['action-svg'],
    tbody: ['tbody'],
    tr: ['tbody__tr'],
    empty: ['tbody__tr', 'empty'],
    emptyTable: ['empty'],
    thTbody: ['tbody__th'],
    td: ['tbody__td'],
    date: ['date'],
    time: ['time'],
    contacts: ['tbody__td', 'contacts'],
    icons: ['icons', 'tt'],
    tippyContent: ['tippy__content'],
    link: ['link'],
    btnTable: ['tbody__btn'],
    btnTableChange: ['tbody__btn', 'tbody__btn--change'],
    btnTableDelete: ['tbody__btn', 'tbody__btn--delete'],
    btnCopyLink: ['tbody__btn', 'tbody__btn--copy'],
    transparentBtn: ['transparent-btn'],
    disabled: ['disabled'],
    overlay: ['overlay'],
    modal: ['modal'],
    modalWrap: ['modal__wrap'],
    modalHead: ['modal-head', 'mod-container'],
    modalTitle: ['modal__title'],
    modalID: ['modal__id'],
    modalCloseBtn: ['btn-close'],
    modalForm: ['modal-form'],
    client: ['client', 'mod-container'],
    clientLabel: ['client__label'],
    clientInput: ['input', 'client__input'],
    placeholder: ['place-holder'],
    clientContacts: ['client-contacts'],
    clientContactsWrap: ['client-contacts__wrap', 'mod-container'],
    contactItem: ['contact-item'],
    choice: ['js-choice'],
    contactItemInput: ['contact-item__input'],
    contactDeleteBtn: ['contact-item__btn', 'tt'],
    contactItemSvg: ['contact-item__svg'],
    tippy: ['tippy-inner'],
    contactBtn: ['contact-btn'],
    contactBtnWrap: ['contact-btn__wrap'],
    contactBtnCircle: ['contact-btn__circle'],
    contactBtnSvg: ['contact-btn__svg'],
    clientErr: ['client-err', 'mod-container'],
    clientErrText: ['client-err__text'],
    clientBtns: ['client-btns'],
    saveBtn: ['add-client__btn'],
    purpleBtn: ['btn', 'purple-btn'],
    cancelBtn: ['btn', 'small-btn'],
    extend: ['extend'],
    showErr: ['show-err'],
    deleteModal: ['delete-mod'],
    serverErr: ['server-err'],
    validErr: ['valid-err'],
    loader: ['loader'],
    spinner: ['spinner'],
    highlighted: ['highlighted'],
  };

  const INPUTS = {
    SURNAME: 'surname',
    NAME: 'name',
    LASTNAME: 'lastName',
    CONTACTS: 'contacts',
  };

  const CONTACTS = {
    TEL: 'tel',
    MAIL: 'mail',
    TEXT: 'text',
  };

  // функция для установки аттрибутов элемента
  function setAttributes(el, options) {
    Object.keys(options).forEach((attr) => {
      el.setAttribute(attr, options[attr]);
    });
  }

  // функция для установки классов
  function setClasses(el, classes) {
    if (!classes) return;
    classes.forEach((item) => {
      el.classList.add(item);
    });
  }

  // создать элемент с классом и текстом
  function crElem(teg, classes, text) {
    const elem = document.createElement(teg);
    setClasses(elem, classes);
    elem.textContent = text;
    return elem;
  }

  // удалить элемент
  function deleteElement(element) {
    if (element) element.remove();
  }

  // инициализация селекта
  function initSelect(element, option = 'phone') {
    const choice = new Choices(element, {
      choices: [
        { value: 'phone', label: 'Телефон' },
        { value: 'mail', label: 'Email' },
        { value: 'fb', label: 'Facebook' },
        { value: 'vk', label: 'VK' },
        { value: 'other', label: 'Другое' },
      ],
      searchEnabled: false,
      itemSelectText: '',
      silent: true,
      shouldSort: false,
    });
    choice.setChoiceByValue(option);
  }

  // инициализация маски для инпутов телефон и почта
  function maskInput(elem) {
    const type = elem.getAttribute('data-type');
    let mask;

    switch (type) {
      case 'tel':
        mask = '+7 (999) 999-99-99';
        break;
      case 'phone':
        mask = '+7 (999) 999-99-99';
        break;
      case 'mail':
        mask = '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]';
        break;
      default:
        break;
    }

    if (mask) {
      const im = new Inputmask(mask, { placeholder: '*' });
      im.mask(elem);
    }
  }

  // инициализация clipboard
  function clipboardInit(elem) {
    // eslint-disable-next-line no-new
    new ClipboardJS(elem);
  }

  // анимация открытия модального окна
  function animateOpen() {
    gsap.from(`.${CLASSES.overlay}`, {
      opacity: 0,
      duration: 0.5,
    });
    gsap.from(`.${CLASSES.modal}`, {
      opacity: 0,
      y: -100,
      scale: 0.5,
      duration: 0.5,
    });
  }

  // анимация закрытия модального окна
  function animateClose() {
    gsap.to('.overlay', { opacity: 0, duration: 0.5 });
    gsap.to('.modal', {
      opacity: 0, y: -100, scale: 0.5, duration: 0.5,
    });
  }

  // сделать первую букву строки заглавной, убрать лишние пробелы в середине строки
  function firstLetterUp(str) {
    if (!str) return str;
    const arr = str.toLowerCase().split(' ').filter(Boolean).map((item) => item[0].toUpperCase() + item.slice(1));
    return arr.join(' ');
  }

  // запустить loader или spinner
  function runPreload(elem, place) {
    const loader = crElem('div', elem);
    place.firstChild.after(loader);
  }

  // создаьЬ пустой блок в таблице, если нет данных и loader, если идёт ожидание данных от сервера
  function emptyTable(loader) {
    const tBody = document.querySelector('.tbody');
    tBody.innerHTML = '';
    const tRow = crElem('tr', CLASSES.empty);
    const td = crElem('td', CLASSES.td);

    setClasses(tBody, CLASSES.emptyTable);
    setAttributes(td, { colspan: 10 });

    if (loader) runPreload(CLASSES.loader, DOM.main);

    tRow.append(td);
    tBody.append(tRow);
  }

  // очистить форму Поиск и убрать подсвеченный элемент в таблице, если такой есть
  function searchReset() {
    document.getElementById('search').value = '';
    const items = document.querySelectorAll(`.${CLASSES.highlighted}`);
    if (items) items.forEach((item) => item.classList.remove(CLASSES.highlighted));
  }

  // закрыть списки с автодополнением
  function closeAllLists() {
    const lists = document.querySelectorAll(`.${CLASSES.autocompleteList}`);
    lists.forEach((item) => deleteElement(item));
  }

  function autocompleteSearch(search) {
    let currentFocus;

    // подсветить строку в таблице
    function highliteTableRow(id, string) {
      search.value = string;
      closeAllLists();
      const el = document.getElementById(id);
      el.classList.add(CLASSES.highlighted);
      el.scrollIntoView();
      search.blur();
    }

    // создать выпадающее меню с автодополнением
    function throwDropdown() {
      let spinner = document.querySelector(`.${CLASSES.spinner}`);
      const element = document.querySelector('.form-search__input');
      if (!spinner) {
        spinner = crElem('div', CLASSES.spinner);
        element.before(spinner);
      }
      let timer;
      currentFocus = -1;
      clearTimeout(timer);

      // показать варианты в выпадающем меню
      function showVariants(clients) {
        deleteElement(document.querySelector(`.${CLASSES.spinner}`));
        closeAllLists();
        const list = crElem('ul', CLASSES.autocompleteList);
        clients.forEach((clientItem) => {
          const lastname = clientItem.lastName || '';
          const string = `${clientItem.surname} ${clientItem.name} ${lastname}`;
          const substring = search.value;
          const re = new RegExp(substring, 'gi');
          const item = crElem('li', CLASSES.autocompleteItem);
          setAttributes(item, { 'data-id': clientItem.id });
          item.innerHTML = string.replace(re, `<strong>${firstLetterUp(substring)}</strong>`);
          list.append(item);

          item.addEventListener('click', () => {
            highliteTableRow(clientItem.id, string);
          });
        });
        search.after(list);
      }

      async function runSearch() {
        const searchValue = search.value;
        const response = await fetch(`${URL}?search=${searchValue}`);
        const clients = await response.json();
        showVariants(clients);
        if (search.value === '') closeAllLists();
      }

      timer = setTimeout(runSearch, 500);
    }

    function removeActive() {
      const elems = document.querySelectorAll(`.${CLASSES.autocompleteActive}`);
      if (elems) {
        elems.forEach((elem) => elem.classList.remove(CLASSES.autocompleteActive));
      }
    }

    function addActive(items) {
      removeActive();
      if (currentFocus >= items.length) currentFocus = 0;
      if (currentFocus < 0) currentFocus = (items.length - 1);
      items[currentFocus].classList.add('autocomplete-active');
    }

    function keyDropdown(e) {
      const items = document.querySelectorAll(`.${CLASSES.autocompleteItem}`);
      switch (e.keyCode) {
        case 40:
          currentFocus++;
          addActive(items);
          break;
        case 38:
          currentFocus--;
          addActive(items);
          break;
        case 13:
          id = items[currentFocus].getAttribute('data-id');
          text = items[currentFocus].textContent;
          highliteTableRow(id, firstLetterUp(text));
          break;
        default:
          break;
      }
    }

    search.addEventListener('input', throwDropdown);
    search.addEventListener('click', searchReset);
    search.addEventListener('keydown', (e) => { keyDropdown(e); });
  }

  // создать header приложения
  function createHeader() {
    const container = crElem('div', CLASSES.hContainer);
    const logo = crElem('img', CLASSES.logo);
    const form = crElem('form', CLASSES.formSearch);
    const search = crElem('input', CLASSES.search);

    setAttributes(logo, { src: PATH.logo, alt: 'логотип' });
    setAttributes(search, {
      id: 'search', type: 'text', name: 'search', placeholder: 'Ведите запрос',
    });

    form.addEventListener('submit', (e) => e.preventDefault());
    autocompleteSearch(search);
    container.append(logo);
    container.append(form);
    form.append(search);

    return container;
  }

  // создать верхнюю строку табюлицы
  function createTable() {
    const tWrap = crElem('div', CLASSES.tableWrap);
    const table = crElem('table', CLASSES.table);
    const tHead = crElem('thead', CLASSES.thead);
    const tRow = crElem('tr');
    const tBody = crElem('tbody', CLASSES.tbody);

    const captions = [
      {
        caption: 'ID', isSorted: true, id: 'id', hasLetters: false, isDates: false, isActions: false,
      },
      {
        caption: 'Фамилия Имя Отчество', isSorted: true, id: 'fullName', hasLetters: true, isDates: false, isActions: false,
      },
      {
        caption: 'Дата и время создания', isSorted: true, id: 'createdAt', hasLetters: false, isDates: true, isActions: false,
      },
      {
        caption: 'Последние изменения', isSorted: true, id: 'updatedAt', hasLetters: false, isDates: true, isActions: false,
      },
      {
        caption: 'Контакты', isSorted: false, hasLetters: false, isDates: false, isActions: false,
      },
      {
        caption: 'Действия', isSorted: false, hasLetters: false, isDates: false, isActions: true,
      },
      {
        caption: '', isSorted: false, hasLetters: false, isDates: false, isActions: false,
      },
    ];

    // добавить стрелку к сортируемым заголовкам таблицы
    function addArrow() {
      const elem = crElem('span', CLASSES.arrow);
      const arrow = '<svg class="arrow__svg" width="8" height="8" xmlns="http://www.w3.org/2000/svg"><path d="M8 4L7.295 3.295L4.5 6.085L4.5 0L3.5 0L3.5 6.085L0.71 3.29L0 4L4 8L8 4Z" fill="#9873FF"/></svg>';

      elem.innerHTML = arrow;
      return elem;
    }

    // добавить параметры сортировки А-Я
    function addLetters() {
      const wrap = crElem('span', CLASSES.letters, 'А-Я');
      return wrap;
    }

    tWrap.append(table);
    table.append(tHead);
    tHead.append(tRow);
    table.append(tBody);

    captions.forEach((caption) => {
      const th = crElem('th', CLASSES.thThead);
      const inner = crElem('span', CLASSES.thContent, caption.caption);
      setAttributes(th, { scope: 'col' });

      if (caption.isSorted) {
        const btn = crElem('button', CLASSES.thBtn);
        const arrow = addArrow();
        setClasses(btn, CLASSES.sortBtn);
        setAttributes(btn, { id: caption.id, 'data-sort': 'false' });
        btn.append(inner);

        if (caption.hasLetters) {
          const letters = addLetters();
          btn.append(letters);
        }

        btn.append(arrow);
        th.append(btn);
      } else {
        th.append(inner);
      }

      /* eslint-disable no-unused-expressions */
      caption.isDates ? setClasses(th, CLASSES.dates) : null;
      caption.isActions ? setClasses(th, CLASSES.actions) : null;

      tRow.append(th);
    });

    return tWrap;
  }

  /// вывести сообщение, что сервер не доступен
  function connectionErr() {
    const btn = document.querySelector(`.${CLASSES.transparentBtn}`);
    const errMessage = crElem('div', CLASSES.serverErr, 'Сервер не отвечает...');
    btn.before(errMessage);
  }

  // создать заголовок модального окна
  function createModalHead(title, id, toChange) {
    const header = crElem('figure', CLASSES.modalHead);
    const modalTitle = crElem('h2', CLASSES.modalTitle, title);
    const modalID = crElem('span', CLASSES.modalID, `ID ${id}`);
    const btnClose = crElem('button', CLASSES.modalCloseBtn);

    header.append(modalTitle);
    toChange ? header.append(modalID) : null;
    header.append(btnClose);

    return {
      header,
      btnClose,
    };
  }
  // создает основные блоки модального окна - для сохранения/изменения/удаления данных о клиенте
  function createModal() {
    const container = crElem('div', []);
    const overlay = crElem('div', CLASSES.overlay);
    const inner = crElem('div', CLASSES.modal);
    const wrapper = crElem('div', CLASSES.modalWrap);

    return {
      container,
      overlay,
      inner,
      wrapper,
    };
  }

  // создать блок с кнопками для модального окна: Сохранить, Закрыть, Удалить, Отмена
  function createBtnBlock(option, { onSave, onClose, onDelete }) {
    const wrapper = crElem('figure', CLASSES.clientBtns);
    const btnLg = crElem('button', CLASSES.saveBtn, option.btnLg);
    const btnSm = crElem('button', CLASSES.cancelBtn, option.btnSm);

    setClasses(btnLg, CLASSES.purpleBtn);
    setAttributes(btnLg, { type: option.type });
    setAttributes(btnSm, { type: 'button' });

    // для маленькой кнопки, Отмена и Удалить клиента (в модальном окне Изменить)
    btnSm.addEventListener('click', () => {
      option.roleSm(option.element, option.id, { onSave, onClose, onDelete });
    });

    // для большой кнопки, если её прдназначение - удалить клиента
    if (option.type === 'button') {
      btnLg.addEventListener('click', () => {
        option.roleLg(option.element, option.id, { onSave, onClose, onDelete });
      });
    }

    wrapper.append(btnLg);
    wrapper.append(btnSm);

    return {
      wrapper,
      btnLg,
      btnSm,
    };
  }

  // создаёт модальное окно с запросом: Удалить клиента?
  function deleteRequest(element, id, { onSave, onClose, onDelete }) {
    deleteElement(document.querySelector(`.${CLASSES.spinner}`));
    const svg = document.querySelector(`.${CLASSES.actionsSvg}.${CLASSES.hide}`);
    if (svg) svg.classList.remove(CLASSES.hide);
    const btn = document.querySelector('[disabled]');
    if (btn) btn.removeAttribute('disabled');

    deleteElement(element);
    const modal = createModal();
    const option = {
      title: 'Удалить клиента', btnLg: 'Удалить', btnSm: 'Отмена', type: 'button', roleLg: onDelete, roleSm: onClose, element: modal.container, id,
    };
    const modalHead = createModalHead(option.title);
    const modalBlock = crElem('div', CLASSES.client);
    const text = crElem('p', CLASSES.content, 'Вы действительно хотите удалить этого клиента?');
    const btns = createBtnBlock(option, { onSave, onClose, onDelete });

    setClasses(modal.wrapper, CLASSES.deleteModal);

    modalHead.btnClose.addEventListener('click', () => onClose(modal.container));
    modal.overlay.addEventListener('click', () => onClose(modal.container));

    modalBlock.append(text);
    modal.wrapper.append(modalHead.header);
    modal.wrapper.append(modalBlock);
    modal.wrapper.append(btns.wrapper);
    modal.inner.append(modal.wrapper);
    modal.container.append(modal.overlay);
    modal.container.append(modal.inner);
    DOM.main.append(modal.container);
  }

  // модальное окно, если клиент с hash не найден
  function clientNotFound(id, { onClose }) {
    const modal = createModal();
    const modalHead = createModalHead('Нам очень жаль :(');
    const modalBlock = crElem('div', CLASSES.client);
    const text = crElem('p', CLASSES.content, `Клиент с ID ${id} не найден`);

    setClasses(modal.wrapper, CLASSES.deleteModal);

    modalHead.btnClose.addEventListener('click', () => onClose(modal.container));
    modal.overlay.addEventListener('click', () => onClose(modal.container));

    modalBlock.append(text);
    modal.wrapper.append(modalHead.header);
    modal.wrapper.append(modalBlock);
    modal.inner.append(modal.wrapper);
    modal.container.append(modal.overlay);
    modal.container.append(modal.inner);
    DOM.main.append(modal.container);
  }

  // создать и добавить в таблицу строку с клиентом
  function createClientItem(client, { onClose, onDelete }) {
    function crDate(item) {
      const fullDate = new Date(item);
      const date = fullDate
        .toISOString()
        .split('T')[0]
        .split('-')
        .reverse()
        .join('.');
      const time = fullDate
        .toLocaleTimeString()
        .split(':')
        .slice(0, 2)
        .join(':');

      const elem = crElem('td', CLASSES.td);
      const elemDate = crElem('span', CLASSES.date, date);
      const elemTime = crElem('span', CLASSES.time, time);

      elem.append(elemDate);
      elem.append(elemTime);

      return elem;
    }
    // создать иконку контакта в таблице
    function crContacts(clientItem) {
      const elem = crElem('td', CLASSES.contacts);
      const options = [
        { type: 'vk', label: 'vkontakte: ', icon: '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M8 0C3.58187 0 0 3.58171 0 8C0 12.4183 3.58187 16 8 16C12.4181 16 16 12.4183 16 8C16 3.58171 12.4181 0 8 0ZM12.058 8.86523C12.4309 9.22942 12.8254 9.57217 13.1601 9.97402C13.3084 10.1518 13.4482 10.3356 13.5546 10.5423C13.7065 10.8371 13.5693 11.1604 13.3055 11.1779L11.6665 11.1776C11.2432 11.2126 10.9064 11.0419 10.6224 10.7525C10.3957 10.5219 10.1853 10.2755 9.96698 10.037C9.87777 9.93915 9.78382 9.847 9.67186 9.77449C9.44843 9.62914 9.2543 9.67366 9.1263 9.90707C8.99585 10.1446 8.96606 10.4078 8.95362 10.6721C8.93577 11.0586 8.81923 11.1596 8.43147 11.1777C7.60291 11.2165 6.81674 11.0908 6.08606 10.6731C5.44147 10.3047 4.94257 9.78463 4.50783 9.19587C3.66126 8.04812 3.01291 6.78842 2.43036 5.49254C2.29925 5.2007 2.39517 5.04454 2.71714 5.03849C3.25205 5.02817 3.78697 5.02948 4.32188 5.03799C4.53958 5.04143 4.68362 5.166 4.76726 5.37142C5.05633 6.08262 5.4107 6.75928 5.85477 7.38684C5.97311 7.55396 6.09391 7.72059 6.26594 7.83861C6.45582 7.9689 6.60051 7.92585 6.69005 7.71388C6.74734 7.57917 6.77205 7.43513 6.78449 7.29076C6.82705 6.79628 6.83212 6.30195 6.75847 5.80943C6.71263 5.50122 6.53929 5.30218 6.23206 5.24391C6.07558 5.21428 6.0985 5.15634 6.17461 5.06697C6.3067 4.91245 6.43045 4.81686 6.67777 4.81686L8.52951 4.81653C8.82136 4.87382 8.88683 5.00477 8.92645 5.29874L8.92808 7.35656C8.92464 7.47032 8.98521 7.80751 9.18948 7.88198C9.35317 7.936 9.4612 7.80473 9.55908 7.70112C10.0032 7.22987 10.3195 6.67368 10.6029 6.09801C10.7279 5.84413 10.8358 5.58142 10.9406 5.31822C11.0185 5.1236 11.1396 5.02785 11.3593 5.03112L13.1424 5.03325C13.195 5.03325 13.2483 5.03374 13.3004 5.04274C13.6009 5.09414 13.6832 5.22345 13.5903 5.5166C13.4439 5.97721 13.1596 6.36088 12.8817 6.74553C12.5838 7.15736 12.2661 7.55478 11.9711 7.96841C11.7001 8.34652 11.7215 8.53688 12.058 8.86523Z" fill="#9873FF"/></g></svg>' },
        { type: 'fb', label: 'facebook: ', icon: '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M7.99999 0C3.6 0 0 3.60643 0 8.04819C0 12.0643 2.928 15.3976 6.75199 16V10.3775H4.71999V8.04819H6.75199V6.27309C6.75199 4.25703 7.94399 3.14859 9.77599 3.14859C10.648 3.14859 11.56 3.30121 11.56 3.30121V5.28514H10.552C9.55999 5.28514 9.24799 5.90362 9.24799 6.53815V8.04819H11.472L11.112 10.3775H9.24799V16C11.1331 15.7011 12.8497 14.7354 14.0879 13.2772C15.3261 11.819 16.0043 9.96437 16 8.04819C16 3.60643 12.4 0 7.99999 0Z" fill="#9873FF"/></g></svg>' },
        { type: 'phone', label: 'телефон: ', icon: '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><circle cx="8" cy="8" r="8" fill="#9873FF"/><path d="M11.56 9.50222C11.0133 9.50222 10.4844 9.41333 9.99111 9.25333C9.83556 9.2 9.66222 9.24 9.54222 9.36L8.84444 10.2356C7.58667 9.63556 6.40889 8.50222 5.78222 7.2L6.64889 6.46222C6.76889 6.33778 6.80444 6.16444 6.75556 6.00889C6.59111 5.51556 6.50667 4.98667 6.50667 4.44C6.50667 4.2 6.30667 4 6.06667 4H4.52889C4.28889 4 4 4.10667 4 4.44C4 8.56889 7.43556 12 11.56 12C11.8756 12 12 11.72 12 11.4756V9.94222C12 9.70222 11.8 9.50222 11.56 9.50222Z" fill="white"/></g></svg>' },
        { type: 'mail', label: 'mail: ', icon: '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM4 5.75C4 5.3375 4.36 5 4.8 5H11.2C11.64 5 12 5.3375 12 5.75V10.25C12 10.6625 11.64 11 11.2 11H4.8C4.36 11 4 10.6625 4 10.25V5.75ZM8.424 8.1275L11.04 6.59375C11.14 6.53375 11.2 6.4325 11.2 6.32375C11.2 6.0725 10.908 5.9225 10.68 6.05375L8 7.625L5.32 6.05375C5.092 5.9225 4.8 6.0725 4.8 6.32375C4.8 6.4325 4.86 6.53375 4.96 6.59375L7.576 8.1275C7.836 8.28125 8.164 8.28125 8.424 8.1275Z" fill="#9873FF"/></g></svg>' },
        { type: 'other', label: 'прочее: ', icon: '<svg width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path fill-rule="evenodd" clip-rule="evenodd" d="M8 16C12.4183 16 16 12.4183 16 8C16 3.58172 12.4183 0 8 0C3.58172 0 0 3.58172 0 8C0 12.4183 3.58172 16 8 16ZM3 8C3 5.24 5.24 3 8 3C10.76 3 13 5.24 13 8C13 10.76 10.76 13 8 13C5.24 13 3 10.76 3 8ZM9.5 6C9.5 5.17 8.83 4.5 8 4.5C7.17 4.5 6.5 5.17 6.5 6C6.5 6.83 7.17 7.5 8 7.5C8.83 7.5 9.5 6.83 9.5 6ZM5 9.99C5.645 10.96 6.75 11.6 8 11.6C9.25 11.6 10.355 10.96 11 9.99C10.985 8.995 8.995 8.45 8 8.45C7 8.45 5.015 8.995 5 9.99Z" fill="#9873FF"/></g></svg>' },
      ];

      // создать ссылку в tooltip
      function createTippyLink(contact) {
        const elemTippy = crElem('span', CLASSES.tippyContent, `${contact.label} `);
        let attr;
        let value;

        switch (contact.type) {
          case 'phone':
            attr = `tel:${contact.value}`;
            value = contact.value;
            break;
          case 'mail':
            attr = `mailto:${contact.value}`;
            value = contact.value;
            break;
          default:
            attr = contact.value;
            value = contact.value;
            break;
        }
        const link = crElem('a', CLASSES.link, value);

        setAttributes(link, { href: attr });
        elemTippy.append(link);
        return elemTippy;
      }

      clientItem.contacts.forEach((contact) => {
        const elemItem = crElem('btn', CLASSES.icons);
        const elemTippy = crElem('div', CLASSES.displayNone);
        const tippyId = `${clientItem.id}-${clientItem.contacts.indexOf(contact)}`;
        const option = options.find((item) => item.type === contact.type);
        contact.label = option.label;
        contact.icon = option.icon;

        setAttributes(elemTippy, { id: tippyId });
        setAttributes(elemItem, { 'data-template': tippyId });

        const inner = createTippyLink(contact);

        elemItem.innerHTML = `${contact.icon}`;
        elemTippy.append(inner);
        elem.append(elemItem);
        elemItem.append(elemTippy);
      });

      return elem;
    }

    const tBody = document.querySelector('.tbody');
    const tRow = crElem('tr', CLASSES.tr);
    const tdID = crElem('td', CLASSES.thTbody, client.id);
    const tdName = crElem('td', CLASSES.td, `${client.surname} ${client.name} ${client.lastName}`);
    const tdCreate = crDate(client.createdAt);
    const tdChange = crDate(client.updatedAt);
    const tdContacts = crContacts(client);

    // создать кнопки изменить/удалить в таблице
    function crActions() {
      const elem = crElem('td', CLASSES.td);
      const buttons = [
        {
          class: CLASSES.btnTableChange,
          inner: `<svg class="${CLASSES.actionsSvg}" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M2 11.5V14H4.5L11.8733 6.62662L9.37333 4.12662L2 11.5ZM13.8067 4.69329C14.0667 4.43329 14.0667 4.01329 13.8067 3.75329L12.2467 2.19329C11.9867 1.93329 11.5667 1.93329 11.3067 2.19329L10.0867 3.41329L12.5867 5.91329L13.8067 4.69329Z" fill="#9873FF"/></g></svg>Изменить`,
          action() {
            window.location.hash = client.id;
          },
        },
        {
          class: CLASSES.btnTableDelete,
          inner: `<svg class="${CLASSES.actionsSvg}" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g opacity="0.7"><path d="M8 2C4.682 2 2 4.682 2 8C2 11.318 4.682 14 8 14C11.318 14 14 11.318 14 8C14 4.682 11.318 2 8 2ZM8 12.8C5.354 12.8 3.2 10.646 3.2 8C3.2 5.354 5.354 3.2 8 3.2C10.646 3.2 12.8 5.354 12.8 8C12.8 10.646 10.646 12.8 8 12.8ZM10.154 5L8 7.154L5.846 5L5 5.846L7.154 8L5 10.154L5.846 11L8 8.846L10.154 11L11 10.154L8.846 8L11 5.846L10.154 5Z" fill="#F06A4D"/></g></svg>Удалить`,
          action() {
            deleteRequest(undefined, client.id, { undefined, onClose, onDelete });
            animateOpen();
          },
        },
      ];

      buttons.forEach((button) => {
        const elemBtn = crElem('button', button.class);
        elemBtn.innerHTML = button.inner;
        let timer;

        function btnFunc() {
          button.action();
        }

        // таймер для проверки работы спинеров
        function runTimer() {
          clearTimeout(timer);
          timer = setTimeout(btnFunc, 300);
        }

        elemBtn.addEventListener('click', () => {
          elemBtn.firstChild.classList.add(CLASSES.hide);
          setAttributes(elemBtn, { disabled: '' });
          runPreload(CLASSES.spinner, elemBtn);
          runTimer();
        });
        elem.append(elemBtn);
      });

      return elem;
    }

    // добавить элемент - скопировать ссылку на карточку клиента
    function createLink() {
      const elem = crElem('td', CLASSES.td);
      const btn = crElem('button', CLASSES.btnCopyLink);
      const inner = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" viewBox="0 0 12 16"><path fill-rule="evenodd" d="M8.5 1H1c-.55 0-1 .45-1 1v12c0 .55.45 1 1 1h10c.55 0 1-.45 1-1V4.5L8.5 1zM11 14H1V2h7l3 3v9zM6 4.5l4 3-4 3v-2c-.98-.02-1.84.22-2.55.7-.71.48-1.19 1.25-1.45 2.3.02-1.64.39-2.88 1.13-3.73.73-.84 1.69-1.27 2.88-1.27v-2H6z"/></svg>';
      const link = `${window.location.href}#${client.id}`;

      setAttributes(btn, { 'data-clipboard-text': link });
      btn.innerHTML = inner;
      elem.append(btn);
      clipboardInit(btn);

      tippy(btn);
      // eslint-disable-next-line no-underscore-dangle
      const instance = btn._tippy;
      instance.setContent('copied');
      instance.setProps({
        trigger: 'click',
        hideOnClick: 'true',
      });

      btn.addEventListener('click', () => {
        setTimeout(instance.hide, 500);
      });
      return elem;
    }

    setAttributes(tRow, { id: client.id });
    const tdActions = crActions();
    const tdLink = createLink();

    tBody.append(tRow);
    tRow.append(tdID);
    tRow.append(tdName);
    tRow.append(tdCreate);
    tRow.append(tdChange);
    tRow.append(tdContacts);
    tRow.append(tdActions);
    tRow.append(tdLink);
  }

  // создать контакт в модальном окне
  function createContact(data) {
    const contactItem = crElem('figure', CLASSES.contactItem);
    const select = crElem('select', CLASSES.choice);
    const input = crElem('input', CLASSES.contactItemInput);
    const contactDeleteBtn = crElem('button', CLASSES.contactDeleteBtn);
    const icon = '<svg class="contact-item__svg" width="12" height="12" xmlns="http://www.w3.org/2000/svg"><path d="M6 0C2.682 0 0 2.682 0 6C0 9.318 2.682 12 6 12C9.318 12 12 9.318 12 6C12 2.682 9.318 0 6 0ZM6 10.8C3.354 10.8 1.2 8.646 1.2 6C1.2 3.354 3.354 1.2 6 1.2C8.646 1.2 10.8 3.354 10.8 6C10.8 8.646 8.646 10.8 6 10.8ZM8.154 3L6 5.154L3.846 3L3 3.846L5.154 6L3 8.154L3.846 9L6 6.846L8.154 9L9 8.154L6.846 6L9 3.846L8.154 3Z" fill="#B0B0B0"/></svg>';

    const options = [
      { name: 'phone', text: 'Телефон', datatype: CONTACTS.TEL },
      { name: 'mail', text: 'Email', datatype: CONTACTS.MAIL },
      { name: 'fb', text: 'Facebook', datatype: CONTACTS.TEXT },
      { name: 'vk', text: 'VK', datatype: CONTACTS.TEXT },
      { name: 'other', text: 'Другое', datatype: CONTACTS.TEXT },
    ];

    const txt = document.documentElement.clientWidth > 767 ? 'Введите данные контакта' : 'Введите данные';

    setAttributes(input, {
      name: 'contacts', 'data-type': data ? options.find((item) => item.name === data.type).datatype : CONTACTS.TEL, value: data ? data.value : null, placeholder: txt,
    });
    setAttributes(contactDeleteBtn, { 'data-template': 'tippy-delete', type: 'button' });

    contactDeleteBtn.innerHTML = icon;
    contactItem.append(select);
    contactItem.append(input);
    contactItem.append(contactDeleteBtn);

    const selectOption = data ? data.type : 'phone';
    initSelect(select, selectOption);
    maskInput(input);

    select.addEventListener('change', () => {
      setAttributes(input, { 'data-type': options.find((item) => item.name === select.value).datatype });
      input.value = '';
      if (input.inputmask) input.inputmask.remove();
      maskInput(input);
    });

    contactDeleteBtn.addEventListener('click', () => {
      const quantity = document.querySelectorAll(`.${CLASSES.contactItem}`).length;
      deleteElement(contactItem);

      switch (quantity) {
        case 1:
          document.querySelectorAll(`.${CLASSES.extend}`).forEach((item) => item.classList.remove(CLASSES.extend));
          break;
        case 10:
          document.querySelector(`.${CLASSES.contactBtn}`).classList.remove(CLASSES.hide);
          break;
        default:
          break;
      }
    });
    return contactItem;
  }

  // валидация форм
  function validate(inputs) {
    const ERR = {
      INVALID_REQUIRED: 'поле должно быть заполнено',
      INVALID_MIN: 'не менее 2-х символов',
      INVALID_MAX: 'слишком длинное значение',
      INVALID_VALUE: 'некорректное значение',
    };
    const options = [
      { name: INPUTS.SURNAME, isRequired: true },
      { name: INPUTS.NAME, isRequired: true },
      { name: INPUTS.LASTNAME, isRequired: false },
      { name: INPUTS.CONTACTS, isRequired: true },
    ];
    let isValid = true;

    function createErrElement(item, text) {
      const errMessage = crElem('div', CLASSES.validErr, text);

      item.classList.add('isInvalid');
      item.parentElement.append(errMessage);
      item.addEventListener('input', () => {
        item.classList.remove('isInvalid');
        deleteElement(errMessage);
      });
    }
    // проверка пустых значений
    function validateEmpty(item) {
      if (item.value.trim().length === 0) {
        isValid = false;
        createErrElement(item, ERR.INVALID_REQUIRED);
      }
    }

    // проверка слишком коротких и слишком длинных значений
    function validateLength(item) {
      if (item.value.trim().length > 0 && item.value.trim().length < 2) {
        isValid = false;
        createErrElement(item, ERR.INVALID_MIN);
      }
      if (item.value.trim().length > 40) {
        isValid = false;
        createErrElement(item, ERR.INVALID_MAX);
      }
    }

    // проверка номера телефона
    function validatePhone(item) {
      if (item.value.indexOf('*') > 0) {
        isValid = false;
        createErrElement(item, ERR.INVALID_VALUE);
      }
    }

    // проверка email
    function validateEmail(item) {
      if (item.value.length !== 0) {
        const re = /\S+@\S+\.\S+/;
        const valid = re.test(item.value);
        if (!valid) {
          isValid = false;
          createErrElement(item, ERR.INVALID_VALUE);
        }
      }
    }

    [...inputs].forEach((input) => {
      const inputOptions = options.find((item) => item.name === input.name);
      inputOptions.isRequired ? validateEmpty(input) : null;
      input.getAttribute('data-type') === 'text' ? validateLength(input) : null;
      input.getAttribute('data-type') === 'tel' ? validatePhone(input) : null;
      input.getAttribute('data-type') === 'mail' ? validateEmail(input) : null;
    });

    return isValid;
  }

  // создать модальное окно с формой
  function createModalWithForm(client, { onSave, onClose, onDelete }, toChange = false) {
    const modal = createModal();
    const modalForm = crElem('form', CLASSES.modalForm);

    const parameters = {
      add: {
        title: 'Новый клиент', btnLg: 'Сохранить', btnSm: 'Отмена', type: 'submit', roleLg: onSave, roleSm: onClose, tochange: toChange, element: modal.container, id: client.id,
      },
      change: {
        title: 'Изменить данные', btnLg: 'Сохранить', btnSm: 'Удалить клиента', type: 'submit', roleLg: onSave, roleSm: deleteRequest, tochange: toChange, element: modal.container, id: client.id,
      },
      delete: {
        title: 'Удалить клиента', btnLg: 'Удалить', btnSm: 'Отмена', type: 'button', roleLg: onDelete, roleSm: onClose, tochange: toChange, element: modal.container, id: client.id,
      },
    };
    const option = toChange ? 'change' : 'add';
    const btns = createBtnBlock(parameters[option], { onSave, onClose, onDelete });
    const modalHead = createModalHead(parameters[option].title, client.id, toChange);

    setAttributes(modalForm, { action: 'POST' });

    // создать форму с полями имя/фамилия/отчество
    function createClient() {
      const clientElem = crElem('figure', CLASSES.client);
      const clientInputs = [
        {
          name: INPUTS.SURNAME, value: client.surname, placeholder: 'Фамилия', required: true,
        },
        {
          name: INPUTS.NAME, value: client.name, placeholder: 'Имя', required: true,
        },
        {
          name: INPUTS.LASTNAME, value: client.lastName, placeholder: 'Отчество', required: false,
        },
      ];

      clientInputs.forEach((item) => {
        const clientLabel = crElem('label', CLASSES.clientLabel);
        const clientInput = crElem('input', CLASSES.clientInput);
        const placeholder = crElem('div', CLASSES.placeholder, item.placeholder);

        if (item.required) {
          const mark = crElem('span', '', '*');
          placeholder.append(mark);
        }

        setAttributes(clientInput, {
          name: item.name, 'data-type': 'text', placeholder: ' ',
        });

        if (toChange) setAttributes(clientInput, { value: item.value });

        clientLabel.append(clientInput);
        clientLabel.append(placeholder);
        clientElem.append(clientLabel);
      });

      return clientElem;
    }

    // создать форму для ввода контактов
    function createContacts() {
      const contacts = crElem('figure', CLASSES.clientContacts);
      const contactsWrap = crElem('div', CLASSES.clientContactsWrap);
      const tippy = crElem('div', CLASSES.tippy, 'Удалить контакт');
      const contactBtn = crElem('button', CLASSES.contactBtn, 'Добавить контакт');
      const contactBtnWrap = crElem('span', CLASSES.contactBtnWrap);
      const contactBtnCircle = crElem('span', CLASSES.contactBtnCircle);
      const mark = '<svg class="contact-btn__svg" width="7" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M3.33333 0C2.96667 0 2.66667 0.3 2.66667 0.666667V2.66667H0.666667C0.3 2.66667 0 2.96667 0 3.33333C0 3.7 0.3 4 0.666667 4H2.66667V6C2.66667 6.36667 2.96667 6.66667 3.33333 6.66667C3.7 6.66667 4 6.36667 4 6V4H6C6.36667 4 6.66667 3.7 6.66667 3.33333C6.66667 2.96667 6.36667 2.66667 6 2.66667H4V0.666667C4 0.3 3.7 0 3.33333 0Z" fill="#9873FF"/></svg>';

      setAttributes(tippy, { id: 'tippy-delete' });
      setAttributes(contactBtn, { type: 'button' });
      contactBtnCircle.innerHTML = mark;

      if (toChange) {
        client.contacts.forEach((data) => {
          const contact = createContact(data);
          contactsWrap.append(contact);
          setClasses(contacts, CLASSES.extend);
          setClasses(contactsWrap, CLASSES.extend);
        });
      }

      contactBtn.addEventListener('click', () => {
        const contact = createContact();
        contactsWrap.append(contact);
        // initSelect();
        const quantity = document.querySelectorAll(`.${CLASSES.contactItem}`).length;

        switch (quantity) {
          case 1:
            setClasses(contacts, CLASSES.extend);
            setClasses(contactsWrap, CLASSES.extend);
            break;
          case 10:
            setClasses(contactBtn, CLASSES.hide);
            break;
          default:
            break;
        }
      });

      contactBtnWrap.append(contactBtnCircle);
      contactBtn.append(contactBtnWrap);
      contactsWrap.append(tippy);
      contacts.append(contactsWrap);
      contacts.append(contactBtn);

      return contacts;
    }

    // содать элемент с кнопками сохранить/отменить/удалить
    modalForm.addEventListener('submit', (el) => {
      el.preventDefault();
      const inputs = modalForm.getElementsByTagName('input');

      const newClient = {};
      const contacts = [];

      [...inputs].forEach((item) => {
        if (item.name === INPUTS.NAME || item.name === INPUTS.SURNAME
          || item.name === INPUTS.LASTNAME) {
          newClient[item.name] = firstLetterUp(item.value.trim());
        }

        const contact = {};
        if (item.name === 'contacts') {
          const select = item.previousElementSibling.firstElementChild.firstElementChild;

          contact.type = select.value;
          contact.value = item.value.trim();
          contacts.push(contact);
          newClient[item.name] = contacts;
        }
      });

      onSave(newClient, modal.container, client.id);
    });

    modalHead.btnClose.addEventListener('click', () => onClose(modal.container));
    modal.overlay.addEventListener('click', () => onClose(modal.container));

    modalForm.append(createClient());
    modalForm.append(createContacts());
    modalForm.append(btns.wrapper);
    modal.wrapper.append(modalHead.header);
    modal.wrapper.append(modalForm);
    modal.inner.append(modal.wrapper);
    modal.container.append(modal.overlay);
    modal.container.append(modal.inner);

    return modal.container;
  }

  // создать кнопку Добавить клиента под таблицей
  function createAddBtn() {
    const btn = crElem('button', CLASSES.transparentBtn);
    const innerBtn = '<svg width="23" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 8C16.71 8 18.5 6.21 18.5 4C18.5 1.79 16.71 0 14.5 0C12.29 0 10.5 1.79 10.5 4C10.5 6.21 12.29 8 14.5 8ZM5.5 6V3H3.5V6H0.5V8H3.5V11H5.5V8H8.5V6H5.5ZM14.5 10C11.83 10 6.5 11.34 6.5 14V16H22.5V14C22.5 11.34 17.17 10 14.5 10Z" fill="#9873FF"/></svg>Добавить клиента';

    btn.innerHTML = innerBtn;
    setAttributes(btn, { disabled: '' });
    return btn;
  }

  // заполнить таблицу с клиентами
  function renderTable(clients, { onClose, onDelete }) {
    clients.length === 0 ? emptyTable() : deleteElement(document.querySelector(`.${CLASSES.serverErr}`));
    deleteElement(document.querySelector(`.${CLASSES.loader}`));
    const tBody = document.querySelector('.tbody');
    tBody.innerHTML = '';

    clients.forEach((client) => {
      createClientItem(client, { onClose, onDelete });
    });

    // eslint-disable-next-line no-undef
    tippy('.tt', {
      content(reference) {
        const id = reference.getAttribute('data-template');
        const template = document.getElementById(id);
        return template.innerHTML;
      },

      allowHTML: true,
      trigger: 'mouseenter click',
      hideOnClick: true,
      interactive: true,
    });
  }

  // вывести сообщение об ошибках в модальное окно
  function showError(status, errors) {
    const previousMessage = document.querySelector(`.${CLASSES.clientErr}`);
    const sibling = document.querySelector(`.${CLASSES.clientContacts}`);

    if (previousMessage) {
      sibling.classList.remove(CLASSES.showErr);
      deleteElement(previousMessage);
    }

    const errElem = crElem('div', CLASSES.clientErr);
    const errInner = crElem('p', CLASSES.clientErrText);
    const errList = errors.map((error) => error.message);
    let message;

    status === 404 ? message = errors : null;
    status === 422 ? message = errList.join(',<br>') : null;
    (status > 499 && status < 600) ? message = 'странно, но сервер сломался :(<br>Обратитесь к куратору Skillbox, чтобы решить проблему' : null;

    mesage = message || 'Что-то пошло не так...';
    errInner.innerHTML = `Ошибка: ${message}`;

    setClasses(sibling, CLASSES.showErr);
    errElem.append(errInner);
    sibling.after(errElem);
  }

  // получить данные из db.json
  async function loadData({ onClose, onDelete }, parameters = {}) {
    deleteElement(document.querySelector(`.${CLASSES.serverErr}`));
    searchReset();
    const column = parameters.column || 'id';
    const fullReset = parameters.doReset || false;
    const btn = document.querySelector(`.${CLASSES.transparentBtn}`);

    try {
      // await fetch(`${URL}?search=${search}`); если поиск без автодополнения
      await fetch(URL);
    } catch (err) {
      setAttributes(btn, { disabled: '' });
      connectionErr();
      return;
    }

    document.querySelector(`.${CLASSES.tbody}`).classList.remove('empty');
    btn.removeAttribute('disabled');
    // const response = await fetch(`${URL}?search=${search}`); если поиск без автодополнения
    const response = await fetch(URL);
    const clients = await response.json();

    const newClients = clients.map((item) => {
      item.fullName = item.surname + item.name + item.lastName;
      return item;
    });

    let newArr;
    function byField(field, param) {
      return (a, b) => (a[field] > b[field] ? param : -param);
    }

    function reset(except) {
      document.querySelectorAll('[data-sort]').forEach((item) => {
        const el = item.getAttribute('id');
        if (el !== except) {
          setAttributes(item, { 'data-sort': 'false' });
        }
      });
    }

    if (fullReset) {
      reset();
    } else reset(column);

    document.querySelectorAll('.sorted').forEach((item) => {
      item.classList.remove('sorted');
    });

    const item = document.getElementById(column);
    const status = item.getAttribute('data-sort');
    setClasses(item, ['sorted']);
    switch (status) {
      case 'false':
        setAttributes(item, { 'data-sort': 'isUp' });
        newArr = newClients.sort(byField(column, 1));
        break;
      case 'isUp':
        setAttributes(item, { 'data-sort': 'isDown' });
        newArr = newClients.sort(byField(column, -1));
        break;
      default:
        setAttributes(item, { 'data-sort': 'isUp' });
        newArr = newClients.sort(byField(column, 1));
        break;
    }

    renderTable(newArr, { onClose, onDelete });
  }

  // открыть карточку клиента - если есть hash в URL
  async function openClientCard(clientID, { onSave, onClose, onDelete }) {
    const response = await fetch(`${URL}/${clientID}`);
    const client = await response.json();
    if (response.ok) {
      const modalElement = createModalWithForm(client, { onSave, onClose, onDelete }, 'change');
      DOM.main.append(modalElement);
      animateOpen();
      window.location.hash = clientID;
    } else {
      clientNotFound(clientID, { onClose });
    }
  }

  // создать приложение
  function createCrmApp() {
    // первоначальная отрисовка таблицы
    const container = crElem('section', CLASSES.container);
    const header = createHeader();
    const appTitle = crElem('h1', CLASSES.appTitle, 'Клиенты');
    const initTable = createTable();
    const addBtn = createAddBtn();

    const client = {
      id: null,
      name: null,
      surname: null,
      lastname: null,
      createdAt: null,
      updatedAt: null,
      contacts: [],
    };

    DOM.header.append(header);
    DOM.main.append(container);
    container.append(appTitle);
    container.append(initTable);
    container.append(addBtn);

    // функция удалить данные о клиенте на сервере и из таблицы
    async function onDelete(modalElement, id) {
      searchReset();
      await fetch(`${URL}/${id}`, {
        method: 'DELETE',
      });
      document.getElementById(id).remove();
      animateClose();
      setTimeout(deleteElement, 300, modalElement);
    }

    // закрытие модельного окна
    function onClose(modalElement) {
      animateClose();
      setTimeout(deleteElement, 500, modalElement);
      // eslint-disable-next-line no-restricted-globals
      history.pushState('', document.title, window.location.pathname);
    }

    // сохранение формы
    async function onSave(formData, modalElement, id) {
      const inputs = modalElement.getElementsByTagName('input');
      const btn = modalElement.querySelector(`.${CLASSES.contactBtn}`);
      const isValid = validate(inputs);

      if (isValid) {
        [...inputs].forEach((item) => setAttributes(item, { disabled: '' }));
        setAttributes(btn, { disabled: '' });
        const methodType = id ? 'PATCH' : 'POST';
        const request = id ? `${URL}/${id}` : `${URL}`;
        const response = await fetch(request, {
          method: methodType,
          body: JSON.stringify(formData),
          headers: {
            'Content-Type': 'application.json()',
          },
        });

        const data = await response.json();

        if (response.ok) {
          // eslint-disable-next-line no-restricted-globals
          history.pushState('', document.title, window.location.pathname);
          animateClose();
          setTimeout(deleteElement, 500, modalElement);
          setTimeout(loadData, 500, { onClose, onDelete }, { doReset: true });
        } else {
          showError(response.status, data.errors);
        }
      }
    }

    // реализация сортировки
    const sortBtn = document.querySelectorAll(`.${CLASSES.sortBtn}`);
    sortBtn.forEach((el) => {
      el.addEventListener('click', () => {
        searchReset();
        loadData({ onClose, onDelete }, { column: el.getAttribute('id') });
      });
    });

    // если нет ответа от сервера
    emptyTable(true);

    // проверка наличия hash в url при первичной загрузке и открытие модального окна, если hash есть
    if (window.location.hash) {
      openClientCard(window.location.hash.slice(1), { onSave, onClose, onDelete });
    }
    loadData({ onSave, onClose, onDelete }, {});

    // добавление клиента
    addBtn.addEventListener('click', () => {
      const modalElement = createModalWithForm(client, { onSave, onClose, onDelete });
      container.append(modalElement);
      animateOpen();
    });

    // событие - изменение hash
    window.addEventListener('hashchange', () => {
      deleteElement(document.querySelector(`.${CLASSES.spinner}`));
      const svg = document.querySelector(`.${CLASSES.actionsSvg}.${CLASSES.hide}`);
      if (svg) svg.classList.remove(CLASSES.hide);
      const btn = document.querySelector('[disabled]');
      if (btn) btn.removeAttribute('disabled');
      openClientCard(window.location.hash.slice(1), { onSave, onClose, onDelete });
    });
  }

  window.createCrmApp = createCrmApp;
})();
