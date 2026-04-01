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

<div id="filter-buttons">
  <button type="button" class="active" data-filter="all">All</button>
  {% for tag in unique_tags %}
    <button type="button" data-filter="{{ tag | slugify }}">{{ tag }}</button>
  {% endfor %}
</div>

<div class="masonry-grid">
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
  const buttons = document.querySelectorAll("#filter-buttons button");
  const items = document.querySelectorAll(".art-filter-item");

  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.dataset.filter;

      buttons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      items.forEach((item) => {
        const tags = (item.dataset.tags || "").split(/\s+/).filter(Boolean);
        item.hidden = !(filter === "all" || tags.includes(filter));
      });
    });
  });
});
</script>