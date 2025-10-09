let posts = [];
let currentPage = 1;
const postsPerPage = 12;
let activeCategory = "all";
const categories = ["tech", "travel", "lifestyle", "education"];

// DOM refs
const postsContainer = document.getElementById("postsContainer");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");
const categoryFilter = document.getElementById("categoryFilter");
const latestPostsEl = document.getElementById("latestPosts");
const trendingPostsEl = document.getElementById("trendingPosts");

// modal refs
const postModal = document.getElementById("postModal");
const closeModalBtn = document.getElementById("closeModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalImg = document.getElementById("modalImg");
const modalCategory = document.getElementById("modalCategory");
const modalId = document.getElementById("modalId");

// newsletter refs
const newsletterEmail = document.getElementById("newsletterEmail");
const subscribeBtn = document.getElementById("subscribeBtn");
const newsletterMsg = document.getElementById("newsletterMsg");

const dotsLoader = document.getElementById("dotsLoader");

function showLoader() {
  if (!dotsLoader) return;
  dotsLoader.classList.remove("hidden");
  dotsLoader.setAttribute("aria-hidden", "false");
}

function hideLoader() {
  if (!dotsLoader) return;
  setTimeout(() => {
    dotsLoader.classList.add("hidden");
    dotsLoader.setAttribute("aria-hidden", "true");
  }, 200);
}

async function main() {
    try {
        showLoader(); 
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        posts = await response.json();

        // assign random categories
        posts = posts.map((p) => ({
            ...p,
            category: categories[Math.floor(Math.random() * categories.length)],
            liked: false,
        }));

        renderPosts();
        updateSidebar();
    } catch (err) {
        console.error("Failed to fetch posts:", err);
        postsContainer.innerHTML = "<p style='padding:1rem'>Unable to load posts right now.</p>";
    } finally {
    hideLoader();                    // <- hide after render/update
    }
    
}

/* ---------- RENDER POSTS ---------- */
function renderPosts() {
    postsContainer.innerHTML = "";

    const searchValue = (searchInput.value || "").toLowerCase().trim();
    const filteredPosts = posts.filter((post) => {
        const title = (post.title || "").toLowerCase();
        const body = (post.body || "").toLowerCase();
        const cat = (post.category || "").toLowerCase();
        const matchesSearch = !searchValue || title.includes(searchValue) || body.includes(searchValue) || cat.includes(searchValue);
        const matchesCategory = activeCategory === "all" || post.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
    if (filteredPosts.length === 0) {
        postsContainer.innerHTML = `<div style="padding:1.2rem;background:#fff;border-radius:10px;box-shadow:0 4px 10px rgba(0,0,0,0.06);"><h3>No posts found</h3><p>Try a different keyword or category.</p></div>`;
        pageInfo.innerText = "No posts found";
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }

    if (currentPage > totalPages) currentPage = totalPages;
    if (currentPage < 1) currentPage = 1;

    const start = (currentPage - 1) * postsPerPage;
    const end = start + postsPerPage;
    const paginatedPosts = filteredPosts.slice(start, end);

    paginatedPosts.forEach((post) => {
        const randomImg = `https://picsum.photos/seed/${post.id}/400/200`;
        const shortBody = post.body.length > 100 ? post.body.substring(0, 100) + "..." : post.body;
        const card = document.createElement("article");
        card.className = "post-card";
        card.innerHTML = `
      <img class="post-img" src="${randomImg}" alt="Post image" loading="lazy">
      <div class="post-content">
        <h3>${escapeHtml(post.title)}</h3>
        <p>${escapeHtml(shortBody)}</p>
      </div>
      <small style="padding:0 1rem 0.8rem; color:#666;">Category: <strong>${escapeHtml(post.category)}</strong></small>
      <div class="card-actions">
        <button class="read-btn" data-id="${post.id}" title="Read more"><i class="fa-solid fa-book-open"></i> Read More</button>
        <button class="like-btn ${post.liked ? "liked" : ""}" data-id="${post.id}" title="Like">
          <i class="fa-solid fa-heart"></i>
        </button>
      </div>
    `;
        card.querySelector(".read-btn").addEventListener("click", () => openModal(post.id));
        card.querySelector(".like-btn").addEventListener("click", (e) => toggleLike(post.id, e.currentTarget));
        postsContainer.appendChild(card);
    });

    pageInfo.innerText = `Page ${currentPage} of ${totalPages}`;
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

/* ---------- SIDEBAR ---------- */
function updateSidebar() {
    const latest = posts.slice(-5).reverse();
    const trending = posts.slice(0, 5);

    // Mini post card template with category tag
    function renderMiniPosts(list, targetId) {
        const container = document.getElementById(targetId);
        container.innerHTML = list.map(p => `
      <div class="mini-post" onclick="openModal(${p.id})">
        <img src="https://picsum.photos/seed/${p.id}/100/100" alt="thumb">
        <div class="mini-post-content">
          <h4>${escapeHtml(p.title.substring(0, 40))}...</h4>
          <small> Category: <strong> ${escapeHtml(p.category)} </strong></small>
        </div>
      </div>
    `).join("");
    }

    renderMiniPosts(latest, "latestPosts");
    renderMiniPosts(trending, "trendingPosts");
}



/* ---------- MODAL ---------- */
function openModal(postId) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    modalTitle.innerText = post.title;
    modalBody.innerText = post.body;
    modalImg.src = `https://picsum.photos/seed/${post.id}/600/600`;
    modalCategory.innerText = post.category;
    modalId.innerText = post.id;
    postModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
}

closeModalBtn.addEventListener("click", closeModal);
window.addEventListener("click", (e) => { if (e.target === postModal) closeModal(); });
function closeModal() { postModal.setAttribute("aria-hidden", "true"); document.body.style.overflow = ""; }

/* ---------- LIKE ---------- */
function toggleLike(postId, btnEl) {
    const post = posts.find(p => p.id === postId);
    if (!post) return;
    post.liked = !post.liked;
    btnEl.classList.toggle("liked", post.liked);
}

/* ---------- SEARCH ---------- */
function performSearch() { currentPage = 1; renderPosts(); }
searchBtn.addEventListener("click", performSearch);
searchInput.addEventListener("keydown", (e) => { if (e.key === "Enter") performSearch(); });

/* ---------- PAGINATION ---------- */
prevBtn.addEventListener("click", () => { if (currentPage > 1) { currentPage--; renderPosts(); } });
nextBtn.addEventListener("click", () => { currentPage++; renderPosts(); });

/* ---------- CATEGORY FILTER ---------- */
categoryFilter.addEventListener("change", (e) => { activeCategory = e.target.value; currentPage = 1; renderPosts(); });
document.querySelectorAll('.sidebar-card ul li[data-cat]').forEach(li => {
    li.addEventListener('click', () => {
        const c = li.getAttribute('data-cat');
        categoryFilter.value = c;
        activeCategory = c;
        currentPage = 1;
        renderPosts();
        window.scrollTo({ top: document.querySelector('.main-layout').offsetTop - 80, behavior: 'smooth' });
    });
});

/* ---------- DARK MODE ---------- */
document.getElementById("darkModeToggle").addEventListener("click", (e) => {
    document.body.classList.toggle("dark");
    const btn = e.currentTarget;
    if (document.body.classList.contains("dark")) {
        btn.innerHTML = '<i class="fa-solid fa-sun"></i> <span class="btn-text">Light Mode</span>';
    } else {
        btn.innerHTML = '<i class="fa-solid fa-moon"></i> <span class="btn-text">Dark Mode</span>';
    }
});

/* ---------- NEWSLETTER ---------- */
function isValidEmail(email) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); }
newsletterEmail.addEventListener("input", () => {
    const email = (newsletterEmail.value || "").trim();
    if (!email) { newsletterMsg.textContent = ""; return; }
    if (isValidEmail(email)) { newsletterMsg.style.color = "lightgreen"; newsletterMsg.textContent = "✔ Valid email"; }
    else { newsletterMsg.style.color = "yellow"; newsletterMsg.textContent = "⚠ Invalid email"; }
});
subscribeBtn.addEventListener("click", () => {
    const email = (newsletterEmail.value || "").trim();
    if (isValidEmail(email)) {
        newsletterMsg.style.color = "lightgreen";
        newsletterMsg.textContent = "✅ Thank you for subscribing!";
        newsletterEmail.value = "";
        setTimeout(() => { newsletterMsg.textContent = ""; }, 3000);
    } else {
        newsletterMsg.style.color = "yellow";
        newsletterMsg.textContent = "⚠ Please enter a valid email address.";
    }
});


/* ---------- UTIL ---------- */
function escapeHtml(str) {
    if (!str) return "";
    return String(str).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#039;");
}

// start
main();
