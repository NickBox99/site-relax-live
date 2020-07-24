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

//Бургер меню
const burgetMenu = () => {
    const btnMenu = document.getElementsByClassName("menu__icon")[0],
      popupMenu = document.getElementsByClassName("popup-dialog-menu")[0],
      btnClose = document.getElementsByClassName("close-menu")[0];

    
    document.addEventListener("click", (event) => {
        const target = event.target;
        console.log('target: ', target);
        console.log(target.closest(".popup-menu"));
        if (target === btnMenu){
            popupMenu.style.transform = "translate3d(0, 0, 0)";
        }else if(target === btnClose){
            popupMenu.removeAttribute("style");
        }
          
    });
}

document.addEventListener("DOMContentLoaded", () => {
    //Список телефонов
    listPhone();

    //Бургер меню
    burgetMenu();
});