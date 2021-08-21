//user data (add to external js later)
let cookie = 0;
let multiplier = 1;
let autoclick = 0;

//data persistence (add to external js later)
function save()
{
    localStorage.setItem("cookie", cookie);
    localStorage.setItem("multiplier", multiplier);
    localStorage.setItem("autoclick", autoclick);
}

function load()
{
    cookie = localStorage.getItem("cookie");
    cookie = parseInt(cookie);
    multiplier = localStorage.getItem("multiplier");
    multiplier = parseInt(multiplier);
    autoclick = localStorage.getItem("autoclick");
    autoclick = parseInt(autoclick);
    update();
}

//Display Updater
function update()
{
    document.getElementById("counter").innerHTML = cookie + " Cookies!";
    document.getElementById("cps").innerHTML = (autoclick*multiplier) + " CPS!";
    document.getElementById("autoclickers").innerHTML = autoclick + " Autoclickers | +1 Cost " + ((autoclick+1)*12);
    document.getElementById("multiplers").innerHTML = multiplier + " Multiplers | +1 Cost " + ((multiplier+1)*100);
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
    if (cookie >= ((autoclick+1)*12))
    {
        cookie = cookie - ((autoclick+1)*12);
        autoclick +=1;
        update();
    }
}

function buymultiplier()
{
    if (cookie >= ((multiplier+1)*100))
    {
        cookie = cookie - ((multiplier+1)*100);
        multiplier +=1;
        update();
    }
}

//input handler
function handleKeyDown(evt) {
    switch (evt.key) {
        case 'SoftLeft':
            load();
            break;
        case 'SoftRight':
            save();
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