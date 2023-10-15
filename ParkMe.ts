
let items: HTMLElement[] | null;
let deg: number;

let moveXPosition: number = 1;
let moveYPosition: number;
let startXPosition: number;
let startYPosition: number;

let selectItem: HTMLElement | null;

let area: HTMLElement | null;
let deathArea : HTMLElement | null;
let interval;

window.onload = () => {
    area = document.getElementById("gameBoard");
    deathArea = document.getElementById("deathArea")
    //setStartItem()
    items = Array.from(document.querySelectorAll(".item"));
    items.forEach(item => {
        item.addEventListener('click', itemClicked);
    });
}

function itemClicked(event: Event) {
    selectItem = event.target as HTMLDivElement;
    interval = setInterval(move , 160)
}

function itemMovement(item:HTMLElement) {
    if(items != null){
        let style = window.getComputedStyle(item);
        let rotate = style.getPropertyValue("rotate");
        rotate = rotate.replace("deg", "");
        deg =(180- Number(rotate)) * Math.PI / 180

        startXPosition = Number(style.getPropertyValue("top").replace("px", ""));
        startYPosition = Number(style.getPropertyValue("left").replace("px", ""));

        let tanValue = (Math.tan(Number(deg)));
        moveYPosition = tanValue * moveXPosition;

        if(Number(rotate) == 0){
            item.style.top = startXPosition + moveXPosition + "px";
            item.style.left = startYPosition + moveYPosition + "px";      
        }

        else if(Number(rotate) == 180){
            item.style.top = startXPosition - moveXPosition + "px";
            item.style.left = startYPosition - moveYPosition + "px";          
        }

        else if(Number(rotate) == 90){
            item.style.left = startYPosition - moveXPosition + "px";   
        }

        else if(Number(rotate) == 270){
            item.style.left = startYPosition + moveXPosition + "px";   
        }

        moveXPosition++;
    }
}

function move() {
    if(selectItem != null && items != null){
        itemMovement(selectItem)
        removeGameArea(selectItem)
        let controlItems: HTMLElement[] | null = items = items.filter(item => item !== selectItem);
        controlItems.forEach(element => {
            checkCollision(selectItem,element)
        });
    }
}

function checkCollision(selectItem: HTMLElement | null, items: HTMLElement | null) {
    if(selectItem != null && items != null){
        if(selectItem.offsetLeft < items.offsetLeft + items.offsetWidth &&
                        selectItem.offsetLeft + selectItem.offsetWidth > items.offsetLeft &&
                        selectItem.offsetTop < items.offsetTop + items.offsetHeight &&
                        selectItem.offsetTop + selectItem.offsetHeight > items.offsetTop){
                            clearInterval(interval)
                            let smokeParent : HTMLElement = selectItem.firstElementChild as HTMLElement
                           smokeParent.innerHTML += `
                           <div class="smoke"></div>
                           `;
                            items.removeEventListener('click', itemClicked);
                        }
    }

}

function removeGameArea(moveingItem:HTMLElement) {
    if(deathArea != null){
        if(-moveingItem.offsetHeight > moveingItem.offsetTop ||
            -moveingItem.offsetWidth > moveingItem.offsetLeft ||
            deathArea.offsetWidth - moveingItem.offsetWidth< moveingItem.offsetLeft ||
            deathArea.offsetHeight - moveingItem.offsetHeight < moveingItem.offsetTop){
            moveingItem.style.opacity = "0"; 
            clearInterval(interval)
        }
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