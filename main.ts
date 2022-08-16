const itemsContainer = document.querySelector('.container-items') as HTMLDivElement
const items = document.querySelectorAll(".items")as NodeListOf<HTMLImageElement>
const rows = document.querySelectorAll('.container-right') as NodeListOf<HTMLDivElement>


function addDDListenersItems(element: HTMLElement) {
    element.addEventListener('dragstart', handleDragStart)
    element.addEventListener('dragend', handleDragEnd)
}


function addDDListenersContainers(element: HTMLElement) {
    element.addEventListener('dragover', handleDragOver)
    element.addEventListener('drop', handleDrop)
}





// Drag And Drop

let dragSrcEl: HTMLElement;


function handleDragStart(this: HTMLElement, e: DragEvent){
    e.stopPropagation()
    console.log("drag start")
    dragSrcEl = this;
    e.dataTransfer?.setData('text/html', this.innerHTML)
    console.log(dragSrcEl)
}


function handleDragOver(e: DragEvent) {
    e.preventDefault()
    console.log("drag over")
}


function handleDrop(this: HTMLElement, e: DragEvent) {
    e.stopPropagation()
    const receptionEl = this;

    if(dragSrcEl.nodeName === "IMG" &&( receptionEl.classList.contains("container-right") || receptionEl.classList.contains("container-items"))) {
        receptionEl.appendChild(dragSrcEl);
        // addDDListeners(dragSrcEl)
        console.log("receptionEl")
    }

    if(dragSrcEl !== this && this.classList[0] === dragSrcEl.classList[0]){
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer?.getData('text/html') as string;
        
            addDDListenersItems(this)
        
    }

}

function handleDragEnd(this: HTMLElement, e: DragEvent){
    e.stopPropagation()
    if(this.classList.contains('items-container')) {
        if(this.querySelectorAll("img")) {
            this.querySelectorAll('img').forEach((image: HTMLImageElement) => {
                // addDDListeners(image);
            })
        }
    } else {
        // addDDListeners(this)
    }
}


addDDListenersContainers(itemsContainer)

rows.forEach(row => {
    addDDListenersContainers(row)
})

items.forEach(item => {
    addDDListenersItems(item)
})