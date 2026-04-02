---
layout: page
title: art
permalink: /art/
description: selected work and process
nav: true
nav_order: 5
---

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
  const links = document.querySelectorAll(".art-tag-link");

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