//Подсказка
const helper = (
  containerSelector,
  elements,
  popup,
  activeClass,
  activeClassFor
) => {
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

      targetElement.style.color = "#fff";

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

export default helper;