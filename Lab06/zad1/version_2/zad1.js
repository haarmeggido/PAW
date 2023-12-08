var counter = 0;
var swap = false;
var yellowEnabled = true;
var redEnabled = true;
var propagationEnabled = false;

function handleCounter(value, element) {
    if (!propagationEnabled) {
        event.stopPropagation();
    }
    if (swap){
        // get parent of the element
        let parentElement = element.parentNode;
        event.stopPropagation();
        parentElement.click();
    }
    if (counter == undefined) {
        counter = 0;
    }
    if ((value == "yellowBtn" && !yellowEnabled) || (value == "redBtn" && !redEnabled)) {
        return;
    }
    var add = 0;
    switch(value){
        case "blueBtn":
            add = 1;
            break;
        case "redBtn":
            add = 2;
            break;
        case "yellowBtn":
            add = 5;
            break;
        }
    


    counter += add;
    document.getElementById("counter").innerHTML = counter;
    console.log("nacisnales " + value + " o wartosci " + add);
    document.getElementById("order").innerHTML = value + " clicked, added points: " + add;
    
    // if counter is 30 then disable yellow div button
    if (counter >= 30) {
        yellowEnabled = false;
    }
    if (counter >= 50) {
        redEnabled = false;
    }
}

function enablePropagation() {
    propagationEnabled = !propagationEnabled;
    var txt = propagationEnabled ? "Stop propagation" : "Start propagation";
    document.getElementById("propagation").innerHTML = txt;
}

function resetCounter() {
    counter = 0;
    swap = false;
    propagationEnabled = false;
    document.getElementById("propagation").innerHTML = "Start propagation";
    yellowEnabled = true;
    redEnabled = true;
    document.getElementById("counter").innerHTML = counter;
    document.getElementById("order").innerHTML = "reset to default";
}

function changeOrder() {
    swap = !swap;
    var txt = swap ? "bottom -> top" : "top -> bottom";
    document.getElementById("order").innerHTML = `order switch (${txt})`;
}