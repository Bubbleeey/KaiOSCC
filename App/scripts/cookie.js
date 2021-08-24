//user data (add to external js later)
let cookie = 0;
let cpc = 1;
let cps = 0;
let autoclick = 1;
let autoclickcost = 10;
let autoclickpower = 1;
let farm = 1;
let farmcost = 250;
let farmpower = 10;
let mine = 1;
let minecost = 5000;
let minepower = 120;
let factory = 1;
let factorycost = 75000;
let factorypower = 1500;
let bank = 1;
let bankcost = 1000000;
let bankpower = 17500;

click1 = new Audio("assets/click-01.wav")

//auto load
window.addEventListener("load", function(){
    load();
});


//data persistence (add to external js later)
function save()
{
    localStorage.setItem("cookie", cookie);
    localStorage.setItem("cpc", cpc);
    localStorage.setItem("cps", cps);
    localStorage.setItem("autoclick", autoclick);
    localStorage.setItem("autoclickcost", autoclickcost);
    localStorage.setItem("autoclickpower", autoclickpower);
    localStorage.setItem("farm", farm);
    localStorage.setItem("farmcost", farmcost);
    localStorage.setItem("farmpower", farmpower);
    localStorage.setItem("mine", mine);
    localStorage.setItem("minecost", minecost);
    localStorage.setItem("minepower", minepower);
    localStorage.setItem("factory", factory);
    localStorage.setItem("factorycost", factorycost);
    localStorage.setItem("factorypower", factorypower);
    localStorage.setItem("bank", bank);
    localStorage.setItem("bankcost", bankcost);
    localStorage.setItem("bankpower", bankpower);
}

function load()
{
    cookie = parseInt(localStorage.getItem("cookie"));
    cpc = parseInt(localStorage.getItem('cpc'))
    cps = parseInt(localStorage.getItem('cps'))
    autoclick = parseInt(localStorage.getItem("autoclick"));
    autoclickcost = parseInt(localStorage.getItem("autoclickcost"));
    autoclickpower = parseInt(localStorage.getItem("autoclickpower"));
    farm = parseInt(localStorage.getItem("farm"));
    farmcost = parseInt(localStorage.getItem("farmcost"));
    farmpower = parseInt(localStorage.getItem("farmpower"));
    mine = parseInt(localStorage.getItem("mine"));
    minecost = parseInt(localStorage.getItem("minecost"));
    minepower = parseInt(localStorage.getItem("minepower"));
    factory = parseInt(localStorage.getItem("factory"));
    factorycost = parseInt(localStorage.getItem("factorycost"));
    factorypower = parseInt(localStorage.getItem("factorypower"));
    bank = parseInt(localStorage.getItem("bank"));
    bankcost = parseInt(localStorage.getItem("bankcost"));
    bankpower = parseInt(localStorage.getItem("bankpower"));
    update();
    notification("Save Loaded", false);
}

function reset()
{
    cookie = 0;
    cpc = 1;
    cps = 0;
    autoclick = 1;
    autoclickcost = 10;
    autoclickpower = 1;
    farm = 1;
    farmcost = 250;
    farmpower = 10;
    mine = 1;
    minecost = 5000;
    minepower = 250;
    factory = 1;
    factorycost = 75000;
    factorypower = 1500;
    bank = 1;
    bankcost = 1000000;
    bankpower = 17500;
    save();
    update();
    notification("Game Reset", false);

}
//Display Updater
function update()
{
    document.getElementById("counter").innerHTML = cookie + " Cookies!";
    document.getElementById("cps").innerHTML = cps + " CPS!";
    document.getElementById("cpc").innerHTML = cpc + " CPC";
    document.getElementById("autoclickers").innerHTML = "(1) " +(autoclick-1) + " Autoclickers | +1 Cost " + autoclickcost;
    document.getElementById("farm").innerHTML = "(2) " +(farm-1) + " Farms | +1 Cost " + farmcost;
    document.getElementById("mine").innerHTML = "(3) " +(mine-1) + " Mines | +1 Cost " + minecost;
    document.getElementById("factory").innerHTML = "(4) " +(factory-1) + " Factory's | +1 Cost " + factorycost;
    document.getElementById("bank").innerHTML = "(5) " +(bank-1) + " Banks | +1 Cost " + bankcost;
}

//notification handler
//add next https://apvarun.github.io/toastify-js/#
function notification(message, error)
{
    if(error === true)
    {
        Toastify
        (
            {
              text: message.toString(),
              duration: 1000,
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
                duration: 1000,
                gravity: "bottom",
                backgroundColor: "rgba(0,0,0,0.7)"
            }
        ).showToast();
    }
}
//maybe add animation css toggle later + fix audio issues on fast consecutive calls
function click()
{
    click1.play();
    cookie += cpc;
    document.getElementById('cookie').style.height = '100px';
    document.getElementById('cookie').style.width = '100px';
    document.getElementById('cookie').style.marginLeft = '1.5rem';
    document.getElementById('cookie').style.marginTop = '1.65rem';
    document.getElementById('cookie').style.marginBottom = '1.5rem';
    setTimeout(function ()
    {
        document.getElementById('cookie').style.height = null;
        document.getElementById('cookie').style.width = null;
        document.getElementById('cookie').style.marginLeft = null;
        document.getElementById('cookie').style.marginTop = null;
        document.getElementById('cookie').style.marginBottom = null ;
    }, 50);
}

