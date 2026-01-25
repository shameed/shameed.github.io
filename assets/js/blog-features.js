
document.addEventListener('DOMContentLoaded', () => {

    // --- Blog Filtering & Search Logic ---
    const categoryLinks = document.querySelectorAll('.category-filter');
    const posts = document.querySelectorAll('.post-item');
    const searchInput = document.getElementById('blog-search');
    let currentCategory = 'All Posts';

    function filterPosts() {
        const query = searchInput ? searchInput.value.toLowerCase() : '';
        
        posts.forEach(post => {
            const postCategory = post.getAttribute('data-category');
            const postTitle = post.getAttribute('data-title').toLowerCase();
            
            const matchesCategory = (currentCategory === 'All Posts' || postCategory === currentCategory);
            const matchesSearch = postTitle.includes(query);

            if (matchesCategory && matchesSearch) {
                post.style.display = 'block';
            } else {
                post.style.display = 'none';
            }
        });
    }

    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                // Update Active State
                categoryLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                currentCategory = link.getAttribute('data-category');
                filterPosts();
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterPosts);
    }
});
