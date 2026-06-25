const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click",()=>{

    navLinks.classList.toggle("show");

    if(navLinks.classList.contains("show")){
        menuBtn.innerHTML="✖";
    }
    else{
        menuBtn.innerHTML="☰";
    }

});
// Newsletter Subscription

const subscribeBtn = document.querySelector(".newsletter button");

subscribeBtn.addEventListener("click", () => {

    const email = document.querySelector(".newsletter input").value;

    if(email === ""){
        alert("Please enter your email.");
    }
    else{
        alert("Thank you for subscribing!");
        document.querySelector(".newsletter input").value = "";
    }

});

const featuredContainer = document.getElementById("featuredBlogs");

blogs.slice(0,3).forEach(blog=>{

featuredContainer.innerHTML += `

<div class="blog-card">

<img src="${blog.image}" alt="${blog.title}" loading="lazy">

<h3>${blog.title}</h3>

<p>${blog.description}</p>

<a href="post.html?id=${blog.id}">Read More →</a>

</div>

`;

});
// Smooth Scrolling

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener("click", function(e){

        e.preventDefault();

        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior:"smooth"
        });

    });

});

document.querySelectorAll(".nav-links a").forEach(link=>{

    link.addEventListener("click",()=>{

        navLinks.classList.remove("show");
        menuBtn.innerHTML="☰";

    });

});