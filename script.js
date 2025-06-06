const grid = document.querySelector(".canvas-container");
let selectedColor = "black";

function gridCrafter(size) {
    for (let i = 0; i < size; i++) {
        const newBoxContainer = document.createElement("div");
        newBoxContainer.classList.add(`grid-column`);
        grid.appendChild(newBoxContainer);
        console.log(`Added ${i+1} grid column.`)
        for (let j = 0; j < size; j++) {
            const newBox = document.createElement("div");
            newBox.classList.add("grid-child");
                    newBox.addEventListener("mouseover", () =>{ 
                    newBox.style["background-color"] = selectedColor;
                    });
            newBoxContainer.appendChild(newBox);
            console.log(`Added ${j+1} grid box.`)
        }
    }
    console.log(`Gridbox creation finished`);
}

function gridDestroyer() {
    console.log("[DESTORYER] called");
    const nodelist = document.querySelectorAll(".grid-column");
    for (let i = 0; i < nodelist.length; i++) {
        grid.removeChild(nodelist[i]);
    }
    console.log(`[DESTORYER] ended`);
}




gridCrafter(100);

