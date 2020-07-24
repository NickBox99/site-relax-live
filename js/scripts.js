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

document.addEventListener("DOMContentLoaded", () => {
    listPhone();
});