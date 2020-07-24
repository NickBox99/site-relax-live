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
      div.style.position = "absolute";
      arrow.style.transform = "rotate(0)";
      div.querySelector("a").style.opacity = 0;
    } else {
      div.style.position = "relative";
      arrow.style.transform = "rotate(180deg)";
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
        !target.closest(".popup-dialog-menu"))
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
  const elems = document.querySelectorAll(selector);

  function mask(event) {
    const keyCode = event.keyCode;
    const template = masked,
      def = template.replace(/\D/g, ""),
      val = this.value.replace(/\D/g, "");
    console.log(template);
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
const helperMobile = () => {
  const formula = document.querySelector(".formula"),
    formulaItem = formula.querySelectorAll(".formula-slider__slide");
  let nowSlide = 0;

  formulaItem.forEach((elem) => {
    elem.style.display = "none";
  });

  const changeSlide = (slide) => {
    formulaItem[nowSlide].classList.remove("active-item");
    formulaItem[nowSlide].style.display = "none";

    nowSlide = slide;

    if (nowSlide < 0) {
      nowSlide = formulaItem.length - 1;
    } else if (nowSlide >= formulaItem.length) {
      nowSlide = 0;
    }

    formulaItem[nowSlide].style.display = "flex";
    setTimeout(() => {
      formulaItem[nowSlide].classList.add("active-item");
    }, 350);
  };

  changeSlide(0);

  formula.addEventListener("click", (event) => {
    const target = event.target;

    if (target.closest("#formula-arrow_left")) {
      changeSlide(nowSlide - 1);
    } else if (target.closest("#formula-arrow_right")) {
      changeSlide(nowSlide + 1);
    }
  });
};

//Слайдер: Виды ремонта
const repairSlider = () => {
  const repair = document.getElementById("repair-types");

  //возвращает текущий слайдер
  const getSlider = () => {
    const sliders = repair.querySelectorAll(".repair-types-slider > div");
    let activeSlider;
    sliders.forEach((slider) => {
      if (!slider.classList.contains("types-repair--hide")) {
        activeSlider = slider;
      }
    });
    return activeSlider;
  }

  //свап слайдев
  const swapSliders = (num) => {
    const activeSlider = getSlider(),
    sliders = activeSlider.querySelectorAll(".repair-types-slider__slide"),
      thisSlideText = repair.querySelector(
        ".slider-counter-content__current"
      );
    let
      thisSlide = +thisSlideText.textContent - 1,
      maxCount = sliders.length - 1;

    sliders[thisSlide].style.display = "none";

    thisSlide += num;

    if(thisSlide > maxCount){
      thisSlide = 0;
    }else if(thisSlide < 0){
      thisSlide = maxCount;
    }

    sliders[thisSlide].style.display = "block";
    thisSlideText.textContent = thisSlide + 1;
  }

  let countSlideNav = 0;
  //свап нав бара
  const swapNav = (to) => {
    const listNav = repair.querySelector(".nav-list-repair"),
      slide = repair.querySelectorAll(".repair-types-nav__item");
    let scroll;
    const text = listNav.style.transform;
    if (text === "") {
      scroll = 0;
    } else {
      scroll = +text.slice(11, text.length - 3);
    }

    let scrolTo = slide[countSlideNav].offsetWidth + 11;
    console.log('scrolTo: ', scrolTo);
    if(to === "right"){
      scroll -= scrolTo;
      countSlideNav++;
    }else{
      scroll += scrolTo;
      countSlideNav--;
    }

    if (countSlideNav >= slide.length)
    {
      scroll = 0;
      countSlideNav = 0;
    }else if (countSlideNav < 0){
      countSlideNav = slide.length - 1;
      let summ = 0;
      slide.forEach((elem) => {
        summ += elem.offsetWidth + 11;
      });
      scrolTo = slide[countSlideNav].offsetWidth + 11;
      scroll = (summ - scrolTo) * -1;
    }
            
    listNav.style.transform = `translateX(${scroll}px)`;
  }

  repair.addEventListener("click", (event) => {
    const target = event.target;
   
    if (target.closest(".repair-types-nav__item")) {
      const buttons = repair.querySelectorAll(".repair-types-nav__item"),
        repairTypesSlider = repair.querySelectorAll(
          ".repair-types-slider > div"
        ),
        sliderCounter = repair.querySelector(".slider-counter-content__total");

      buttons.forEach((elem, index) => {
        if (elem === target) {
          elem.classList.add("active");
          repairTypesSlider[index].classList.remove("types-repair--hide");
          sliderCounter.textContent = repairTypesSlider[index].querySelectorAll(
            "img"
          ).length;
          
          const sliders = repairTypesSlider[index].querySelectorAll(
            ".repair-types-slider__slide"
          );
          sliders.forEach((elem) => {
            elem.style.display = "none";
          });
          sliders[0].style.display = "block";
          repair.querySelector(".slider-counter-content__current").textContent = 1;
        } else {
          elem.classList.remove("active");
          repairTypesSlider[index].classList.add("types-repair--hide");
        }
      });
    } else if (target.closest("#repair-types-arrow_right")) {
      swapSliders(1);
    } else if (target.closest("#repair-types-arrow_left")) {
      swapSliders(-1);
    }

    if (document.documentElement.clientWidth < 1025) {
      if (target.closest("#nav-arrow-repair-right_base")) {
        swapNav("right");
      } else if (target.closest("#nav-arrow-repair-left_base")) {
        swapNav("left");
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  //Список телефонов
  listPhone();

  //Бургер меню
  burgetMenu();

  //Маска для телефона
  maskPhone("#feedback-input1");
  maskPhone("#feedback-input2");
  maskPhone("#feedback-input3");
  maskPhone("#feedback-input4");
  maskPhone("#feedback-input5");

  //Подсказка
  if (document.documentElement.clientWidth >= 1025) {
    helperDestop();
  } else {
    helperMobile();
  }

  //Слайдер: Виды ремонта
  repairSlider();
});
