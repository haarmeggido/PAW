let clicks = Number(localStorage.getItem("clicks"))|| 0;
let click_switch = 1;

function increaseClicks(){
    if(click_switch){
        clicks++;
        updateClicks();
    }
}
function js_switch_mode(){
    click_switch = !click_switch;
    const switch_button = document.querySelector('.switch');
    if(click_switch){
        switch_button.innerHTML = "switch on";
    }
    else{
        switch_button.innerHTML = "switch off";
        clicks = 0;
        localStorage.setItem("clicks", '0');
        updateClicks();
    }
}

function updateClicks(){
    document.querySelector(".clickVal").innerHTML = `clicks: ${clicks}`;
    localStorage.setItem("clicks", clicks.toString());
    console.log(localStorage.getItem("clicks"))
}

