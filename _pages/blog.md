---
layout: default
permalink: /writings/
title: writings
nav: true
nav_order: 1
---

<div class="post writings-page">
  {% assign all_posts = site.posts | sort: "date" | reverse %}
  {% assign note_posts = all_posts | where_exp: "post", "post.tags contains 'notes'" %}
  {% assign featured_posts = all_posts | where: "featured", true %}
  {% assign writings_per_page = 4 %}
  {% assign notes_initial_count = 4 %}
  {% assign notes_load_increment = 2 %}

  {% assign essay_tags_csv = "" %}
  {% for post in all_posts %}
    {% unless post.tags contains "notes" %}
      {% if post.tags %}
        {% assign post_tags_csv = post.tags | join: "|" %}
        {% if essay_tags_csv == "" %}
          {% assign essay_tags_csv = post_tags_csv %}
        {% else %}
          {% assign essay_tags_csv = essay_tags_csv | append: "|" | append: post_tags_csv %}
        {% endif %}
      {% endif %}
    {% endunless %}
  {% endfor %}
  {% assign essay_tags = essay_tags_csv | split: "|" | sort_natural | uniq %}

  {% assign blog_name_size = site.blog_name | size %}
  {% assign blog_description_size = site.blog_description | size %}

  {% if blog_name_size > 0 or blog_description_size > 0 %}
    <div class="header-bar page-hero">
      <h1 class="page-hero-title">{{ site.blog_name }}</h1>
      <h2 class="page-hero-subtitle">{{ site.blog_description }}</h2>
    </div>
  {% endif %}

  <div
    class="row writings-layout-row"
    data-writings-page-size="{{ writings_per_page }}"
    data-notes-initial-count="{{ notes_initial_count }}"
    data-notes-load-increment="{{ notes_load_increment }}"
  >
    <div class="col-lg-8 col-md-7">
      <section class="writings-main-column">
        {% if featured_posts.size > 0 %}
          <section class="home-section writings-featured-section">
            <h2 class="home-section-title">featured posts</h2>
            <div class="home-projects-grid writings-featured-grid">
              {% for post in featured_posts %}
                {% unless post.tags contains "notes" %}
                  {% capture post_href %}
                    {% if post.redirect == blank %}
                      {{ post.url | relative_url }}
                    {% elsif post.redirect contains '://' %}
                      {{ post.redirect }}
                    {% else %}
                      {{ post.redirect | relative_url }}
                    {% endif %}
                  {% endcapture %}

                  {% if post.external_source == blank %}
                    {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
                  {% else %}
                    {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
                  {% endif %}

                  <article class="card h-100 hoverable project-card writings-featured-card{% unless post.thumbnail %} project-card--no-media{% endunless %}">
                    {% if post.thumbnail %}
                      <a
                        href="{{ post_href | strip }}"
                        class="card-media"
                        {% if post.redirect contains '://' %}target="_blank" rel="noopener noreferrer"{% endif %}
                      >
                        <img src="{{ post.thumbnail | relative_url }}" class="card-img-top" alt="{{ post.title }}">
                      </a>
                    {% endif %}
                    <div class="card-body">
                      <div class="writings-featured-pin">
                        <i class="fa-solid fa-thumbtack fa-xs"></i>
                      </div>
                      <h3 class="card-title">
                        <a
                          href="{{ post_href | strip }}"
                          {% if post.redirect contains '://' %}target="_blank" rel="noopener noreferrer"{% endif %}
                        >
                          {{ post.title }}
                        </a>
                      </h3>
                      {% if post.description %}
                        <p class="card-text">{{ post.description }}</p>
                      {% endif %}
                      <p class="post-meta writings-meta-row mb-0">
                        <span>{{ read_time }} min read</span>
                        <span>{{ post.date | date: '%B %d, %Y' }}</span>
                        {% if post.tags and post.tags.size > 0 %}
                          <span>{{ post.tags | join: " | " }}</span>
                        {% endif %}
                      </p>
                    </div>
                  </article>
                {% endunless %}
              {% endfor %}
            </div>
          </section>
        {% endif %}

        <hr class="writings-divider">

        <section class="home-section writings-feed-section">
          <h2 class="home-section-title">writings</h2>

          {% if essay_tags.size > 0 %}
            <div class="tag-category-list writings-tag-list">
              <ul class="p-0 m-0">
                {% for tag in essay_tags %}
                  {% if tag != "" %}
                    <li>
                      <i class="fa-solid fa-hashtag fa-sm"></i>
                      <button
                        type="button"
                        class="writings-tag-filter"
                        data-tag-filter="{{ tag | escape }}"
                        aria-pressed="false"
                      >
                        {{ tag }}
                      </button>
                    </li>
                    {% unless forloop.last %}
                      <p>&bull;</p>
                    {% endunless %}
                  {% endif %}
                {% endfor %}
              </ul>
            </div>
          {% endif %}

          <div class="writing-posts-grid" data-writings-list>
            {% assign writing_index = 0 %}
            {% for post in all_posts %}
              {% unless post.tags contains "notes" %}
                {% assign writing_index = writing_index | plus: 1 %}
                {% if post.external_source == blank %}
                  {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
                {% else %}
                  {% assign read_time = post.feed_content | strip_html | number_of_words | divided_by: 180 | plus: 1 %}
                {% endif %}

                {% capture post_href %}
                  {% if post.redirect == blank %}
                    {{ post.url | relative_url }}
                  {% elsif post.redirect contains '://' %}
                    {{ post.redirect }}
                  {% else %}
                    {{ post.redirect | relative_url }}
                  {% endif %}
                {% endcapture %}

                <article
                  class="card mb-3 hoverable home-writing-card writings-feed-card{% unless post.thumbnail %} home-writing-card--no-thumb{% endunless %}"
                  data-writings-item
                  data-writings-index="{{ writing_index }}"
                  data-writings-tags="{{ post.tags | join: '|' | escape }}"
                >
                  {% if post.thumbnail %}
                    <a
                      class="home-writing-thumb writings-feed-thumb"
                      href="{{ post_href | strip }}"
                      {% if post.redirect contains '://' %}target="_blank" rel="noopener noreferrer"{% endif %}
                    >
                      <img src="{{ post.thumbnail | relative_url }}" alt="{{ post.title }}">
                    </a>
                  {% endif %}
                  <div class="card-body home-writing-body position-relative">
                    <p class="post-meta writings-meta-row mb-2">
                      <span>{{ read_time }} min read</span>
                      <span>{{ post.date | date: '%B %d, %Y' }}</span>
                      {% if post.tags and post.tags.size > 0 %}
                        <span>{{ post.tags | join: " | " }}</span>
                      {% endif %}
                    </p>
                    <h3 class="card-title mb-1">
                      <a
                        class="stretched-link"
                        href="{{ post_href | strip }}"
                        {% if post.redirect contains '://' %}target="_blank" rel="noopener noreferrer"{% endif %}
                      >
                        {{ post.title }}
                      </a>
                    </h3>
                    {% if post.description %}
                      <p class="card-text mb-0">{{ post.description }}</p>
                    {% endif %}
                  </div>
                </article>
              {% endunless %}
            {% endfor %}
          </div>

          <nav class="writings-pagination" aria-label="Writings pagination" data-writings-pagination hidden>
            <button type="button" class="writings-pagination-button" data-writings-prev>Previous</button>
            <div class="writings-pagination-pages" data-writings-pages></div>
            <button type="button" class="writings-pagination-button" data-writings-next>Next</button>
          </nav>
        </section>
      </section>
    </div>

    <div class="col-lg-4 col-md-5">
      <aside class="writings-notes-column">
        <section class="home-section writings-notes-section">
          <h2 class="home-section-title">notes</h2>

          {% if note_posts.size > 0 %}
            <div class="writings-notes-scroll" data-notes-list>
              {% assign note_index = 0 %}
              {% for post in note_posts %}
                {% assign note_index = note_index | plus: 1 %}
                {% assign note_word_count = post.content | strip_html | number_of_words %}
                {% assign note_preview = post.content | strip_html | truncatewords: 100 %}

                <article
                  class="card mb-3 hoverable writings-note-card{% if note_word_count > 100 %} writings-note-card--faded{% endif %}"
                  data-note-item
                  data-note-index="{{ note_index }}"
                >
                  <div class="card-body">
                    <p class="post-meta writings-meta-row mb-2">
                      <span>{{ post.date | date: '%B %d, %Y' }}</span>
                      {% if post.tags and post.tags.size > 0 %}
                        <span>{{ post.tags | join: " | " }}</span>
                      {% endif %}
                    </p>
                    <h3 class="card-title writings-note-title">
                      <a class="stretched-link" href="{{ post.url | relative_url }}">{{ post.title }}</a>
                    </h3>
                    <div class="writings-note-content">
                      <p class="writings-note-preview">{{ note_preview }}</p>
                    </div>
                  </div>
                </article>
              {% endfor %}
            </div>
            {% if note_posts.size > notes_initial_count %}
              <div class="writings-notes-actions">
                <button type="button" class="writings-load-more-button" data-notes-load-more>Load more notes</button>
              </div>
            {% endif %}
          {% else %}
          <p class="writings-empty-state">No note posts yet.</p>
          {% endif %}
        </section>
      </aside>
    </div>
  </div>
</div>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const writingsLayout = document.querySelector(".writings-layout-row");
    if (!writingsLayout) {
      return;
    }

    const writingsItems = Array.from(document.querySelectorAll("[data-writings-item]"));
    const pagination = document.querySelector("[data-writings-pagination]");
    const pageButtons = document.querySelector("[data-writings-pages]");
    const prevButton = document.querySelector("[data-writings-prev]");
    const nextButton = document.querySelector("[data-writings-next]");
    const tagFilterButtons = Array.from(document.querySelectorAll("[data-tag-filter]"));
    const writingsPageSize = parseInt(writingsLayout.dataset.writingsPageSize || "4", 10);
    let currentPage = 1;
    let activeTag = "";

    const getFilteredWritings = () => {
      if (!activeTag) {
        return writingsItems;
      }

      return writingsItems.filter((item) => {
        const tagList = (item.dataset.writingsTags || "")
          .split("|")
          .map((tag) => tag.trim())
          .filter(Boolean);
        return tagList.includes(activeTag);
      });
    };

    const renderWritingsPage = (page) => {
      const filteredItems = getFilteredWritings();
      const totalPages = Math.max(1, Math.ceil(filteredItems.length / writingsPageSize));
      currentPage = Math.min(Math.max(page, 1), totalPages);
      const startIndex = (currentPage - 1) * writingsPageSize;
      const endIndex = startIndex + writingsPageSize;

      writingsItems.forEach((item) => {
        item.hidden = true;
      });

      filteredItems.forEach((item, index) => {
        item.hidden = index < startIndex || index >= endIndex;
      });

      if (pageButtons) {
        pageButtons.innerHTML = "";

        for (let pageNumber = 1; pageNumber <= totalPages; pageNumber += 1) {
          const button = document.createElement("button");
          button.type = "button";
          button.className = "writings-pagination-page";
          button.textContent = String(pageNumber);
          button.disabled = pageNumber === currentPage;

          if (pageNumber === currentPage) {
            button.classList.add("is-active");
          }

          button.addEventListener("click", () => renderWritingsPage(pageNumber));
          pageButtons.appendChild(button);
        }
      }

      if (pagination) {
        pagination.hidden = filteredItems.length <= writingsPageSize;
      }

      if (prevButton) {
        prevButton.disabled = currentPage === 1;
      }

      if (nextButton) {
        nextButton.disabled = currentPage === totalPages;
      }
    };

    prevButton?.addEventListener("click", () => renderWritingsPage(currentPage - 1));
    nextButton?.addEventListener("click", () => renderWritingsPage(currentPage + 1));

    tagFilterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const selectedTag = button.dataset.tagFilter || "";
        activeTag = activeTag === selectedTag ? "" : selectedTag;

        tagFilterButtons.forEach((tagButton) => {
          const isActive = (tagButton.dataset.tagFilter || "") === activeTag && activeTag !== "";
          tagButton.setAttribute("aria-pressed", isActive ? "true" : "false");
          tagButton.classList.toggle("is-active", isActive);
        });

        renderWritingsPage(1);
      });
    });

    renderWritingsPage(1);

    const notesItems = Array.from(document.querySelectorAll("[data-note-item]"));
    const notesLoadMoreButton = document.querySelector("[data-notes-load-more]");
    const notesInitialCount = parseInt(writingsLayout.dataset.notesInitialCount || "4", 10);
    const notesLoadIncrement = parseInt(writingsLayout.dataset.notesLoadIncrement || "3", 10);
    let visibleNotesCount = notesInitialCount;

    const renderNotes = () => {
      notesItems.forEach((item, index) => {
        item.hidden = index >= visibleNotesCount;
      });

      if (notesLoadMoreButton) {
        notesLoadMoreButton.hidden = visibleNotesCount >= notesItems.length;
      }
    };

    notesLoadMoreButton?.addEventListener("click", () => {
      visibleNotesCount = Math.min(visibleNotesCount + notesLoadIncrement, notesItems.length);
      renderNotes();
    });

    renderNotes();
  });
</script>
