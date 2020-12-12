// script.js
//typer
var TxtType = function(el, toRotate, period) 
{
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = '';
    this.tick();
    this.isDeleting = false;
};

TxtType.prototype.tick = function() 
{
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];

    if (this.isDeleting) 
    {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
    } 
    else 
    {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

    var that = this;
    var delta = 200 - Math.random() * 100;

    if (this.isDeleting) 
    { 
        delta /= 2; 
    }

    if (!this.isDeleting && this.txt === fullTxt) 
    {
        delta = this.period;
        this.isDeleting = true;
    }
    else if (this.isDeleting && this.txt === '') 
    {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500; 
    }

    setTimeout(function() {
        that.tick();
    }, delta);
};

window.onload = function() 
{
    var elements = document.getElementsByClassName('typewrite');
    for (var i=0; i<elements.length; i++) 
    {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) 
        {
            new TxtType(elements[i], JSON.parse(toRotate), period);
        }
    }
    // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #0f0}";
    document.body.appendChild(css);
};
//typer end

//flash
window.addEventListener("load", function() 
{
    var f = document.getElementById('flash_text');
    setInterval(function() 
    {
        f.style.display = (f.style.display == 'none' ? '' : 'none');
    }, 500);
}, false);
//flash end

//get ?
function get_URL()
{
    var lang=document.getElementById("lang");
    if(lang==null)
    {
        window.location.replace("./en/index.html");
    }
    /*
    else if(lang=="chinese")
    {
        window.location.replace("../zh-tw/index.html");
    }
    else
    {
        window.location.replace("../en/index.html");
    }
    */
   alert(lang)
}

//trash
function trash()
{
    var strUrl = location.search;
    var getPara, ParaVal;
    var aryPara = [];
    if (strUrl.indexOf("?") != -1) 
    {
        if(strUrl.indexOf("?") != "lang")
        {
            window.location.replace("./en/index.html");
        }
        else
        {
            var getSearch = strUrl.split("?");
            getPara = getSearch[1].split("&");
            for (i = 0; i < getPara.length; i++) 
            {
                ParaVal = getPara[i].split("=");
                aryPara.push(ParaVal[0]);
                aryPara[ParaVal[0]] = ParaVal[1];
            }
            if(ParaVal[1]=="zh-tw")
            {
                window.location.replace("./zh-tw/index.html");
            }
            else
            {
                window.location.replace("./en/index.html");
            }
        }
    }
    else
    {
        window.location.replace("./en/index.html");
    }
}