"use strict";

export default class Api {
  constructor(options) {
    this.options = options;
  }

  getInitialCards() {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "GET",
      headers: this.options.headers,
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  getUserData() {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "GET",
      headers: this.options.headers,
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateProfile(name, about) {
    return fetch(`${this.options.baseUrl}/users/me`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  addNewCard(title, link) {
    return fetch(`${this.options.baseUrl}/cards`, {
      method: "POST",
      headers: this.options.headers,
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteCard(id) {
    return fetch(`${this.options.baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this.options.headers,
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  likeCard(id) {
    return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
      method: "PUT",
      headers: this.options.headers,
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  deleteLike(id) {
    return fetch(`${this.options.baseUrl}/cards/like/${id}`, {
      method: "DELETE",
      headers: this.options.headers,
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }

  updateAva(ava) {
    return fetch(`${this.options.baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this.options.headers,
      body: JSON.stringify({
        avatar: ava,
      }),
    }).then(function (res) {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  }
}
