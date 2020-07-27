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

export default listPhone;