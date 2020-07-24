"use sctrict";

//Список телефонов
const listPhone = () => {
  const btnArrow = document.getElementsByClassName("header-contacts__arrow")[0],
    arrow = btnArrow.querySelector("img"),
    div = document.getElementsByClassName(
      "header-contacts__phone-number-accord"
    )[0];

  btnArrow.addEventListener("click", () => {
    console.log(1);
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
    } else if (target === btnClose) {
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
      target.classList.contains("close") &&
      target.closest(".popup-repair-types")
    ) {
      pupupRepair.style.visibility = "hidden";
    } else if (target.classList.contains("link-privacy")) {
      popupPrivacy.style.visibility = "visible";
    } else if (
      target.classList.contains("close") &&
      target.closest(".popup-privacy")
    ) 
    {
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

});
