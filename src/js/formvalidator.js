export default class FormValidator {
  constructor(form) {
    this.form = form;
  }

  checkInputValidity(input) {
    const button = this.form.querySelector(".button");
    const errorField = input.nextElementSibling;

    if (
      (input.value.length < 2 && input.value.length > 0) ||
      input.value.length > 30
    ) {
      errorField.innerHTML = "Должно быть от 2 до 30 символов";
      this.setSubmitButtonState(false, button);
    } else if (!input.validity.valid) {
      errorField.innerHTML = "Это обязательное поле";
      this.setSubmitButtonState(false, button);
    } else {
      errorField.innerHTML = "";
      this.setSubmitButtonState(true, button);
    }

    if (!this.form.checkValidity()) {
      this.setSubmitButtonState(false, button);
    }
  }

  setSubmitButtonState(status, button) {
    if (!status) {
      button.classList.remove("popup__button_active");
      button.setAttribute("disabled", true);
    }
    if (status) {
      button.removeAttribute("disabled");
      button.classList.add("popup__button_active");
    }
  }

  setEventListeners(input) {
    input.addEventListener("input", (event) => {
      this.checkInputValidity(event.target);
    });
  }

  checkInputCardValidity(input1, input2) {
    const button = this.form.querySelector(".button");
    if (input1.validity.valid && input2.validity.valid) {
      this.setSubmitButtonState(true, button);
    } else {
      this.setSubmitButtonState(false, button);
    }
  }

  setEventListenersForCard(input1, input2) {
    input1.addEventListener("input", () => {
      this.checkInputCardValidity(input1, input2);
    });

    input2.addEventListener("input", () => {
      this.checkInputCardValidity(input1, input2);
    });
  }
}
