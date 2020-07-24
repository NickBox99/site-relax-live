'use sctrict';

//Список телефонов
const listPhone = () => {
    const btnArrow = document.getElementsByClassName(
        "header-contacts__arrow"
      )[0],
      arrow = btnArrow.querySelector("img"),
      div = document.getElementsByClassName(
        "header-contacts__phone-number-accord"
      )[0];

    btnArrow.addEventListener('click', () => {
        console.log(1);
        if (arrow.style.transform === "rotate(180deg)") {
            div.style.position = "absolute";
            arrow.style.transform = "rotate(0)";
            div.querySelector("a").style.opacity = 0;
        } else {
            div.style.position = "relative";
            arrow.style.transform = "rotate(180deg)";
            div.querySelector('a').style.opacity = 1;
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

//Бургер меню и плавная прокрутка пунктов меню и кнопки вверх
const burgetMenu = () => {
    const btnMenu = document.getElementsByClassName("menu__icon")[0],
      popupMenu = document.getElementsByClassName("popup-dialog-menu")[0],
      btnClose = document.getElementsByClassName("close-menu")[0],
      btnFooter = document.getElementsByClassName("button-footer")[0];

    
    document.addEventListener("click", (event) => {
        const target = event.target;

        const scroll = (href) => {
            event.preventDefault();
            smoothScroll(href);
            popupMenu.removeAttribute("style");
        };

        if (target === btnMenu){
            popupMenu.style.transform = "translate3d(0, 0, 0)";
        }else if(target === btnClose){
            popupMenu.removeAttribute("style");
        }else if(target.closest(".popup-menu-nav__item")){
            scroll(target.getAttribute("href"));
        }else if (target.closest("." + btnFooter.classList[0])) {
            scroll(btnFooter.querySelector("a").getAttribute("href"));
        }
          
    });
};

document.addEventListener("DOMContentLoaded", () => {
    //Список телефонов
    listPhone();

    //Бургер меню
    burgetMenu();
});