export default class Popup {
  constructor(pop) {
    this.pop = pop;
  }
  open() {
    this.pop.classList.add("popup_is-opened");
  }
  close() {
    this.pop.classList.remove("popup_is-opened");
  }
}
