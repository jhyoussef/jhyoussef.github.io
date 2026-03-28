---
layout: page
title: art
permalink: /art/
description: my work
nav: true
nav_order: 5
display_categories: [paleontology, art]
horizontal: false
---

Welcome to my art gallery.  
Select a section below:

<div class="art-grid">
{% for piece in site.art %}
  <a href="{{ piece.url }}" class="art-item">
    <img src="{{ piece.image }}">
    <div class="overlay">
      <div>{{ piece.title }} ({{ piece.year }})</div>
      <p>{{ piece.description }}</p>
    </div>
  </a>
{% endfor %}
</div>