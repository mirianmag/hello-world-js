class Grafic {
    constructor () {
        this.element = document.createElement("div");
        this.element.className = "grafic";
        this.colors = ["red", "yellow", "green", "blue"];
    }

    addColumn (value, description) {
        const column = document.createElement("div");
        column.className = "grafic-column";
        const color = document.createElement("div");
        color.style.height = (value*100)/10000;
        color.style.background = this.colors.pop();
        column.appendChild(color);
        const monthName = document.createElement("div");
        monthName.className = "grafic-column-text";
        monthName.innerText = description;
        column.appendChild(color);
        column.appendChild(monthName);
        this.element.appendChild(column);
    }
}