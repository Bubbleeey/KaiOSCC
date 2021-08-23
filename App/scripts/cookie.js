//user data (add to external js later)
let cookie = 0;
let multiplier = 1;
let autoclick = 0;
let multipliercost = 100;
let autoclickcost = 10;

//auto load
window.addEventListener("load", function(){
    load();
});

//data persistence (add to external js later)
function save()
{
    localStorage.setItem("cookie", cookie);
    localStorage.setItem("multiplier", multiplier);
    localStorage.setItem("autoclick", autoclick);
    localStorage.setItem("multipliercost", multipliercost);
    localStorage.setItem("autoclickcost", autoclickcost);
}

function load()
{
    cookie = localStorage.getItem("cookie");
    cookie = parseInt(cookie);
    multiplier = localStorage.getItem("multiplier");
    multiplier = parseInt(multiplier);
    autoclick = localStorage.getItem("autoclick");
    autoclick = parseInt(autoclick);
    multipliercost = localStorage.getItem("multipliercost");
    multipliercost = parseInt(multipliercost);
    autoclickcost = localStorage.getItem("autoclickcost");
    autoclickcost = parseInt(autoclickcost);
    update();
    notification("Save Loaded", false);
}

//Display Updater
function update()
{
    document.getElementById("counter").innerHTML = cookie + " Cookies!";
    document.getElementById("cps").innerHTML = (autoclick*multiplier) + " CPS!";
    document.getElementById("autoclickers").innerHTML = autoclick + " Autoclickers | +1 Cost " + autoclickcost;
    document.getElementById("multiplers").innerHTML = multiplier + " Multiplers | +1 Cost " + multipliercost;
}

//notification handler
//add next https://apvarun.github.io/toastify-js/#
function notification(message, error)
{
    if(error == true)
    {
        Toastify
        (
            {
              text: message.toString(),
              duration: 3000,
              gravity: "bottom",
              backgroundColor: "rgba(255,0,0,0.7)"
            }
        ).showToast();
    }
    else
    {
        Toastify
        (
            {
                text: message.toString(),
                duration: 3000,
                gravity: "bottom",
                backgroundColor: "rgba(0,0,0,0.7)"
            }
        ).showToast();
    }
}

//global timer
function timer()
{
    cookie = cookie + autoclick*multiplier;
    update();
} setInterval(timer, 1000)

//Buying Functions
function buyautoclick()
{
    if (cookie >= (autoclickcost+1))
    {
        cookie = cookie - (autoclickcost+1);
        autoclick +=1;
        autoclickcost = ((autoclickcost+1)*2)
        save();
        update();
    }
    else {notification("Insufficient Cookies", true)}
}

function buymultiplier()
{
    if (cookie >= (multipliercost+1))
    {
        cookie = cookie - (multipliercost+1);
        multiplier +=1;
        multipliercost = ((multipliercost+1)*10);
        save();
        update();
    }
    else {notification("Insufficient Cookies", true)}
}

//input handler
function handleKeyDown(evt) {
    switch (evt.key) {
        case 'SoftLeft':
            load();
            break;
        case 'SoftRight':
            save();
            notification("Game Saved", false);
            break;
        case 'Enter':
            cookie += 1;
            update();
            break;
        case '1':
            buyautoclick();
            break;
        case '2':
            buymultiplier();
            break;
    }
};

document.addEventListener('keydown', handleKeyDown);