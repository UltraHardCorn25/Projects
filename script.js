var result = document.querySelector('.result');
var buttons = document.querySelectorAll('.showable');
var Delete = document.querySelector('.delete');
var equal = document.querySelector('.equals');
var reset = document.querySelector('.reset');
var res='';
var regex = /[\d|,|.|e|E|\+]+/g;
buttons.forEach(e =>{
    e.addEventListener('click', () => {
        //this if is to check if user is trying to press more symbols in a row.
        if(result.innerText.length>0 && isNaN(e.innerText) && isNaN(result.innerText.substring(result.innerText.length-1))){
        } else if(isNaN(e.innerText) && result.innerText!="")//this else if is to check if user is pressing symbols and to change x in to * just fot estetic.
        {
            var s= result.innerText +  e.innerText;
            result.innerText = s;
            if(e.innerText =='x')
            {
                res+='*';
            }
            else
                res +=e.innerText;
            
        } else if(!isNaN(e.innerText)){ //this else if is to check for
            result.innerText += e.innerText;
            res +=e.innerText;
        }
        e.style.backgroundColor="white";
        window.setTimeout( ()=>{e.style.backgroundColor="";},100);
    })
});
Delete.addEventListener('click', () => {
    if(result.innerText!="" || !isNaN(e.innerText))
    {
        var s = result.innerText;
        s = s.substring(0,s.length-1);
        result.innerText=s;
        res = result.innerText;
    }
});
equal.addEventListener('click', () => {
    result.innerText = math.round(math.evaluate(res),5);
    res = result.innerText;
});
reset.addEventListener('click', () => {
    result.innerText = '';
    res = result.innerText;
});


var slider = document.querySelector('.slider');
var dot = document.querySelector('.dot');
var style = document.querySelector('#stylesheet');
var counter=0;
slider.addEventListener('click',e=>{
    counter++;
    if(counter==0)
    {
        dot.style.left="4px";
        style.setAttribute('href', 'style-blue.css');
    }
    else if(counter==1)
    {    
        dot.style.left="28px";
        
        style.setAttribute('href', 'style-white.css');
    }
    else if(counter==2)
    {
        counter=-1;
        dot.style.left="52px";
        style.setAttribute('href', 'style-purple.css');
    }  
})


