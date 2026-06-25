const params = new URLSearchParams(window.location.search);
const id = Number(params.get("id"));

const blog = blogs.find(item => item.id === id);

const container = document.getElementById("postContainer");

if (blog) {

    container.innerHTML = `
    <img
        class="post-image"
        src="${blog.image}"
        alt="${blog.title}"
        loading="lazy"
    >

    <h1 class="post-title">${blog.title}</h1>

    <p class="post-meta">
        By ${blog.author} |
        ${blog.date} |
        ${blog.category}
    </p>

    <div class="post-actions">
        <button id="likeBtn">❤️ Like</button>
        <button id="bookmarkBtn">🔖 Bookmark</button>
    </div>

    <p class="post-content">
        ${blog.content}
    </p>

    <hr>

    <section class="comments">

        <h2>Comments</h2>

        <input
            type="text"
            id="commentName"
            placeholder="Your Name"
        >

        <textarea
            id="commentText"
            rows="5"
            placeholder="Write your comment..."
        ></textarea>

        <button id="commentBtn">
            Post Comment
        </button>

        <div id="commentList"></div>

    </section>

    <a class="back-btn" href="blog.html">
        ← Back to Blogs
    </a>
`;

    // ==========================
    // Like Button
    // ==========================

    const likeBtn = document.getElementById("likeBtn");

    const likeKey = `liked-${id}`;

    if (localStorage.getItem(likeKey)) {
        likeBtn.textContent = "❤️ Liked";
    }

    likeBtn.addEventListener("click", () => {

        if (localStorage.getItem(likeKey)) {

            localStorage.removeItem(likeKey);
            likeBtn.textContent = "❤️ Like";

        } else {

            localStorage.setItem(likeKey, "true");
            likeBtn.textContent = "❤️ Liked";

        }

    });

    // ==========================
    // Bookmark Button
    // ==========================

    const bookmarkBtn = document.getElementById("bookmarkBtn");

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks")) || [];

    if (bookmarks.includes(id)) {
        bookmarkBtn.textContent = "✅ Bookmarked";
    }

    bookmarkBtn.addEventListener("click", () => {

        if (bookmarks.includes(id)) {

            bookmarks = bookmarks.filter(bookmarkId => bookmarkId !== id);

            bookmarkBtn.textContent = "🔖 Bookmark";

        } else {

            bookmarks.push(id);

            bookmarkBtn.textContent = "✅ Bookmarked";

        }

        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

    });

} else {

    container.innerHTML = `
        <h1>Blog Not Found</h1>

        <p>The article you are looking for doesn't exist.</p>

        <a class="back-btn" href="blog.html">
            Go Back
        </a>
    `;

}

// ===========================
// Comments
// ===========================

const commentBtn = document.getElementById("commentBtn");
const commentName = document.getElementById("commentName");
const commentText = document.getElementById("commentText");
const commentList = document.getElementById("commentList");

const commentKey = `comments-${id}`;

let comments = JSON.parse(localStorage.getItem(commentKey)) || [];

function displayComments(){

    commentList.innerHTML = "";

    comments.forEach(comment=>{

        commentList.innerHTML += `
            <div class="comment">
                <h4>${comment.name}</h4>
                <p>${comment.text}</p>
            </div>
        `;

    });

}

displayComments();

commentBtn.addEventListener("click",()=>{

    const name = commentName.value.trim();
    const text = commentText.value.trim();

    if(name==="" || text===""){

        alert("Please fill all fields.");

        return;

    }

    comments.push({

        name:name,
        text:text

    });

    localStorage.setItem(commentKey,JSON.stringify(comments));

    commentName.value="";
    commentText.value="";

    displayComments();

});