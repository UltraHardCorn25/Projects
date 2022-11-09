var result = document.querySelector('.result');
var buttons = document.querySelectorAll('.showable');
var Delete = document.querySelector('.delete');
var equal = document.querySelector('.equals');
var reset = document.querySelector('.reset');
var res='';
var regex = /[\d|,|.|e|E|\+]+/g;

buttons.forEach(e =>{
    e.addEventListener('click', () => {
        
        if(isNaN(e.innerText))
        {
            var s= result.innerText +  e.innerText;
            result.innerText = s;
            if(e.innerText =='x')
            {
                res+='*';
            }
            else
                res +=e.innerText;
            
        } else {
            result.innerText += e.innerText;
            res +=e.innerText;
        }
        
    })
});
Delete.addEventListener('click', () => {
    var s = result.innerText;
    s = s.substring(0,s.length-1);
    result.innerText=s;
    res = result.innerText;
});
equal.addEventListener('click', () => {
    result.innerText = math.round(math.evaluate(res),5);
    res = result.innerText;
});
reset.addEventListener('click', () => {
    result.innerText = '';
    res = result.innerText;
});