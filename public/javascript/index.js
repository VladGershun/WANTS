//javascript for index.html
//NOT IN USE
const logform = document.querySelector('#logform');
const username = document.querySelector('#usernameinput');
const password = document.querySelector('#passwordinput');



logform.addEventListener('submit', onSubmit);

function onSubmit(e) { //takes in event parameter
	e.preventDefault();

	username.value = username.value.toLowerCase();

	console.log(username.value);
}	

