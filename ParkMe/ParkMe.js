console.log("deneme");
let items;
let deg;
let moveXPosition = 1;
let moveYPosition;
let startXPosition;
let startYPosition;
let selectItem;
let area;
let deathArea;
let interval;
//    background-color: rgb(231, 228, 28);
//    background-color: rgb(231, 99, 28);
//    background-color: rgb(28, 231, 140);
//    background-color: rgb(28, 116, 231);
//    background-color: rgb(119, 28, 231);
//    background-color: rgb(231, 28, 224);
//    background-color: rgb(231, 28, 92);
window.onload = () => {
    area = document.getElementById("gameBoard");
    deathArea = document.getElementById("deathArea");
    //setStartItem()
    items = Array.from(document.querySelectorAll(".item"));
    items.forEach(item => {
        item.addEventListener('click', itemClicked);
    });
    console.log(deathArea?.offsetTop);
    console.log(area?.offsetTop);
};
function itemClicked(event) {
    selectItem = event.target;
    interval = setInterval(move, 160);
}
function itemMovement(item) {
    if (items != null) {
        let style = window.getComputedStyle(item);
        let rotate = style.getPropertyValue("rotate");
        rotate = rotate.replace("deg", "");
        deg = (180 - Number(rotate)) * Math.PI / 180;
        startXPosition = Number(style.getPropertyValue("top").replace("px", ""));
        startYPosition = Number(style.getPropertyValue("left").replace("px", ""));
        let tanValue = (Math.tan(Number(deg)));
        moveYPosition = tanValue * moveXPosition;
        if (Number(rotate) == 0) {
            item.style.top = startXPosition + moveXPosition + "px";
            item.style.left = startYPosition + moveYPosition + "px";
        }
        else if (Number(rotate) == 180) {
            item.style.top = startXPosition - moveXPosition + "px";
            item.style.left = startYPosition - moveYPosition + "px";
        }
        else if (Number(rotate) == 90) {
            item.style.left = startYPosition - moveXPosition + "px";
        }
        else if (Number(rotate) == 270) {
            item.style.left = startYPosition + moveXPosition + "px";
        }
        moveXPosition++;
    }
}
function move() {
    if (selectItem != null && items != null) {
        itemMovement(selectItem);
        removeGameArea(selectItem);
        let controlItems = items = items.filter(item => item !== selectItem);
        controlItems.forEach(element => {
            checkCollision(selectItem, element);
        });
    }
}
function checkCollision(selectItem, items) {
    if (selectItem != null && items != null) {
        if (selectItem.offsetLeft < items.offsetLeft + items.offsetWidth &&
            selectItem.offsetLeft + selectItem.offsetWidth > items.offsetLeft &&
            selectItem.offsetTop < items.offsetTop + items.offsetHeight &&
            selectItem.offsetTop + selectItem.offsetHeight > items.offsetTop) {
            clearInterval(interval);
            let smokeParent = selectItem.firstElementChild;
            smokeParent.innerHTML += `
                           <div class="smoke"></div>
                           `;
            items.removeEventListener('click', itemClicked);
        }
    }
}
function removeGameArea(moveingItem) {
    if (deathArea != null) {
        if (-moveingItem.offsetHeight > moveingItem.offsetTop ||
            -moveingItem.offsetWidth > moveingItem.offsetLeft ||
            deathArea.offsetWidth - moveingItem.offsetWidth < moveingItem.offsetLeft ||
            deathArea.offsetHeight - moveingItem.offsetHeight < moveingItem.offsetTop) {
            moveingItem.style.opacity = "0";
            clearInterval(interval);
        }
        // if(deathArea.offsetHeight < moveingItem.offsetTop){
        //     console.log("mmmm")
        //     clearInterval(interval)
        // }
        console.log("death: " + Number(moveingItem.offsetHeight) + " moving: " + Number(moveingItem.offsetTop));
        // if(-moveingItem.offsetWidth > moveingItem.offsetLeft){
        //     console.log("mmmm")
        //     clearInterval(interval)
        // }
        // if(deathArea.offsetWidth - moveingItem.offsetWidth< moveingItem.offsetLeft){
        //     console.log("mmmm")
        //     clearInterval(interval)
        // }
        // if(-moveingItem.offsetHeight > moveingItem.offsetTop){
        //     console.log("mmmm")
        //     clearInterval(interval)
        // }
        // if(deathArea.offsetHeight - moveingItem.offsetHeight < moveingItem.offsetTop){
        //     console.log("mmmm")
        //     clearInterval(interval)
        // }
    }
}
// function setStartItem() {
//     let degArr = [0,180,270,90]
//     let color = [""]
//     if(area != null){
//         for (let i = 0; i < 154; i++) {
//             let itemDeg = Math.floor(Math.random() * 4)
//             if(area != null){
//                 area.innerHTML += `
//                 <div class="item" style="rotate: ${degArr[itemDeg]}deg;">
//                 <div class="item-image">
//                     <img src="img/arrow.png" alt="">
//                 </div>
//                 </div>
//                 `
//             }
//         }
//     }
// }
