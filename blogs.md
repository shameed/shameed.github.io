---
layout: default
title: Blogs
permalink: /blogs/
---

<div class="container-wide">
    <section id="about" class="hero-section" style="padding:20px 0">
        <div class="intro">
            <h2 class="hero-name">Technical Blogs</h2>
            <div class="hero-title">Architecture insights, cloud patterns, and real-world AI implementations.</div>
        </div>
    </section>
    <div class="blog-index-layout">

        <aside>
            <div class="glass-panel sidebar-sticky">
                <input type="text" id="blog-search" placeholder="Search blogs..." style="width: 100%; padding: 10px; margin-bottom: 20px; border-radius: 8px; border: 1px solid var(--glass-border); background: var(--glass-bg); color: var(--text-primary);">
                
                <h4 style="margin-bottom: 16px; font-weight: 600">Filter Topic</h4>
                <ul class="category-list">
                    <li><a href="#" class="category-filter active" data-category="All Posts">All Posts</a></li>
                    {% for category in site.categories %}
                    <li><a href="#" class="category-filter" data-category="{{ category[0] }}">{{ category[0] }}</a></li>
                    {% endfor %}
                </ul>
            </div>
        </aside>
        <main class="post-list" id="post-list-container">
            {% for post in site.posts %}
            <div class="glass-panel post-card glass-card-interactive post-item" data-category="{{ post.categories | first }}" data-title="{{ post.title }}">
                <span class="project-meta">{{ post.categories | first }}</span>
                <h2>
                    <a href="{{ post.url | relative_url }}"> {{ post.title }}</a>
                </h2>
                <div class="post-meta-row">
                    <span>{{ post.date | date: "%B %d, %Y" }}</span> · <span>{{ post.content | number_of_words | divided_by: 200 | plus: 1 }} min read</span>
                </div>
                <p class="text-muted">
                   {{ post.excerpt | strip_html | truncate: 120 }}
                </p>
                <a href="{{ post.url | relative_url }}" class="read-more">Read Full Post →</a>
            </div>  
            {% endfor %}
        </main>
        <script src="{{ '/assets/js/blog-features.js' | relative_url }}"></script>

    </div>
</div>


<!-- {% for category in site.categories %}
<section style="margin-bottom: 3rem;">
  <h2 style="color: var(--accent); border-bottom: 1px solid var(--border); padding-bottom: 0.5rem; margin-bottom: 1.5rem;">
    {{ category[0] | capitalize }}
  </h2>
  
  <div class="blog-grid">
    {% for post in category[1] %}
    <a href="{{ post.url | relative_url }}" class="card post-card">
      <h3>{{ post.title }}</h3>
      <p>{{ post.excerpt | strip_html | truncate: 120 }}</p>
      <div class="post-meta">
        <span>{{ post.date | date: "%B %d, %Y" }}</span>
        <span>·</span>
        <span>{{ post.content | number_of_words | divided_by: 200 | plus: 1 }} min read</span>
      </div>
    </a>
    {% endfor %}
  </div>
</section>
{% endfor %} -->
