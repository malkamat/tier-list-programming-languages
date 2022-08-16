"use strict";
const itemsContainer = document.querySelector('.container-items');
const items = document.querySelectorAll(".items");
const rows = document.querySelectorAll('.container-right');
function addDDListenersItems(element) {
    element.addEventListener('dragstart', handleDragStart);
    element.addEventListener('dragend', handleDragEnd);
}
function addDDListenersContainers(element) {
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('drop', handleDrop);
}
// Drag And Drop
let dragSrcEl;
function handleDragStart(e) {
    var _a;
    e.stopPropagation();
    console.log("drag start");
    dragSrcEl = this;
    (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.setData('text/html', this.innerHTML);
    console.log(dragSrcEl);
}
function handleDragOver(e) {
    e.preventDefault();
    console.log("drag over");
}
function handleDrop(e) {
    var _a;
    e.stopPropagation();
    const receptionEl = this;
    if (dragSrcEl.nodeName === "IMG" && (receptionEl.classList.contains("container-right") || receptionEl.classList.contains("container-items"))) {
        receptionEl.appendChild(dragSrcEl);
        // addDDListeners(dragSrcEl)
        console.log("receptionEl");
    }
    if (dragSrcEl !== this && this.classList[0] === dragSrcEl.classList[0]) {
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = (_a = e.dataTransfer) === null || _a === void 0 ? void 0 : _a.getData('text/html');
        addDDListenersItems(this);
    }
}
function handleDragEnd(e) {
    e.stopPropagation();
    if (this.classList.contains('items-container')) {
        if (this.querySelectorAll("img")) {
            this.querySelectorAll('img').forEach((image) => {
                // addDDListeners(image);
            });
        }
    }
    else {
        // addDDListeners(this)
    }
}
addDDListenersContainers(itemsContainer);
rows.forEach(row => {
    addDDListenersContainers(row);
});
items.forEach(item => {
    addDDListenersItems(item);
});
