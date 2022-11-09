//making the session
let session = new Session();
session_id = session.getSession();
var dayInWeek = ["mon","tue","wed","thu","fri","sat","sun"];
if (session_id !== "") {
	async function populateUserData() {
		var user = new User();
		user = await user.get(session_id);
		document.querySelector('.money-count-small').innerText = "$"+user['money'];
		document.querySelectorAll('#show').forEach((e,index) => {
			e.innerText = "$"+user[dayInWeek[index]];
		})



		var tasks = user['tasks'].split(';').slice(0,user['tasks'].split(';').length-1);
		var list = document.querySelector('.to_do-list');
		tasks.forEach((e,index) => {
			var taskAdd = document.createElement('li');
			taskAdd.classList.add('task');
			
			if(e.includes('#done#')) {
				e = e.slice(0,e.length-6);
				taskAdd.style.background="#50ce6e";
				taskAdd.style.textDecoration= "line-through 3px";
				taskAdd.innerHTML = `<p class="text-all">${e}</p><button class="remove-list"></button>`;
				list.appendChild(taskAdd);
				FinishTask(taskAdd);
				RemoveTask(taskAdd);
			} else{
				taskAdd.innerHTML = `<p class="text-all">${e}</p><button class="remove-list"></button>`;
				list.appendChild(taskAdd);
				FinishTask(taskAdd);
				RemoveTask(taskAdd);
			}
			
			
		})
		Sizeing()
	}
	populateUserData();
}
else {
	window.location.href = "index.html"
}

//opening settings
let settings = document.querySelector('.settings');
let optionsContainer = document.querySelector('.option-container');
settings.addEventListener('click',()=>{
	if(optionsContainer.style.width=="60px"){
		optionsContainer.style.width="0";
		optionsContainer.style.height="0";
	} else {
		optionsContainer.style.width="60px";
		optionsContainer.style.height="220px";}
});



//aditional options

let options = document.querySelectorAll('.option');
let spent = document.querySelector('.spent');
let earned = document.querySelector('.earned');
let overlay = document.querySelector('.overlay');




//add money
options[0].addEventListener('click',()=>{
	overlay.style.display = "block";
	earned.style.width = "300px";
	earned.style.height = "200px";
	earned.style.padding = "20px";
	let close = earned.querySelector('.close');
	close.addEventListener('click',()=>{
		earned.style.width = "0px";
		earned.style.height = "0px";
		earned.style.padding = "0px";
		overlay.style.display = "none";
	});
});



//add spent money
options[1].addEventListener('click',()=>{
	overlay.style.display = "block";
	spent.style.width = "300px";
	spent.style.height = "300px";
	spent.style.padding = "20px";
	let close = spent.querySelector('.close');
	close.addEventListener('click',()=>{
		spent.style.width = "0px";
		spent.style.height = "0px";
		spent.style.padding = "0px";
		overlay.style.display = "none";
	});
});

//log out
options[2].addEventListener('click',()=>{
	session.destroySession()
	window.location.href = "index.html";
});



var week = document.querySelector('.money-count-big');
var days = document.querySelectorAll('.day');
var money = document.querySelectorAll('#show');
var confirm = document.querySelectorAll('.btn-confirm');
var total=0;
var max;
var day;


//add money to balance
var balance = document.querySelector('.money-count-small');
confirm[1].addEventListener('click',() => {
	var addInput = document.querySelectorAll('.add-input');
	if(Number(addInput[1].value)>1_000_000)
		alert("You can't enter more than 1.000.000 dollars please split it in smaller amounts.");
	else if(Number(addInput[1].value)<0)
	{
		addInput[1].value ='';
		alert("You can't enter negative amount!");	
	}
		
	else
	{
		balance.innerText = "$"+(Number(addInput[1].value)+Number(balance.innerText.split('$')[1]));
		earned.style.width = "0px";
		earned.style.height = "0px";
		earned.style.padding = "0px";
		overlay.style.display = "none";
		var show = document.querySelectorAll('#show');
		var user = new User();	
		show.forEach((e,index)=>{
			user[dayInWeek[index]] = e.innerText.split('$')[1];	
		})
		user.money = this.balance.innerText.split('$')[1];
		Spending();
	}
})


