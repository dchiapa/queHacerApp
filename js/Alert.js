class Alert {
  render(msg, classList) {
    this.content = document.createElement('div');
    this.msg = msg;
    this.classList = classList;
    this.content.classList.add('alertContainer');
    this.content.innerHTML = `
    <p class="alertParrafo">${this.msg}</p>
    <span class="btn alertBtn">Ok</span>
    `;
    if (this.classList != undefined) {
      this.classList.forEach(classes => {
        this.content.classList.add(classes);
      });
    }
    document.querySelector('body').appendChild(this.content);
    this.btn = document.querySelector('.alertBtn');
    this.btn.addEventListener('click', this.action);
  }
  action() {
    this.content = document.querySelector('.alertContainer');
    document.querySelector('body').removeChild(this.content);
  }
}