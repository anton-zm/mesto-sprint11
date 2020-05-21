export default class CardList {
  constructor(container, func) {
    this.container = container;
    this.func = func;
  }

  addCard(title, image, likes, owner, id) {
    const card = this.func(title, image, likes, owner, id);
    this.container.appendChild(card);
  }
  render(arr) {
    for (const elem of arr) {
      this.addCard(
        elem.name,
        elem.link,
        elem.likes.length,
        elem.owner._id,
        elem._id
      );
    }
  }
}
