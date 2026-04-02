---
layout: page
title: art
permalink: /art/
description: selected work and process
nav: true
nav_order: 5
---

<style>
  #art-gallery.masonry-grid {
    column-count: 3 !important;
    column-gap: 1rem !important;
  }

  @media (max-width: 1000px) {
    #art-gallery.masonry-grid {
      column-count: 2 !important;
    }
  }

  @media (max-width: 600px) {
    #art-gallery.masonry-grid {
      column-count: 1 !important;
    }
  }

  #art-gallery .masonry-item {
    display: inline-block !important;
    width: 100% !important;
    margin: 0 0 1rem 0 !important;
    vertical-align: top !important;
    break-inside: avoid !important;
    -webkit-column-break-inside: avoid !important;
    page-break-inside: avoid !important;
  }

  #art-gallery .masonry-item[hidden] {
    display: none !important;
  }

  #art-gallery .art-card-link {
    display: block;
    width: 100%;
    text-decoration: none;
    color: inherit;
  }

  #art-gallery .img-wrapper {
    position: relative;
    overflow: hidden;
    border-radius: 10px;
  }

  #art-gallery .img-wrapper img {
    display: block;
    width: 100%;
    height: auto;
  }

  #art-gallery .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.58);
    color: white;
    opacity: 0;
    transition: opacity 0.2s ease;
    display: flex;
    align-items: end;
  }

  #art-gallery .img-wrapper:hover .overlay {
    opacity: 1;
  }

  #art-gallery .overlay-text {
    width: 100%;
    padding: 0.9rem;
    box-sizing: border-box;
  }

  #art-gallery .overlay-text h3 {
    margin: 0 0 0.25rem 0;
    font-size: 1rem;
    line-height: 1.2;
  }

  #art-gallery .art-meta {
    margin: 0;
    font-size: 0.88rem;
    line-height: 1.25;
  }

  #art-gallery .art-description {
    margin-top: 0.4rem;
    font-size: 0.88rem;
    line-height: 1.3;
  }

  .art-tags {
    margin-bottom: 1.5rem;
    font-size: 1rem;
    line-height: 1.6;
  }

  .art-tag-link {
    text-decoration: none;
  }

  .art-tag-link.active {
    font-weight: 600;
    text-decoration: underline;
  }

  .art-tag-separator {
    margin: 0 0.45rem;
    opacity: 0.7;
  }
</style>

{% assign sorted_art = site.art | sort: "importance" %}
{% assign all_tags = "" | split: "" %}

{% for piece in sorted_art %}
  {% if piece.tags %}
    {% assign all_tags = all_tags | concat: piece.tags %}
  {% endif %}
{% endfor %}

{% assign unique_tags = all_tags | uniq | sort %}
{% assign art_base_url = '/art/' | relative_url %}

<div class="art-tags">
  <a href="{{ art_base_url }}" class="art-tag-link">all</a>
  {% for tag in unique_tags %}
    <span class="art-tag-separator">·</span>
    <a href="{{ art_base_url }}?tag={{ tag | slugify }}" class="art-tag-link"># {{ tag }}</a>
  {% endfor %}
</div>

<div class="masonry-grid" id="art-gallery">
  {% for piece in sorted_art %}
    {% capture piece_tags %}{% if piece.tags %}{% for tag in piece.tags %}{{ tag | slugify }} {% endfor %}{% endif %}{% endcapture %}

    <div class="masonry-item art-filter-item" data-tags="{{ piece_tags | strip }}">
      <a href="{{ piece.url | relative_url }}" class="art-card-link">
        <div class="img-wrapper">
          <img src="{{ piece.image | relative_url }}" alt="{{ piece.title }}">
          <div class="overlay">
            <div class="overlay-text">
              <h3>{{ piece.title }}</h3>

              {% if piece.year %}
                <p class="art-meta">{{ piece.year }}</p>
              {% endif %}

              {% if piece.medium %}
                <p class="art-meta">{{ piece.medium }}</p>
              {% endif %}

              {% if piece.description %}
                <p class="art-description">{{ piece.description }}</p>
              {% endif %}
            </div>
          </div>
        </div>
      </a>
    </div>
  {% endfor %}
</div>

<script>
document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const activeTag = params.get("tag");
  const items = document.querySelectorAll(".art-filter-item");
  const links = document.querySelectorAll(".art-tags .art-tag-link");

  if (activeTag) {
    items.forEach((item) => {
      const tags = (item.dataset.tags || "").split(/\s+/).filter(Boolean);
      item.hidden = !tags.includes(activeTag);
    });
  }

  links.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const url = new URL(href, window.location.origin);
    const linkTag = url.searchParams.get("tag");

    if ((!activeTag && !linkTag) || (activeTag && linkTag === activeTag)) {
      link.classList.add("active");
    }
  });
});
</script>