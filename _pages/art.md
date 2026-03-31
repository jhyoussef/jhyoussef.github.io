---
layout: page
title: art
permalink: /art/
description: selected work and process
nav: true
nav_order: 5
---

{% assign sorted_art = site.art | sort: "importance" %}

<div class="masonry-grid">
  {% for piece in site.art %}
    <div class="masonry-item">
      <a href="{{ piece.url | relative_url }}" class="art-card-link">
        <div class="img-wrapper">
          <img src="{{ piece.image | relative_url }}" alt="{{ piece.title }}">
          <div class="overlay">
            <div class="overlay-text">
              <h3>{{ piece.title }}</h3>
              <p class="art-meta">{{ piece.year }}</p>
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