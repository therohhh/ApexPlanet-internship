const form = document.getElementById("contactForm");

form.addEventListener("submit", function(e){

e.preventDefault();

const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const message = document.getElementById("message").value.trim();

if(name === "" || email === "" || message === ""){

alert("Please fill in all fields.");

return;

}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

if(!emailPattern.test(email)){

alert("Please enter a valid email.");

return;

}

alert("Message sent successfully!");

form.reset();

});