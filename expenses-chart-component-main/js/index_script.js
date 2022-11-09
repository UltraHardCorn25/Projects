let session = new Session();
session = session.getSession();

if(session !== "") {
	window.location.href = "Bank.html";
}



var btn = document.querySelectorAll('.btn-confirm');

btn.forEach(e => {
	e.addEventListener('click', () => {
		colorChange(e);
	})
})
function colorChange(e){
	e.style.background = "#ec775f";
	setTimeout(function() {
		e.style.background = "transparent";
	},100)
}

var login = document.querySelector('.login');
var register = document.querySelector('.register');
var change = document.querySelector('.change');
var show = document.querySelector('.show');
change.addEventListener('click', () => {
	if (change.innerText == "Register") {
		register.style.display = "block";
		login.style.display = "none";
		change.innerText = "Login";
	}else if(change.innerText == "Login"){
		login.style.display = "block";
		register.style.display = "none";
		change.innerText = "Register";
	}
})
var clicked = 0;
register.addEventListener('click', () => {
	console.log(clicked);
	if (Registering() && clicked==0) {
		clicked = 1;
		var user = new User();
		user.username = document.querySelector('.name-input').value;
		user.password = document.querySelector('.password-input').value;
		user.money = "0";
		user.mon = "0";
	    user.tue = "0";
	    user.wed = "0";
	    user.thu = "0";
	    user.fri = "0";
	    user.sat = "0";
	    user.sun = "0";
		user.create();	
	}else if(clicked==1) {
		alert('The page is loading please dont try to register again!');
	} else {
		alert('Username and password needs to be over 5 and 8 characters!');
	}
})
login.addEventListener('click', () => {
	var user = new User();
	user.username = document.querySelector('.name-input').value;
	user.password = document.querySelector('.password-input').value;
	user.login();
})
show.addEventListener('click',() => {
	var password =  document.querySelector('.password-input');
	if(password.type == "text")
		password.type="password";
	else
		password.type="text";
})