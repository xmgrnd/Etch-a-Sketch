const grid = document.querySelector(".canvas-container");
const rainbowColors = ["red","orange","yellow","green","blue","violet"];
let selectedColor = "black";
let isActiveRubber = false;
let isActiveRainbow = false;
let isAcvtiveDarkening = false;

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
    isAcvtiveDarkening = false;
    selectedColor = document.querySelector("#color-picker-itself").value;});

document.querySelector("#rubber-btn").addEventListener('click', (e) => {
    if (isActiveRubber) {
        isActiveRubber = false;
        selectedColor = document.querySelector("#color-picker-itself").value;
    } else {
        isActiveRubber = true;
        isActiveRainbow = false;
        isAcvtiveDarkening = false;
    }
    toggleUpdateHandler("rubber");
});

document.querySelector("#rainbow-btn").addEventListener('click', (e) => {
    if (isActiveRainbow) {
        isActiveRainbow = false;
        selectedColor = document.querySelector("#color-picker-itself").value;
    } else {
        isActiveRainbow = true;
        isActiveRubber = false;
        isAcvtiveDarkening = false;
    }
    toggleUpdateHandler("rainbow");
});

document.querySelector("#dark-btn").addEventListener('click', (e) => {
    if (isAcvtiveDarkening) {
        isAcvtiveDarkening = false;
        selectedColor = document.querySelector("#color-picker-itself").value;
    } else {
        isAcvtiveDarkening = true;
        isActiveRubber = false;
        isActiveRainbow = false;
    }
    toggleUpdateHandler("darkening");
});

document.querySelector("#new-canvas-btn").addEventListener('click', (e) => {
    const userGridSize = document.querySelector("#grid-size-value");
    if ((userGridSize.value >= 10) && (userGridSize.value <= 100)) {
        gridDestroyer();
        gridCrafter(userGridSize.value, setPixelSize(userGridSize.value));
        userGridSize.value = "";
    } else {
        displayPopup("Please insert number between(and including) 10 and 100.");
    }
});

function toggleUpdateHandler(priority) {
    const rubberToggle = document.querySelector("#toggle-status-rubber");
    const rainbowToggle = document.querySelector("#toggle-status-rainbow");
    const darkToggle = document.querySelector("#toggle-status-dark");
    if (priority == "rainbow") {
        if (isActiveRainbow) {
            toggleOn(rainbowToggle);
            toggleOff(darkToggle);
            toggleOff(rubberToggle);
        } else {
            toggleOff(rainbowToggle);
        }
    } else if (priority == "rubber") {
        if (isActiveRubber) {
            toggleOn(rubberToggle);
            toggleOff(darkToggle);
            toggleOff(rainbowToggle);
        } else {
            toggleOff(rubberToggle);
        }
    } else if (priority == "darkening"){
        if (isAcvtiveDarkening) {
            toggleOn(darkToggle);
            toggleOff(rubberToggle);
            toggleOff(rainbowToggle);
        } else {
            toggleOff(darkToggle);
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
        for (let j = 0; j < size; j++) {
            const newBox = document.createElement("div");
            newBox.style["opacity"] = 1;
            newBox.style.width = pxSize;
            newBox.style.height = pxSize;
            newBox.classList.add("grid-child");
            newBox.addEventListener("mouseover", (e) =>{ 
                    if (isRightPressed && isActiveRainbow)  {
                        newBox.style["background-color"] = rainbowColors[Math.floor(Math.random()*6)];
                    }
                    else if (isRightPressed && isAcvtiveDarkening) {
                        newBox.style["opacity"]-=0.1;
                    } else if (isRightPressed && isActiveRubber) {
                        newBox.style["opacity"]=1;
                        newBox.style["background-color"] = 'white';
                    }
                    else if (isRightPressed) newBox.style["background-color"] = selectedColor;
                });
            newBoxContainer.appendChild(newBox);
        }
    }
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

function displayPopup(message) {
    const popupBox = document.createElement("div");
    const popupBoxX = document.createElement("div");
    popupBox.classList.add("custom-popup");
    popupBoxX.classList.add("custom-popup-x");
    popupBox.textContent = message;
    popupBoxX.textContent = 'x';
    popupBox.appendChild(popupBoxX);
    document.querySelector("body").appendChild(popupBox);
    popupBox.style.display="flex"
    popupBoxX.addEventListener('click', (e) => {
        popupBox.style.display = "none";
    });
}

//initial webside state
let value = 100;
gridCrafter(value, setPixelSize(value));