//global timer
function timer()
{
    cookie = cookie + cps;
    update();
} setInterval(timer, 1000)

//Buying Functions
function buyautoclick()
{
    if (autoclick % 5 === 0 && cookie >= (autoclickcost+1))
    {
        notification("Upgrade Bonus: +5 CPC", false);
        upgradecpc(5);
    } else {}
    if(autoclick % 25 === 0 && cookie >= (autoclickcost+1) )
    {
        autoclickpower = (autoclickpower * 100);
        cps += (autoclickpower * autoclick);
        notification("Upgrade Bonus: 100x AutoClick Power", false);
    } else {}
    if (cookie >= (autoclickcost+1))
    {
        cookie = cookie - (autoclickcost+1);
        autoclick +=1;
        cps += autoclickpower;
        autoclickcost = Math.round((autoclickcost+1)*1.25)
        save();
        update();
    }
    else {notification("Insufficient Cookies", true);}
}

function buyfarm()
{
    if (farm % 5 === 0 && cookie >= (farmcost+1))
    {
        notification("Upgrade Bonus: +25 CPC", false);
        upgradecpc(25);
    }
    if(farm % 25 === 0 && cookie >= (farmcost+1))
    {
        farmpower = (farmpower * 100);
        cps += (farmpower * farm);
        notification("Upgrade Bonus: 100x Farm Power", false);
    }
    if (cookie >= (farmcost+1))
    {
        cookie = cookie - (farmcost+1);
        farm +=1;
        cps += farmpower;
        farmcost = Math.round((farmcost+1)*1.35)
        save();
        update();
    }
    else {notification("Insufficient Cookies", true);}
}

function buymine()
{
    if (mine % 5 === 0 && cookie >= (minecost+1))
    {
        notification("Upgrade Bonus: +125 CPC", false);
        upgradecpc(125);
    }
    if(mine % 25 === 0 && cookie >= (minecost+1))
    {
        minepower = (minepower * 100);
        cps += (minepower * mine);
        notification("Upgrade Bonus: 100x Mine Power", false);
    }
    if (cookie >= (minecost+1))
    {
        cookie = cookie - (minecost+1);
        mine +=1;
        cps += minepower;
        minecost = Math.round((minecost+1)*1.45)
        save();
        update();
    }
    else {notification("Insufficient Cookies", true);}
}

function buyfactory()
{
    if (factory % 5 === 0 && cookie >= (factorycost+1))
    {
        notification("Upgrade Bonus: +625 CPC", false);
        upgradecpc(625);
    }
    if(factory % 25 === 0 && cookie >= (factorycost+1))
    {
        factorypower = (factorypower * 100);
        cps += (factorypower * factory);
        notification("Upgrade Bonus: 100x Factory Power", false);
    }
    if (cookie >= (factorycost+1))
    {
        cookie = cookie - (factorycost+1);
        factory +=1;
        cps += factorypower;
        factorycost = Math.round((factorycost+1)*1.55)
        save();
        update();
    }
    else {notification("Insufficient Cookies", true);}
}

function buybank()
{
    if (bank % 5 === 0 && cookie >= (bankcost+1))
    {
        notification("Upgrade Bonus: +3125 CPC", false);
        upgradecpc(3125);
    }
    if(bank % 25 === 0 && cookie >= (bankcost+1))
    {
        bankpower = (bankpower * 100);
        cps += (bankpower * bank);
        notification("Upgrade Bonus: 100x Bank Power", false);
    }
    if (cookie >= (bankcost+1))
    {
        cookie = cookie - (bankcost+1);
        bank +=1;
        cps += bankpower;
        bankcost = Math.round((bankcost+1)*1.65)
        save();
        update();
    }
    else {notification("Insufficient Cookies", true);}
}

function upgradecpc(amount)
{
    cpc += amount;
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
            click();
            update();
            break;
        case '1':
            buyautoclick();
            break;
        case '2':
            buyfarm();
            break;
        case '3':
            buymine();
            break;
        case '4':
            buyfactory();
            break;
        case '5':
            buybank();
            break;
        case '0':
            reset();
            break;
        case '9':
            cookie += 1000000000;
            break;
        case 'Back':
            save();
            close();
            break;
        case 'EndCall':
            save();
            close();
            break;
    }
    console.log(evt.key);
}

document.addEventListener('keydown', handleKeyDown);