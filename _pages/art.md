---
layout: page
title: art
permalink: /art/
nav: true
nav_order: 5
---

<style>
.masonry-grid {
  column-count: 3;
  column-gap: 1rem;
}

@media (max-width: 1000px) {
  .masonry-grid { column-count: 2; }
}

@media (max-width: 600px) {
  .masonry-grid { column-count: 1; }
}

.masonry-item {
  display: inline-block;
  width: 100%;
  margin-bottom: 1rem;
}

.img-wrapper img {
  width: 100%;
  height: auto;
  display: block;
}
</style>

<div class="masonry-grid">
  {% for piece in site.art %}
    <div class="masonry-item">
      <div class="img-wrapper">
        <img src="{{ piece.image | relative_url }}">
        <p>{{ piece.title }}</p>
      </div>
    </div>
  {% endfor %}
</div>