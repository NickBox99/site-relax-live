//Слайдеры
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
    arrowOffOnLastSlide,
  }) {
    this.container = document.getElementById(containerId);
    this.sliders = this.container.querySelectorAll(slidersSelector);
    this.slideNumber = 0;
    this.visibleSlide = visibleSlide ? +visibleSlide : 1;
    this.maxSlideCount = this.sliders.length;
    this.activeClass = activeClass;
    this.arrowLeft = this.container.querySelector(arrowLeft);
    this.arrowRight = this.container.querySelector(arrowRight);
    this.display = display;
    this.counterNow = this.container.querySelector(counterNow);
    this.counterMax = this.container.querySelector(counterMax);
    this.bottons = this.container.querySelectorAll(bottons);
    this.activeClassToButton = activeClassToButton;
    this.type = type ? type : "block";
    this.arrowOffOnLastSlide = arrowOffOnLastSlide;
  }

  init() {
    if (this.type !== "transform") {
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

  setVisibleSlide(start = 0) {
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

    this.slideNumber = slideNumber;

    if (this.slideNumber < 0) {
      this.slideNumber = this.maxSlideCount - 1 - visivleSlide;
    } else if (this.slideNumber + visivleSlide >= this.maxSlideCount) {
      this.slideNumber = 0;
    }

    if (this.type !== "transform") {
      this.setVisibleSlide(this.slideNumber);
    } else {
      let allWidth = 0;
      for (let i = 0; i < this.slideNumber; i++) {
        let offsetWidth = this.sliders[i].offsetWidth;
        allWidth += offsetWidth * 0.049 + offsetWidth;
      }
      this.sliders[0].parentNode.style.transform = `translateX(${
        allWidth * -1
      }px)`;
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

    if (this.arrowOffOnLastSlide && this.arrowOffOnLastSlide === true) {
      this.setVisibleArrow();
    }
  }

  setVisibleArrow() {
    if (this.slideNumber === 0) {
      this.arrowLeft.style.display = "none";
    } else if (this.slideNumber === this.maxSlideCount - this.visibleSlide) {
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

export default Slider;