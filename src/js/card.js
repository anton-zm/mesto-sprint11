export default class Card {
  constructor(title, image) {
    this.title = title;
    this.image = image;
    this.myCard = document.createElement("div");
    this.setEvent = this.setEvent.bind(this);
  }

  like(elem) {
    api.likeCard(elem.closest(".place-card").id);
    elem.classList.toggle("place-card__like-icon-off");
    elem.classList.add("place-card__like-icon_liked");
  }

  deleteLike(elem) {
    api.deleteLike(elem.closest(".place-card").id);
    elem.classList.remove("place-card__like-icon_liked");
    elem.classList.toggle("place-card__like-icon-off");
  }

  likeCounting(elem, value) {
    const likeCounter = elem.nextElementSibling;
    let likeCounterValue = +likeCounter.textContent;
    likeCounter.textContent = likeCounterValue + value;
  }

  remove(elem) {
    confirm("Вы действительно хотите удалить картинку?");
    api.deleteCard(elem.id);
    this.myCard.removeEventListener("click", this.setEvent);
    elem.remove();
  }

  create(title, image, likes, owner, id) {
    this.myCard.classList.add("place-card");
    this.myCard.insertAdjacentHTML(
      "beforeend",
      `<div class="place-card__image" style="background-image: url(${image})">
  <button class="place-card__delete-icon"></button>
</div>
<div class="place-card__description">
  <h3 class="place-card__name"></h3>
  <div class="place-card__like">
      <button class="place-card__like-icon place-card__like-icon-off"></button>
      <span class="place-card__like-counter">${likes}</span>
  </div>
</div>`
    );
    const deleteIcon = this.myCard.querySelector(".place-card__delete-icon");

    if (owner === "094546c675a8b4c5d67cb2c0") {
      deleteIcon.classList.add("place-card_my-card");
    }
    const cardTitle = this.myCard.querySelector(".place-card__name");
    cardTitle.textContent = title;

    this.myCard.id = id;
    this.myCard.addEventListener("click", this.setEvent);
    return this.myCard;
  }
  setEvent(event) {
    if (event.target.classList.contains("place-card__delete-icon")) {
      this.remove(event.target.closest(".place-card"));
    } else if (event.target.classList.contains("place-card__like-icon-off")) {
      this.like(event.target);
      this.likeCounting(event.target, 1);
    } else if (event.target.classList.contains("place-card__like-icon_liked")) {
      this.deleteLike(event.target);
      this.likeCounting(event.target, -1);
    }
  }
}
