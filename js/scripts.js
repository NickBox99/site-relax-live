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

//Бургер меню
//Плавная прокрутка пунктов меню и кнопки вверх
//Модальное окно: Полный список
//Модальное окно: Политика конфедициальности
const burgetMenu = () => {
  //бургер
  const btnMenu = document.getElementsByClassName("menu__icon")[0],
    popupMenu = document.getElementsByClassName("popup-dialog-menu")[0],
    btnClose = document.getElementsByClassName("close-menu")[0],
    //кнопка вверх
    btnFooter = document.getElementsByClassName("button-footer")[0],
    //Полный список
    pupupRepair = document.querySelector(".popup-repair-types"),
    //Политика конфедициальности
    popupPrivacy = document.querySelector(".popup-privacy");

  document.addEventListener("click", (event) => {
    const target = event.target;

    const scroll = (href) => {
      event.preventDefault();
      smoothScroll(href);
      popupMenu.removeAttribute("style");
    };

    if (target === btnMenu) {
      popupMenu.style.transform = "translate3d(0, 0, 0)";
    } else if (
      target === btnClose ||
      (popupMenu.style.transform === "translate3d(0px, 0px, 0px)" &&
        !target.closest("." + popupMenu.classList[0]))
    ) {
      popupMenu.removeAttribute("style");
    } else if (target.closest(".popup-menu-nav__item")) {
      scroll(target.getAttribute("href"));
    } else if (target.closest("." + btnFooter.classList[0])) {
      scroll(btnFooter.querySelector("a").getAttribute("href"));
    } else if (
      target.closest(".link-list-repair") ||
      target.closest(".link-list-menu")
    ) {
      popupMenu.removeAttribute("style");
      pupupRepair.style.visibility = "visible";
    } else if (
      (target.classList.contains("close") &&
        target.closest(".popup-repair-types")) ||
      target === pupupRepair
    ) {
      pupupRepair.style.visibility = "hidden";
    } else if (target.classList.contains("link-privacy")) {
      popupPrivacy.style.visibility = "visible";
    } else if (
      (target.classList.contains("close") &&
        target.closest(".popup-privacy")) ||
      target === popupPrivacy
    ) {
      popupPrivacy.style.visibility = "hidden";
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
const helperDestop = () => {
  const formula = document.querySelector(".formula"),
    formulaItems = document.querySelectorAll(".formula-item__icon-inner-text");

  formula.addEventListener("mouseover", (event) => {
    const target = event.target;

    if (target.closest(".formula-item__icon-inner-text")) {
      formulaItems.forEach((element) => {
        if (element === target) {
          const link = formula.querySelector(
            ".formula-item-popup-" + element.textContent
          );

          link.style.visibility = "visible";
          link.parentNode.parentNode.classList.add("active-item");
          link.style.opacity = 1;
        }
      });
    }
  });

  formula.addEventListener("mouseout", (event) => {
    const target = event.target;

    if (target.closest(".formula")) {
      formulaItems.forEach((element) => {
        const link = formula.querySelector(
          ".formula-item-popup-" + element.textContent
        );

        link.parentNode.parentNode.classList.remove("active-item");
        link.style.visibility = "hidden";
      });
    }
  });
};

//Подсказка мобильная версия
//Слайдер: Виды ремонта
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
    arrowOffOnLastSlide
  }) {
    this.container = document.getElementById(containerId);
    this.sliders = this.container.querySelectorAll(slidersSelector);
    this.slideNumber = 0;
    this.visibleSlide = (visibleSlide)? +visibleSlide : 1;
    this.maxSlideCount = this.sliders.length;
    this.activeClass = activeClass;
    this.arrowLeft = this.container.querySelector(arrowLeft);
    this.arrowRight = this.container.querySelector(arrowRight);
    this.display = display;
    this.counterNow = this.container.querySelector(counterNow);
    this.counterMax = this.container.querySelector(counterMax);
    this.bottons = this.container.querySelectorAll(bottons);
    this.activeClassToButton = activeClassToButton;
    this.type = type;
    this.arrowOffOnLastSlide = arrowOffOnLastSlide;
  }

  init() {
    if (this.type !== "transform"){
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

  setVisibleSlide(start = 0){

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
    if (this.type !== "transform"){
      
    }

    this.slideNumber = slideNumber;

    if (this.slideNumber < 0) {
      this.slideNumber = this.maxSlideCount - 1 - visivleSlide;
    } else if (this.slideNumber + visivleSlide >= this.maxSlideCount) {
      this.slideNumber = 0;
    }

    if (this.type !== "transform") {
      this.setVisibleSlide(this.slideNumber);
    }else{
      let allWidth = 0;
      for(let i = 0; i < this.slideNumber; i++){
        let offsetWidth = this.sliders[i].offsetWidth;
        allWidth += (offsetWidth * 0.049) + offsetWidth;
      }
      this.sliders[0].parentNode.style.transform = `translateX(${allWidth*-1}px)`;
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

    if(this.arrowOffOnLastSlide && this.arrowOffOnLastSlide === true){
      this.setVisibleArrow();
    }
  }

  setVisibleArrow(){
    if (this.slideNumber === 0) {
      this.arrowLeft.style.display = "none";
    } else if (this.slideNumber === this.maxSlideCount - 2 - this.visibleSlide) {
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

document.addEventListener("DOMContentLoaded", () => {
  //Список телефонов
  listPhone();

  //Бургер меню
  burgetMenu();

  //Маска для телефона
  const listInputPhone = document.querySelectorAll("input[name='phone']");
  listInputPhone.forEach((elem) => maskPhone(elem.id));

  //Подсказка
  if (document.documentElement.clientWidth >= 1025) {
    helperDestop();
  } else {
    new Slider({
      containerId: "formula",
      slidersSelector: ".formula-slider__slide",
      arrowLeft: "#formula-arrow_left",
      arrowRight: "#formula-arrow_right",
      activeClass: "active-item",
      display: "flex",
    }).init();
  }

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
  if (document.documentElement.clientWidth <= 1090){
    new Slider({
      containerId: "transparency",
      slidersSelector: ".transparency-item",
      arrowLeft: "#transparency-arrow_left",
      arrowRight: "#transparency-arrow_right",
      display: "flex",
    }).init();
  }

  //Слайдер: Отзывы
  const reviewsSlider = new Slider({
    containerId: "reviews",
    slidersSelector: ".reviews-slider__slide",
    arrowLeft: "#reviews-arrow_left",
    arrowRight: "#reviews-arrow_right",
    display: "flex"
  });
  reviewsSlider.init();
  console.log(reviewsSlider.sliders);



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

});
