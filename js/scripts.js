"use sctrict";

//Список телефонов
const listPhone = () => {
  const btnArrow = document.getElementsByClassName("header-contacts__arrow")[0],
    arrow = btnArrow.querySelector("img"),
    div = document.getElementsByClassName(
      "header-contacts__phone-number-accord"
    )[0];

  btnArrow.addEventListener("click", () => {
    if (arrow.style.transform === "rotate(180deg)") {
      arrow.style.transform = "rotate(0)";
      div.querySelector("a").style.opacity = 0;
      div.style.position = "absolute";
    } else {
      arrow.style.transform = "rotate(180deg)";
      div.style.position = "relative";
      div.querySelector("a").style.opacity = 1;
    }
  });
};

//плавная прокрутка до индетификатора
const smoothScroll = (identifier) => {
  const blockID = identifier.substr(1);

  document.getElementById(blockID).scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

//события для модальных окон
const modalAddEventListener = () => {
  //бургер
  const btnMenu = document.getElementsByClassName("menu__icon")[0],
    popupMenu = document.getElementsByClassName("popup-dialog-menu")[0],
    btnClose = document.getElementsByClassName("close-menu")[0],
    //кнопка вверх
    btnFooter = document.getElementsByClassName("button-footer")[0],
    //Полный список
    pupupRepair = document.querySelector(".popup-repair-types"),
    //Политика конфедициальности
    popupPrivacy = document.querySelector(".popup-privacy"),
    //Договоры
    popupTransparency = document.querySelector(".popup-transparency"),
    //Disings
    popupDising = document.querySelector(".popup-design"),
    //Консультация
    popupConsultation = document.querySelector(".popup-consultation");

  document.addEventListener("click", (event) => {
    const target = event.target;

    const scroll = (href) => {
      event.preventDefault();
      smoothScroll(href);
      popupMenu.removeAttribute("style");
    };

    //открыть бургер меню
    if (target === btnMenu) {
      popupMenu.style.transform = "translate3d(0, 0, 0)";
    }
    //закрыть бургер меню
    else if (
      target === btnClose ||
      (popupMenu.style.transform === "translate3d(0px, 0px, 0px)" &&
        !target.closest("." + popupMenu.classList[0]))
    ) {
      popupMenu.removeAttribute("style");
    }
    //плавный скрол для элементов бургера
    else if (target.closest(".popup-menu-nav__item")) {
      scroll(target.getAttribute("href"));
    }
    //плавный скрол для кнопки ВВЕРХ
    else if (target.closest("." + btnFooter.classList[0])) {
      scroll(btnFooter.querySelector("a").getAttribute("href"));
    }
    //открыть модальное окно "Полный список услуг и цен"
    else if (
      target.closest(".link-list-repair") ||
      target.closest(".link-list-menu")
    ) {
      popupMenu.removeAttribute("style");
      pupupRepair.style.visibility = "visible";
    }
    //закрыть модальное окно "Полный список услуг и цен"
    else if (
      (target.classList.contains("close") &&
        target.closest(".popup-repair-types")) ||
      target === pupupRepair
    ) {
      pupupRepair.style.visibility = "hidden";
    }
    //открыть модальное окно "политика"
    else if (target.classList.contains("link-privacy")) {
      popupPrivacy.style.visibility = "visible";
    }
    //закрыть модальное окно "политика"
    else if (
      (target.classList.contains("close") &&
        target.closest(".popup-privacy")) ||
      target === popupPrivacy
    ) {
      popupPrivacy.style.visibility = "hidden";
    }
    //открыть модальное окно "Договоры"
    else if (target.classList.contains("transparency-item__img")) {
      popupTransparency.style.visibility = "visible";
    }
    //закрыть модальное окно "Договоры"
    else if (
      (target.classList.contains("close") &&
        target.closest(".popup-transparency")) ||
      target === popupTransparency
    ) {
      popupTransparency.style.visibility = "hidden";
    }
    //открыть модальное окно "Disings"
    else if (target.closest(".link-list-designs") && target.closest("a")) {
      popupDising.style.visibility = "visible";
    }
    //закрыть модальное окно "Disings"
    else if (
      (target.classList.contains("close") && target.closest(".popup-design")) ||
      target === popupDising
    ) {
      popupDising.style.visibility = "hidden";
    }
    //открыть модальное окно "Консультация"
    else if (target.closest(".button_wide")) {
      popupConsultation.style.visibility = "visible";
    }
    //закрыть модальное окно "Консультация"
    else if (
      (target.classList.contains("close") && target.closest(".popup-consultation")) ||
      target === popupConsultation
    ) {
      popupConsultation.style.visibility = "hidden";
    }
  });
};

//Маска для телефона 
function maskPhone(selector, masked = "+7 (___) ___-__-__") {
  const elems = document.querySelectorAll("#" + selector);

  function mask(event) {
    const keyCode = event.keyCode;
    const template = masked,
      def = template.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    let i = 0,
      newValue = template.replace(/[_\d]/g, function (a) {
        return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
      });
    i = newValue.indexOf("_");
    if (i != -1) {
      newValue = newValue.slice(0, i);
    }
    let reg = template
      .substr(0, this.value.length)
      .replace(/_+/g, function (a) {
        return "\\d{1," + a.length + "}";
      })
      .replace(/[+()]/g, "\\$&");
    reg = new RegExp("^" + reg + "$");
    if (
      !reg.test(this.value) ||
      this.value.length < 5 ||
      (keyCode > 47 && keyCode < 58)
    ) {
      this.value = newValue;
    }
    if (event.type == "blur" && this.value.length < 5) {
      this.value = "";
    }
  }

  for (const elem of elems) {
    elem.addEventListener("input", mask);
    elem.addEventListener("focus", mask);
    elem.addEventListener("blur", mask);
  }
}

//Подсказка
const helper = (containerSelector, elements, popup, activeClass, activeClassFor) => {
  console.log('activeClass: ', activeClass);
  const container = document.querySelector(containerSelector),
    items = document.querySelectorAll(elements);

  function getPosition(element) {
    let yPosition = 0;

    while (element) {
      yPosition += element.offsetTop - element.scrollTop + element.clientTop;
      element = element.offsetParent;
    }

    return yPosition;
  }

  container.addEventListener("mouseover", (event) => {
    const target = event.target;
    

    if (target.closest(elements)) {
      const targetElement = target.closest(elements);

      targetElement.style.color ="#fff";

      items.forEach((element) => {
        if (element === targetElement.closest(elements)) {
          const link = targetElement.parentNode.querySelector(popup);
          link.setAttribute("style", "");
          link.style.visibility = "visible";
          link.parentNode.parentNode
            .querySelector(activeClassFor)
            .classList.add(activeClass);

          link.style.opacity = 1;

          if (window.scrollY <= getPosition(link)) {
            link.classList.remove("transform");
          } else {
            link.style.paddingTop = "35px";
            link.style.top = "155px";
            link.classList.add("transform");
          }
        }
      });
    }
  });

  container.addEventListener("mouseout", (event) => {
    const target = event.target;

    if (target.closest(elements)) {
      const targetElement = target.closest(elements);

      targetElement.style.color = "#000";

      items.forEach((element) => {
        if (element === targetElement.closest(elements)) {
          const link = targetElement.parentNode.querySelector(popup);
          link.setAttribute("style", "");
          link.style.visibility = "visible";
          link.parentNode.parentNode
            .querySelector(activeClassFor)
            .classList.remove(activeClass);

          link.setAttribute("style", "");
        }
      });
    }

  });
};

//Слайдеры
class Slider {
  constructor({
    containerId,
    slidersSelector,
    visibleSlide,
    arrowLeft,
    arrowRight,
    activeClass,
    display,
    counterNow,
    counterMax,
    bottons,
    activeClassToButton,
    type,
    arrowOffOnLastSlide,
  }) {
    this.container = document.getElementById(containerId);
    this.sliders = this.container.querySelectorAll(slidersSelector);
    this.slideNumber = 0;
    this.visibleSlide = visibleSlide ? +visibleSlide : 1;
    this.maxSlideCount = this.sliders.length;
    this.activeClass = activeClass;
    this.arrowLeft = this.container.querySelector(arrowLeft);
    this.arrowRight = this.container.querySelector(arrowRight);
    this.display = display;
    this.counterNow = this.container.querySelector(counterNow);
    this.counterMax = this.container.querySelector(counterMax);
    this.bottons = this.container.querySelectorAll(bottons);
    this.activeClassToButton = activeClassToButton;
    this.type = type ? type : "block";
    this.arrowOffOnLastSlide = arrowOffOnLastSlide;
  }

  init() {
    if (this.type !== "transform") {
      this.setVisibleSlide();
    }
    if (this.counterNow) {
      this.counterNow.textContent = this.slideNumber + 1;
    }
    if (this.counterMax) {
      this.counterMax.textContent = this.maxSlideCount;
    }
    if (this.arrowOffOnLastSlide && this.arrowOffOnLastSlide === true) {
      this.setVisibleArrow();
    }
    this.addEventListener();
  }

  setVisibleSlide(start = 0) {
    this.sliders.forEach((elem) => (elem.style.display = "none"));

    for (let i = 0; i < this.maxSlideCount && i < this.visibleSlide; i++) {
      this.sliders[i + start].style.display = this.display;
    }
  }

  slideTo(slideNumber) {
    const visivleSlide = this.visibleSlide - 1;
    if (this.activeClass) {
      this.sliders[this.slideNumber].classList.remove(this.activeClass);
    }
    if (this.activeClassToButton) {
      this.bottons[this.slideNumber].classList.remove(this.activeClassToButton);
    }

    this.slideNumber = slideNumber;

    if (this.slideNumber < 0) {
      this.slideNumber = this.maxSlideCount - 1 - visivleSlide;
    } else if (this.slideNumber + visivleSlide >= this.maxSlideCount) {
      this.slideNumber = 0;
    }

    if (this.type !== "transform") {
      this.setVisibleSlide(this.slideNumber);
    } else {
      let allWidth = 0;
      for (let i = 0; i < this.slideNumber; i++) {
        let offsetWidth = this.sliders[i].offsetWidth;
        allWidth += offsetWidth * 0.049 + offsetWidth;
      }
      this.sliders[0].parentNode.style.transform = `translateX(${
        allWidth * -1
      }px)`;
    }

    if (this.counterNow) {
      this.counterNow.textContent = this.slideNumber + 1;
    }

    if (this.counterMax) {
      this.counterMax.textContent = this.maxSlideCount;
    }

    if (this.activeClass) {
      this.sliders[this.slideNumber].classList.add(this.activeClass);
    }

    if (this.activeClassToButton) {
      this.bottons[this.slideNumber].classList.add(this.activeClassToButton);
    }

    if (this.arrowOffOnLastSlide && this.arrowOffOnLastSlide === true) {
      this.setVisibleArrow();
    }
  }

  setVisibleArrow() {
    if (this.slideNumber === 0) {
      this.arrowLeft.style.display = "none";
    } else if (
      this.slideNumber ===
      this.maxSlideCount - this.visibleSlide
    ) {
      this.arrowRight.style.display = "none";
    } else {
      this.arrowLeft.style.display = "flex";
      this.arrowRight.style.display = "flex";
    }
  }

  slideNext() {
    this.slideTo(this.slideNumber + 1);
  }

  slidePrev() {
    this.slideTo(this.slideNumber - 1);
  }

  addEventListener() {
    this.container.addEventListener("click", (event) => {
      const target = event.target;
      if (this.arrowLeft && this.arrowRight) {
        if (target.closest("#" + this.arrowLeft.id)) {
          this.slidePrev();
        } else if (target.closest("#" + this.arrowRight.id)) {
          this.slideNext();
        }
      }

      if (this.bottons) {
        this.bottons.forEach((elem, index) => {
          if (target === elem) {
            this.slideTo(index);
          }
        });
      }
    });
  }
}

//временная функция
const tempFunc = () =>{
  //Список телефонов
  listPhone();

  //Бургер меню
  modalAddEventListener();

  //Маска для телефона
  const listInputPhone = document.querySelectorAll("input[name='phone']");
  listInputPhone.forEach((elem) => maskPhone(elem.id));

  

  //Слайдер: Виды ремонта
  let sliderRepairDop = new Slider({
    containerId: "repair-types",
    slidersSelector: `.types-repair1 > div`,
    arrowLeft: "#repair-types-arrow_left",
    arrowRight: "#repair-types-arrow_right",
    activeClass: "active-item",
    display: "block",
    counterNow: ".slider-counter-content__current",
    counterMax: ".slider-counter-content__total",
  });
  sliderRepairDop.init();

  let sliderRepair = new Slider({
    containerId: "repair-types",
    slidersSelector: ".repair-types-slider > div",
    bottons: ".nav-list > button",
    display: "block",
    activeClassToButton: "active",
  });
  sliderRepair.init();

  const repairTypes = document.getElementById("repair-types");
  repairTypes.addEventListener('click', (event) => {
    const target = event.target;

    if(target.parentNode.classList.contains("nav-list-repair")){
      delete sliderRepairDop;
      sliderRepairDop = new Slider({
        containerId: "repair-types",
        slidersSelector: `.types-repair${sliderRepair.slideNumber + 1} > div`,
        arrowLeft: "#repair-types-arrow_left",
        arrowRight: "#repair-types-arrow_right",
        activeClass: "active-item",
        display: "block",
        counterNow: ".slider-counter-content__current",
        counterMax: ".slider-counter-content__total",
      });
      sliderRepairDop.init();
    }
  });
  
  if (document.documentElement.clientWidth < 1025){
    new Slider({
      containerId: "repair-types",
      slidersSelector: ".nav-list > button",
      arrowLeft: "#nav-arrow-repair-left_base",
      arrowRight: "#nav-arrow-repair-right_base",
      type: "transform",
    }).init();
  }

  //Слайдер: Портфолио
  if (document.documentElement.clientWidth > 1140) {
    new Slider({
      containerId: "portfolio",
      visibleSlide: "3",
      slidersSelector: ".portfolio-slider__slide",
      arrowLeft: "#portfolio-arrow_left",
      arrowRight: "#portfolio-arrow_right",
      display: "flex",
      arrowOffOnLastSlide: true,
    }).init();
  } else if (document.documentElement.clientWidth > 900) {
    new Slider({
      containerId: "portfolio",
      visibleSlide: "2",
      slidersSelector: ".portfolio-slider__slide",
      arrowLeft: "#portfolio-arrow_left",
      arrowRight: "#portfolio-arrow_right",
      display: "flex",
      arrowOffOnLastSlide: true,
    }).init();
  } else if (document.documentElement.clientWidth > 575) {
    new Slider({
      containerId: "portfolio",
      visibleSlide: "1",
      slidersSelector: ".portfolio-slider__slide",
      arrowLeft: "#portfolio-arrow_left",
      arrowRight: "#portfolio-arrow_right",
      display: "flex",
      arrowOffOnLastSlide: true,
    }).init();
  } else {
    new Slider({
      containerId: "portfolio",
      visibleSlide: "1",
      slidersSelector: ".portfolio-slider-mobile .portfolio-slider__slide-frame",
      arrowLeft: "#portfolio-arrow-mobile_left",
      arrowRight: "#portfolio-arrow-mobile_right",
      display: "flex",
      arrowOffOnLastSlide: true,
      counterNow: ".slider-counter-content__current",
      counterMax: ".slider-counter-content__total",
    }).init();

    //P.s кнопку прожать не могу, этот коментарий уберу в финальной версии
    // setInterval(function () {
    //   // таймер-планировщик
    //   document.getElementById("portfolio-arrow-mobile_right").click(); // вызвать клик на кнопку
    // }, 2000); // через две секунды
  }

  //Слайдер: Документы
  const docSlider = new Slider({
    containerId: "transparency",
    slidersSelector: ".transparency-item",
    arrowLeft: "#transparency-arrow_left",
    arrowRight: "#transparency-arrow_right",
    display: "flex",
    visibleSlide: 1,
  });
  if (document.documentElement.clientWidth <= 1090){
    docSlider.visibleSlide = 1;
  }else{
    docSlider.visibleSlide = 3;
  }
  docSlider.init();

  window.addEventListener(`resize`, event => {
    if (document.documentElement.clientWidth <= 1090) {
      docSlider.visibleSlide = 1;
    } else {
      docSlider.visibleSlide = 3;
    }
    docSlider.init();
  }, false);


  const openDocSlider = new Slider({
    containerId: "popup-transparencyId",
    slidersSelector: ".popup-transparency-slider__slide",
    display: "flex",
    arrowLeft: "#transparency_left",
    arrowRight: "#transparency_right",
    counterNow: ".slider-counter-content__current",
    counterMax: ".slider-counter-content__total",
  });
  openDocSlider.init();
  

  //Слайдер: Отзывы
  const reviewsSlider = new Slider({
    containerId: "reviews",
    slidersSelector: ".reviews-slider__slide",
    arrowLeft: "#reviews-arrow_left",
    arrowRight: "#reviews-arrow_right",
    display: "flex"
  });
  reviewsSlider.init();

  //Слайдер: Карусель
  if (document.documentElement.clientWidth > 675){
    new Slider({
      containerId: "partners",
      visibleSlide: "3",
      slidersSelector: ".partners-slider__slide",
      arrowLeft: "#partners-arrow_left",
      arrowRight: "#partners-arrow_right",
      display: "block",
    }).init();
  }else{
    new Slider({
      containerId: "partners",
      visibleSlide: "1",
      slidersSelector: ".partners-slider__slide",
      arrowLeft: "#partners-arrow_left",
      arrowRight: "#partners-arrow_right",
      display: "block",
    }).init();
  }

  //Табы + слайдер
  let sliderDising = new Slider({
    containerId: "designs",
    slidersSelector: ".designs-slider > div",
    bottons: ".nav-list > button",
    display: "block",
    activeClassToButton: "active",
  });
  sliderDising.init();

 let sliderDisingDop = new Slider({
   containerId: "designs",
   slidersSelector: `.designs-slider__style1 > div`,
   arrowLeft: "#design_left",
   arrowRight: "#design_right",
   display: "block",
   counterNow: ".slider-counter-content__current",
   counterMax: ".slider-counter-content__total",
   activeClassToButton: "preview_active",
   bottons: ".visible .preview-block__item-inner",
 });
 sliderDisingDop.init();

 const dicing = document.getElementById("designs");
 dicing.addEventListener("click", (event) => {
   const target = event.target;

   if (target.parentNode.classList.contains("nav-list-designs")) {
     delete sliderDisingDop;
     let buttonImg = dicing.querySelector(".visible");
     if (buttonImg){
      buttonImg.classList.remove("visible");
      buttonImg = dicing.querySelectorAll(".preview-block");
       buttonImg[sliderDising.slideNumber].classList.add("visible");
     }
     
     sliderDisingDop = new Slider({
       containerId: "designs",
       slidersSelector: `.designs-slider__style${sliderDising.slideNumber + 1} > div`,
       arrowLeft: "#design_left",
       arrowRight: "#design_right",
       display: "block",
       counterNow: ".slider-counter-content__current",
       counterMax: ".slider-counter-content__total",
       activeClassToButton: "preview_active",
       bottons: ".visible .preview-block__item-inner",
     });
     sliderDisingDop.init();
     
   }
 });

  let sliderDisingCarousel = new Slider({
    containerId: "designs",
    slidersSelector: ".nav-list > button",
    arrowLeft: "#nav-arrow-designs_left",
    arrowRight: "#nav-arrow-designs_right",
    type: "transform",
  });
  sliderDisingCarousel.init();


  //Табы + слайдер (Модальное окно)
  let sliderDisingModal = new Slider({
    containerId: "popup-design",
    slidersSelector: ".popup-design-slider > div",
    bottons: ".nav-list > button",
    display: "block",
    activeClassToButton: "active",
  });
  sliderDisingModal.init();

 let sliderDisingModalDop = new Slider({
   containerId: "popup-design",
   slidersSelector: `.popup-designs-slider__style1 > div`,
   arrowLeft: "#popup_design_left",
   arrowRight: "#popup_design_right",
   display: "block",
   counterNow: ".slider-counter-content__current",
   counterMax: ".slider-counter-content__total",
 });
 sliderDisingModalDop.init();

 const dicingModal = document.getElementById("popup-design");
 dicingModal.addEventListener("click", (event) => {
   const target = event.target;

   if (target.parentNode.classList.contains("nav-list-designs")) {
     delete sliderDisingModalDop;
     let buttonContent = dicingModal.querySelector(".visible-content-block");
     if (buttonContent) {
       buttonContent.classList.remove("visible-content-block");
       buttonContent = dicingModal.querySelectorAll(".popup-design-text");
       buttonContent[sliderDisingModal.slideNumber].classList.add("visible-content-block");
     }
     sliderDisingModalDop = new Slider({
       containerId: "popup-design",
       slidersSelector: `.popup-designs-slider__style${sliderDisingModal.slideNumber + 1} > div`,
       arrowLeft: "#popup_design_left",
       arrowRight: "#popup_design_right",
       display: "block",
       counterNow: ".slider-counter-content__current",
       counterMax: ".slider-counter-content__total",
     });
     sliderDisingModalDop.init();
     
   }
 });
 let sliderDisingModalCarousel = new Slider({
   containerId: "popup-design",
   slidersSelector: ".nav-list > button",
   arrowLeft: "#nav-arrow-popup-designs_left",
   arrowRight: "#nav-arrow-popup-designs_right",
   type: "transform",
 });
 sliderDisingModalCarousel.init();

 //Подсказка
  if (document.documentElement.clientWidth >= 1025) {
    helper(".formula", ".formula-item__icon-inner-text", ".formula-item-popup", "active-item", ".formula-item__icon-inner");
    helper(".problems", ".svg-wrap", ".problems-item-popup", "active-item", ".problems-item__icon-inner");

  } else {
    new Slider({
      containerId: "formula",
      slidersSelector: ".formula-slider__slide",
      arrowLeft: "#formula-arrow_left",
      arrowRight: "#formula-arrow_right",
      activeClass: "active-item",
      display: "flex",
    }).init();

    new Slider({
      containerId: "problems",
      slidersSelector: ".problems-slider__slide",
      arrowLeft: "#problems-arrow_left",
      arrowRight: "#problems-arrow_right",
      activeClass: "active-item",
      display: "flex",
    }).init();
  }
}


document.addEventListener("DOMContentLoaded", () => {
  tempFunc(); //временная функция

  //Табы 2
  let sliderSchemeModal = new Slider({
    containerId: "scheme",
    slidersSelector: ".scheme-slider > div",
    bottons: ".nav-list > button",
    display: "block",
    activeClassToButton: "active",
  });
  sliderSchemeModal.init();

  let sliderSchemeModal2 = new Slider({
    containerId: "scheme",
    slidersSelector: ".scheme-description-block",
    bottons: ".nav-list > button",
    display: "block",
    activeClass: "visible-content-block",
  });
  sliderSchemeModal2.init();

 let sliderSchemeModalCarousel = new Slider({
   containerId: "scheme",
   slidersSelector: ".nav-list > button",
   arrowLeft: "#nav-arrow-scheme_left",
   arrowRight: "#nav-arrow-scheme_right",
   type: "transform",
 });
 sliderSchemeModalCarousel.init();
});
