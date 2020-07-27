require("@babel/polyfill");
import "nodelist-foreach-polyfill";
import elementClosest from "element-closest";
elementClosest(window);

// import "formdata-polyfill";
import "es6-promise";
import "fetch-polyfill";

import helper from './modules/helper';
import listPhone from "./modules/listPhone";
import maskPhone from "./modules/maskPhone";
import modalAddEventListener from "./modules/modalAddEventListener";
import Slider from "./modules/Slider";

document.addEventListener("DOMContentLoaded", () => {

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
  repairTypes.addEventListener("click", (event) => {
    const target = event.target;

    if (target.parentNode.classList.contains("nav-list-repair")) {
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

  if (document.documentElement.clientWidth < 1025) {
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
      slidersSelector:
        ".portfolio-slider-mobile .portfolio-slider__slide-frame",
      arrowLeft: "#portfolio-arrow-mobile_left",
      arrowRight: "#portfolio-arrow-mobile_right",
      display: "flex",
      arrowOffOnLastSlide: true,
      counterNow: ".slider-counter-content__current",
      counterMax: ".slider-counter-content__total",
    }).init();
  }

  //Слайдер для модального окна: Портфолио
  let sliderPortfolioModal = new Slider({
    containerId: "popup-portfolio",
    slidersSelector: `.popup-portfolio-slider__slide`,
    arrowLeft: "#popup_portfolio_left",
    arrowRight: "#popup_portfolio_right",
    display: "block",
    counterNow: ".slider-counter-content__current",
    counterMax: ".slider-counter-content__total",
  });
  sliderPortfolioModal.init();

  //Слайдер для модального окна: Портфолио(текст)
  let sliderPortfolioModalText = new Slider({
    containerId: "popup-portfolio",
    slidersSelector: `.popup-portfolio-text`,
    arrowLeft: "#popup_portfolio_left",
    arrowRight: "#popup_portfolio_right",
    display: "block",
    counterNow: ".slider-counter-content__current",
    counterMax: ".slider-counter-content__total",
  });
  sliderPortfolioModalText.init();

  //Слайдер: Документы
  const docSlider = new Slider({
    containerId: "transparency",
    slidersSelector: ".transparency-item",
    arrowLeft: "#transparency-arrow_left",
    arrowRight: "#transparency-arrow_right",
    display: "flex",
    visibleSlide: 1,
  });
  if (document.documentElement.clientWidth <= 1090) {
    docSlider.visibleSlide = 1;
  } else {
    docSlider.visibleSlide = 3;
  }
  docSlider.init();

  window.addEventListener(
    `resize`,
    (event) => {
      if (document.documentElement.clientWidth <= 1090) {
        docSlider.visibleSlide = 1;
      } else {
        docSlider.visibleSlide = 3;
      }
      docSlider.setVisibleSlide();
    },
    false
  );

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
    display: "flex",
  });
  reviewsSlider.init();

  //Слайдер: Карусель
  if (document.documentElement.clientWidth > 675) {
    new Slider({
      containerId: "partners",
      visibleSlide: "3",
      slidersSelector: ".partners-slider__slide",
      arrowLeft: "#partners-arrow_left",
      arrowRight: "#partners-arrow_right",
      display: "block",
    }).init();
  } else {
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
      let buttonImg = dicing.querySelector(".visible");
      if (buttonImg) {
        buttonImg.classList.remove("visible");
        buttonImg = dicing.querySelectorAll(".preview-block");
        buttonImg[sliderDising.slideNumber].classList.add("visible");
      }

      sliderDisingDop = new Slider({
        containerId: "designs",
        slidersSelector: `.designs-slider__style${
          sliderDising.slideNumber + 1
        } > div`,
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
      let buttonContent = dicingModal.querySelector(".visible-content-block");
      if (buttonContent) {
        buttonContent.classList.remove("visible-content-block");
        buttonContent = dicingModal.querySelectorAll(".popup-design-text");
        buttonContent[sliderDisingModal.slideNumber].classList.add(
          "visible-content-block"
        );
      }
      sliderDisingModalDop = new Slider({
        containerId: "popup-design",
        slidersSelector: `.popup-designs-slider__style${
          sliderDisingModal.slideNumber + 1
        } > div`,
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
    helper(
      ".formula",
      ".formula-item__icon-inner-text",
      ".formula-item-popup",
      "active-item",
      ".formula-item__icon-inner"
    );
    helper(
      ".problems",
      ".svg-wrap",
      ".problems-item-popup",
      "active-item",
      ".problems-item__icon-inner"
    );
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

  //Ajax
  const sendForm = (id, checker) => {
    const postData = (body) => {
      return fetch("./server.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
    };

    const form = document.getElementById(id);

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!checker(id)) {
        console.error("Данные не заполнены");
        return;
      }

      const formData = new FormData(form);
      let body = {};
      formData.forEach((val, key) => {
        body[key] = val;
      });

      postData(body)
        .then((response) => {
          if (response.status !== 200) {
            throw new Error("Ошибка в отправки fetch");
          }
          const elements = form.elements;
          for (let i = 0; i < elements.length; i++) {
            elements[i].value = "";
          }

          document.querySelector(".popup-thank").style.visibility = "visible";
          const checkbox = form.querySelector(".checkbox__input");
          if (checkbox) {checkbox.checked = false;}
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  //функция проверки
  const checker = (id) => {
    const form = document.getElementById(id),
      phone = form.querySelector("[type='phone']"),
      checkbox = form.querySelector(".checkbox__input"),
      name = form.querySelector("[type='name']"),
      checkboxChange = form.querySelector(".checkbox__descr");

    if (phone && phone.value.length !== 18) {
      phone.style.color = "red";
      return false;
    } else if (phone) {
      phone.setAttribute("style", "");
    }

    if (name && name.value.length === 0) {
      name.style.color = "red";
      return false;
    } else if (name) {
      name.setAttribute("style", "");
    }

    if (checkbox && !checkbox.checked) {
      checkboxChange.style.color = "red";
      return false;
    } else if (checkbox && checkboxChange) {
      checkboxChange.setAttribute("style", "");
    }

    return true;
  };

  sendForm("feedback1", checker);
  sendForm("feedback2", checker);
  sendForm("feedback3", checker);
  sendForm("feedback4", checker);
  sendForm("feedback5", checker);
  sendForm("feedback6", checker);

});
