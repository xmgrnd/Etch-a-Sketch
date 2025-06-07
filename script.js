const grid = document.querySelector(".canvas-container");
let selectedColor = "black";
let isActiveRubber = false;
let isActiveRainbow = false;

grid.addEventListener('contextmenu', (e) => {
    e.preventDefault();});

let isRightPressed = false;
grid.addEventListener("mousedown", (e) => {
        e.preventDefault();
        isRightPressed = true;});

grid.addEventListener("mouseup", (e) => {
        e.preventDefault();
        isRightPressed = false;});

document.querySelector("#color-apply-btn").addEventListener('click', (e) => {
    isActiveRainbow = false;
    isActiveRubber = false;
    selectedColor = document.querySelector("#color-picker-itself").value;});

document.querySelector("#rubber-btn").addEventListener('click', (e) => {
    if (isActiveRubber) {
        isActiveRubber = false;
        selectedColor = document.querySelector("#color-picker-itself").value;
    } else {
        isActiveRubber = true;
        selectedColor = 'white';
    }
    toggleUpdateHandler("");
});

document.querySelector("#rainbow-btn").addEventListener('click', (e) => {
    if (isActiveRainbow) {
        isActiveRainbow = false;
        selectedColor = document.querySelector("#color-picker-itself").value;
    } else {
        isActiveRainbow = true;
        //content
    }
    toggleUpdateHandler("rainbow");
});

function toggleUpdateHandler(priority) {
    const rubberToggle = document.querySelector("#toggle-status-rubber");
    const rainbowToggle = document.querySelector("#toggle-status-rainbow");
    if (priority == "rainbow") {
        if (isActiveRainbow) {
            toggleOn(rainbowToggle);
            if (isActiveRainbow && isActiveRubber) toggleOff(rubberToggle);
        } else {
            toggleOff(rainbowToggle);
        }
    } else {
        if (isActiveRubber) {
            toggleOn(rubberToggle);
            if (isActiveRainbow && isActiveRubber) toggleOff(rainbowToggle);
        } else {
            toggleOff(rubberToggle);
        }
    }
}
function toggleOff(item) {
    item.style.color = "red";
    item.textContent = "OFF";
    item.style["text-shadow"] = "1px 1px rebeccapurple"
}
function toggleOn(item){
    item.style.color = "lime";
    item.textContent = "ON";
    item.style["text-shadow"] = "1px 1px limegreen"
}


//creating grid, 2 loops: first for columns second for rows
//Each box created, new event listener created (unoptimized?)
function gridCrafter(size, pxSize) {
    document.querySelector("#canvas-details-text")
        .textContent = `Size: ${size}x${size} Pixel size: ${pxSize}`;
    for (let i = 0; i < size; i++) {
        const newBoxContainer = document.createElement("div");
        newBoxContainer.classList.add(`grid-column`);
        grid.appendChild(newBoxContainer);
        console.log(`Added ${i+1} grid column.`)
        for (let j = 0; j < size; j++) {
            const newBox = document.createElement("div");
            newBox.style.width = pxSize;
            newBox.style.height = pxSize;
            newBox.classList.add("grid-child");
            newBox.addEventListener("mouseover", (e) =>{ 
                    if (isRightPressed) newBox.style["background-color"] = selectedColor;
                });
            newBoxContainer.appendChild(newBox);
            console.log(`Added ${j+1} grid box.`)
        }
    }
    console.log(`Gridbox creation finished`);
}


//Removing grid by iterating through columns
function gridDestroyer() {
    console.log("[DESTORYER] called");
    const nodelist = document.querySelectorAll(".grid-column");
    for (let i = 0; i < nodelist.length; i++) {
        grid.removeChild(nodelist[i]);
    }
    console.log(`[DESTORYER] ended`);
}

// well, needs optimization
function setPixelSize(size) {
    let s = "";
    if (size > 90) s = "5px";
    else if (size > 80) s = "6px";
    else if (size > 70) s = "7px";
    else if (size > 60) s = "8px";
    else if (size > 50) s = "9px";
    else if (size > 40) s = "10px";
    else if (size > 30) s = "11px";
    else if (size > 40) s = "12px";
    else if (size > 30) s = "13px";
    else if (size > 20) s = "14px";
    else if (size > 10) s = "15px";
    else s = "16px";
    return s;
}



let value = 100;
gridCrafter(value, setPixelSize(value));