//animation for the click on the days
document.querySelectorAll('.select-day').forEach((e,index)=>{
	e.addEventListener('click',()=>{
		var active = document.querySelector('.active');
		if(active !==null)
			active.classList.remove('active');
		e.classList.add('active');
		day = index;
	})
})
confirm[0].addEventListener('click',() => {
	var addInput = document.querySelectorAll('.add-input')[0];
	var total = week.innerText.split('$')[1];
	var balance = this.balance.innerText.split('$')[1];
	
	if(day == undefined)
		alert('You didnt select a day!');
	else if(Number(addInput.value) >= Number(balance) || Number(addInput.value)>1_000_000)
		alert('You cant spend that much money!');
	else if(Number(addInput.value)<0)
	{
		addInput.value ='';
		alert("You can't enter negative amount!");	
	}
	else {
		this.balance.innerText = "$"+ (Number(this.balance.innerText.split('$')[1])-Number(addInput.value));
		if (addInput.value=="") {
			money[day].innerText = "$0";
			addInput = '20';
		}
		else
		{
			money[day].innerText = "$"+(Number(addInput.value)+Number(money[day].innerText.split('$')[1]));
		}
		if(addInput.value==0)
			addInput.value=1;
		Sizeing()
		spent.style.width = "0px";
		spent.style.height = "0px";
		spent.style.padding = "0px";
		overlay.style.display = "none";
		total=0;
		money.forEach(e => {
			var number = e.innerText.split('$')[1];
			total+=parseInt(number);
		})
		week.innerText="$"+total;
		Spending();
	}
})
days.forEach((e,index) => {
	money[index].innerText = "0$";
	e.addEventListener('mouseenter',() => {
			e.style.background = "hsl(186, 34%, 60%)";
			money[index].style.opacity = "1";
	})
	e.addEventListener('mouseleave',() => {
			money[index].style.opacity = "0";
			e.style.background = "hsl(10, 79%, 65%)";			

	})
})

//Looking for the right size
function Sizeing(){
	var max = Max();
	var total = 0;
	days.forEach((e,index)=>{
		e.style.height = (130/(max/money[index].innerText.split('$')[1]))+"%";
		if ((130/(max/money[index].innerText.split('$')[1]))<1) {
			e.style.height = "1%";
		}
		total+=Number(money[index].innerText.split('$')[1]);
	})
	var week = document.querySelector('.money-count-big');
	week.innerText="$"+total;
}
//Saveing the info to the API
function Spending() {
	var show = document.querySelectorAll('#show');
	var user = new User();	
	show.forEach((e,index)=>{
		user[dayInWeek[index]] = e.innerText.split('$')[1];	
	})
	user.money = this.balance.innerText.split('$')[1];
	user.saveSpending();
}

//finding max num
function Max() {
	var max = money[0].innerText.split('$')[1];
	money.forEach(e => {
		var number = e.innerText.split('$')[1];
		if(Number(max) < Number(number))
			max=number
	})
	if (max==0)
		max=1;
	return max;
}


//putting tasks on to do list

var taskBtn = document.querySelector('.to_do_add');
var task = document.querySelector('.to_do');
var list = document.querySelector('.to_do-list');
taskBtn.addEventListener('click', () => {
	if(task.value == "")
		alert("You didn't type anything");
	else {
		//Showing up the task
		var taskAdd = document.createElement('li');
		taskAdd.classList.add('task');
		taskAdd.innerHTML =`<p class="text-all">${task.value}</p><button class="remove-list"></button>`;
		list.appendChild(taskAdd);
		task.value = "";

		//On click finish the task
		FinishTask(taskAdd);

		//Remove the task on button click
		RemoveTask(taskAdd);


		var user = new User();
		user.tasks = GettingTasks();
		console.log(user)
		user.saveTasks();
	}
});

function FinishTask(taskAdd){
	taskAdd.addEventListener('click',()=> {
		if(taskAdd.style.background=="rgb(80, 206, 110)")
		{
			taskAdd.style.background="transparent";
			taskAdd.style.textDecoration= "none";
		} else {
			taskAdd.style.background="#50ce6e";
			taskAdd.style.textDecoration= "line-through 3px";
		}
		var user = new User();
		user.tasks = GettingTasks();
		user.saveTasks();
	});
	
}
function RemoveTask(taskAdd) {
	var removeBtn = document.querySelectorAll('.remove-list');
	removeBtn = removeBtn[removeBtn.length-1];
	removeBtn.addEventListener('click', () => {
		taskAdd.outerHTML="";
	});
}
function GettingTasks(){
	var user = new User();
	var tasks=document.querySelectorAll('.task');
	user.tasks = "";
	tasks.forEach(e => {
		if(e.style.background=="rgb(80, 206, 110)")
			user.tasks += e.innerText + "#done#;";
		else
			user.tasks += e.innerText + ";";
	})
	return user.tasks;
}


window.onbeforeunload = function()
{
	var user = new User();
	user.tasks = GettingTasks();
	user.saveTasks(); 
	return undefined;
};
