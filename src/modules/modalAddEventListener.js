import Slider from "./Slider";
import smoothScroll from "./smoothScroll";

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
    popupConsultation = document.querySelector(".popup-consultation"),
    //Портфолио
    popupPortfolio = document.querySelector(".popup-portfolio"),
    //Окно благодарности
    popupThank = document.querySelector(".popup-thank");

  let sliderForRepair;
  let sliderForRepairCarousel;

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
      const href = target.getAttribute("href");
      if (href){
        scroll(target.getAttribute("href"));
      }
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

      fetch("db/db.json")
        .then((response) => {
          return response.json();
        })
        .then((data) => {

          const ulListLeft = pupupRepair.querySelector(
              ".nav-list-popup-repair"
            ),
            ulListRight = pupupRepair.querySelector(
              ".popup-repair-types-content-table"
            );
          ulListLeft.innerHTML = "";
          ulListRight.innerHTML = "";

          data.forEach((element) => {
            if (element.date) {
              pupupRepair.querySelector(
                ".popup-repair-types-content__head-date .date"
              ).innerText = element.date;
            }
            if (element.title) {
              const newElementLeft = document.createElement("button");
              newElementLeft.classList.add(
                "button_o",
                "popup-repair-types-nav__item"
              );
              newElementLeft.textContent = element.title;

              ulListLeft.appendChild(newElementLeft);

              const newElementRight1 = document.createElement("table");
              newElementRight1.classList.add(
                "popup-repair-types-content-table__list"
              );

              const newElementRight2 = document.createElement("tbody");
              newElementRight1.appendChild(newElementRight2);

              element.priceList.forEach((el) => {
                const newElementRight3 = document.createElement("tr");
                newElementRight3.classList.add("mobile-row");

                const text = el.units === "м2" ? "м<sup>2</sup>" : el.units;
                newElementRight3.innerHTML = `
                <td class="repair-types-name">${el.typeService}</td>
                <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
                <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
                <td class="repair-types-value">${text}</td>
                <td class="repair-types-value">${el.cost} руб.</td>
                `;

                newElementRight2.appendChild(newElementRight3);
              });

              ulListRight.appendChild(newElementRight1);

              //Слайдер
              sliderForRepair = new Slider({
                containerId: "popup-repair-types",
                slidersSelector: ".popup-repair-types-content-table__list",
                bottons: ".nav-list > button",
                display: "block",
                activeClassToButton: "active",
              });
              sliderForRepair.init();

              sliderForRepairCarousel = new Slider({
                containerId: "popup-repair-types",
                slidersSelector: ".nav-list > button",
                arrowLeft: "#nav-arrow-popup-repair_left",
                arrowRight: "#nav-arrow-popup-repair_right",
                type: "transform",
              });
              sliderForRepairCarousel.init();
            }
          });
        })
        .catch((error) => {
          console.error("Ошибка при загрузке файла: " + error);
        });
    }
    //Клик по элементам меню
    else if (target.closest(".popup-repair-types-nav__item")) {
      document.getElementById("switch-inner").textContent = target.textContent;
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
      (target.classList.contains("close") &&
        target.closest(".popup-consultation")) ||
      target === popupConsultation
    ) {
      popupConsultation.style.visibility = "hidden";
    }
    //клик по FAQ
    else if (
      target.closest("#faq") &&
      target.classList.contains("title_block")
    ) {
      const elements = document.querySelectorAll("#faq li .title_block");
      elements.forEach((elem) => {
        if (elem === target) {
          if (target.classList.contains("msg-active")) {
            elem.classList.remove("msg-active");
          } else {
            elem.classList.add("msg-active");
          }
        } else {
          elem.classList.remove("msg-active");
        }
      });
    }
    //открыть модальное окно "Портфолио"
    else if (target.closest(".portfolio-slider__slide-frame")) {
      popupPortfolio.style.visibility = "visible";
    }
    //закрыть модальное окно "Портфолио"
    else if (
      (target.classList.contains("close") &&
        target.closest(".popup-portfolio")) ||
      target === popupPortfolio
    ) {
      popupPortfolio.style.visibility = "hidden";
    }
    //открыть модальное окно "Окно благодарности"
    else if (target.closest(".portfolio-slider__slide-frame")) {
      popupThank.style.visibility = "visible";
    }
    //закрыть модальное окно "Окно благодарности"
    else if (
      (target.classList.contains("close") && target.closest(".popup-thank")) ||
      target === popupThank
    ) {
      popupThank.style.visibility = "hidden";
    }
  });
};

export default modalAddEventListener;