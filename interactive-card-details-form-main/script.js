var inputs = document.querySelectorAll('.inputs');
var cardPlaces = document.querySelectorAll('.cards');
var cardPlacesCopy = document.querySelectorAll('.copy');
var wrongNumber = document.querySelector('.wrong-number');
inputs.forEach((element,index) => {
	element.addEventListener('keyup', () => {
		cardPlaces[index].innerText = inputs[index].value;

		if (cardPlaces[index].innerText == "") {
			cardPlacesCopy[index].style.opacity = "1";
		}
		else
			cardPlacesCopy[index].style.opacity = "0";
		if (element.classList.contains("number-input")) {
			if (!isInt(element.value)) {	
				element.classList.add("wrong");
				wrongNumber.innerText = "Wrong format, numbers only! ";
			}
			if(isInt(element.value) || element.value == ""){
				element.classList.remove("wrong");
				wrongNumber.innerText = "";
			}
		}
		errorSmall.forEach((element,index) => {
			if (inputsSmall[index].value !="") {

				element.innerText = "";
			}
		})
	});
})


var inputsSmall = document.querySelectorAll('.inputs-small');
var errorSmall = document.querySelectorAll('.error-small');
var button = document.querySelector('.confirm');
button.addEventListener('click', () => {
	
	inputsSmall.forEach((element,index) => {
		if (element.value == "") {
			errorSmall[index].innerText = "Can't be blank!";
		}
		else{
			errorSmall[index].innerText = "";
		}
	})
})





function isInt(value) {
  return !isNaN(value) && (function(x) { return (x | 0) === x; })(parseFloat(value))
}

