export default class UserInfo {
  constructor(name, about) {
    this.name = name;
    this.about = about;
  }
  setUserInfo(username, userabout) {
    this.name.setAttribute("value", `${username.textContent}`);
    this.about.setAttribute("value", `${userabout.textContent}`);
  }
  updateUserInfo(username, userabout) {
    username.textContent = this.name.value;
    userabout.textContent = this.about.value;
  }
}
