const object = {
    createSecondaryMenu () {

    }
    createMenuRows() {
        this.touchMenu = document.createElement("div");
        this.touchMenu.classList.add(
          "secondary-menu-row",
          "secondary-menu",
          "touch-menu"
        );
        this.matchingMenu = document.createElement("div");
        this.matchingMenu.classList.add(
          "secondary-menu-row",
          "secondary-menu",
          "matching-menu"
        );
        this.fluencyMenu = document.createElement("div");
        this.fluencyMenu.classList.add(
          "secondary-menu-row",
          "secondary-menu",
          "fluency-menu"
        );
        this.writingMenu = document.createElement("div");
        this.writingMenu.classList.add(
          "secondary-menu-row",
          "secondary-menu",
          "writing-menu"
        );
    }
    appendToTarget(target, item) {
document.querySelectorAll(item).forEach((item) => {
    this.target.appendChild(item)
})
    }

}