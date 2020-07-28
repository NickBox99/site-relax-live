//плавная прокрутка до индетификатора
const smoothScroll = (identifier) => {
  const blockID = identifier.substr(1);

  let element = document.getElementById(blockID),
    isSafari = window.safari !== undefined,
    is_ios = /iP(ad|od|hone)/i.test(window.navigator.userAgent);

    if (isSafari || is_ios) {
    document.body.scrollTop = 0;
    } else {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
    }
};

export default smoothScroll;
