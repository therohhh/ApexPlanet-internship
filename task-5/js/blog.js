const blogContainer = document.getElementById("blogContainer");

function displayBlogs(blogList){

    blogContainer.innerHTML = "";

    blogList.forEach(blog=>{

        blogContainer.innerHTML += `

        <div class="blog-card">

            <img src="${blog.image}" alt="${blog.title}" loading="lazy">

            <h3>${blog.title}</h3>

            <p>${blog.description}</p>

            <small>
                ${blog.category} • ${blog.date}
            </small>

            <br><br>

            <a href="post.html?id=${blog.id}">
                Read More →
            </a>

        </div>

        `;

    });

}

displayBlogs(blogs);
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("keyup",()=>{

const value = searchInput.value.toLowerCase();

const filtered = blogs.filter(blog=>

blog.title.toLowerCase().includes(value) ||

blog.description.toLowerCase().includes(value)

);

displayBlogs(filtered);

});
const buttons = document.querySelectorAll(".category-btn");

buttons.forEach(button=>{

button.addEventListener("click",()=>{

buttons.forEach(btn=>btn.classList.remove("active-btn"));

button.classList.add("active-btn");

const category = button.dataset.category;

if(category==="All"){

displayBlogs(blogs);

return;

}

const filtered = blogs.filter(blog=>blog.category===category);

displayBlogs(filtered);

});

});