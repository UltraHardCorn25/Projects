class User {
	user_id = '';
	username = '';
	password = '';
	api_url = 'https://6339d127d6ef071af816df6c.mockapi.io';
	create() {
		let data = {
			username:this.username,
			password:this.password,
			mon: this.mon, 
		    tue: this.tue ,
		    wed: this.wed ,
		    thu: this.thu ,
		    fri: this.fri ,
		    sat: this.sat ,
		    sun: this.sun ,
			money: this.money
		}
		fetch(this.api_url+'/Users',{
			method: "POST",
			headers: {
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {
			let session = new Session();
			session.user_id = data.id;
			session.startSession();
			window.location.href = 'Bank.html';			
		})
	}

	login() {
		fetch(this.api_url+'/Users')
		.then(res => res.json())
		.then(data => {
			let login_successful = 0;
			data.forEach(db_user => {
				if (db_user.username == this.username && db_user.password == this.password) {
					let session = new Session();
					session.user_id = db_user.id;
					session.startSession();
					login_successful =1;
					window.location.href = 'Bank.html';
				}
			});
			if (login_successful == 0) {
				alert('Pogresan Username ili password');
			}
		})
	}
	async get(user_id){
		let api_url = this.api_url + '/Users/' + user_id;
		let response = await fetch(api_url);
		let data = await response.json();
		return data;
	}
	saveSpending() {
		let data ={
			mon: this.mon, 
		    tue: this.tue ,
		    wed: this.wed ,
		    thu: this.thu ,
		    fri: this.fri ,
		    sat: this.sat ,
		    sun: this.sun ,
			money: this.money
		};

		let session = new Session();
		session_id = session.getSession();

		fetch(this.api_url+'/Users/'+session_id,{
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {})
	}
	saveTasks() {
		let data ={
			tasks: this.tasks 	    
		};

		let session = new Session();
		session_id = session.getSession();
		console.log(data);
		fetch(this.api_url+'/Users/'+session_id,{
			method: "PUT",
			headers: {
				'Content-Type': 'application/json'
			},
			body:JSON.stringify(data)
		})
		.then(res => res.json())
		.then(data => {})
	}
}


function Registering() {
	let username = document.querySelector('.name-input').value;
	let password = document.querySelector('.password-input').value;
	if(username.length >= 5 && password.length >= 8)
	{
		return true;
	}
}