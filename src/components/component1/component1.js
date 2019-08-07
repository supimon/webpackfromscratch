export default (text = "Hello world") => {
  const element = document.createElement("div");
  element.classList.add("blue_text");
  element.innerHTML = text;
  return element;
};
