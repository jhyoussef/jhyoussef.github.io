---
layout: page
title: notes
permalink: /notes/
description: notes and review content hub
nav: true
nav_order: 4
---

Very much in progress! Here, I want to document and post my consolidated visualizations and notes from my own study, as well as my astrophysics and geosciences education over time -- especially given the overlap in a number of the subjects covered. Cards here are broader subjects or courses - click to see specific topics.

<div class="notes-index" data-notes-index>
  <div class="notes-page-search" role="search">
    <label class="sr-only" for="notes-page-search-input">Search notes</label>
    <input
      id="notes-page-search-input"
      class="notes-page-search-input"
      type="search"
      placeholder="Search notes by topic, tag, or content"
      autocomplete="off"
      data-notes-search-input
    >
  </div>

  <p class="notes-search-empty" data-notes-empty hidden>No matching notes yet.</p>

  <section class="notes-index-section" data-notes-results-section>
    <h2 class="category">areas</h2>

    {% assign sorted_areas = site.note_areas | sort: "importance" %}

    <div class="projects-cards-grid projects-cards-grid--contained">
      {% for area in sorted_areas %}
        {% assign area_notes = site.notes | where: "area", area.slug %}
        {% capture area_search_text %}
          {{ area.title }}
          {{ area.pretty_name }}
          {{ area.description }}
          {{ area.category }}
          {{ area.tags | join: " " }}
          {{ area.content | strip_html }}
          {% for note in area_notes %}
            {{ note.title }}
            {{ note.description }}
            {{ note.module }}
            {{ note.module_title }}
            {{ note.tags | join: " " }}
            {{ note.content | strip_html }}
          {% endfor %}
        {% endcapture %}

        <a
          href="{% if area.redirect %}{{ area.redirect }}{% else %}{{ area.url | relative_url }}{% endif %}"
          data-notes-search-item
          data-notes-search-text="{{ area_search_text | normalize_whitespace | escape }}"
        >
          <div class="card hoverable project-card{% unless area.img %} project-card--no-media{% endunless %}">
            {% if area.img %}
              <div class="card-media">
                {%
                  include figure.liquid
                  loading="eager"
                  path=area.img
                  sizes = "250px"
                  alt=area.title
                  class="card-img-top"
                %}
              </div>
            {% endif %}
            <div class="card-body">
              <h3 class="card-title">{{ area.title }}</h3>
              <p class="card-text">{{ area.description }}</p>
            </div>
          </div>
        </a>
      {% endfor %}
    </div>
  </section>

  <section class="notes-index-section" data-notes-results-section>
    <h2 class="category">topics</h2>

    {% assign sorted_notes = site.notes | sort: "importance" %}

    <div class="projects-cards-grid projects-cards-grid--contained projects-cards-grid--notes">
      {% for note in sorted_notes %}
        {% assign note_area = site.note_areas | where: "slug", note.area | first %}
        {% capture note_search_text %}
          {{ note.title }}
          {{ note.description }}
          {{ note.module }}
          {{ note.module_title }}
          {{ note.tags | join: " " }}
          {{ note.content | strip_html }}
          {{ note_area.title }}
          {{ note_area.pretty_name }}
          {{ note_area.category }}
        {% endcapture %}

        <a
          href="{{ note.url | relative_url }}"
          class="text-decoration-none"
          data-notes-search-item
          data-notes-search-text="{{ note_search_text | normalize_whitespace | escape }}"
        >
          <div class="card h-100 hoverable project-card{% unless note.img %} project-card--no-media{% endunless %}">
            {% if note.img %}
              <div class="card-media">
                <img src="{{ note.img | relative_url }}" class="card-img-top" alt="{{ note.title }}">
              </div>
            {% endif %}

            <div class="card-body">
              <p class="notes-card-kicker">
                {% if note.module_title %}
                  {{ note.module_title }}
                {% elsif note.module %}
                  {{ note.module | replace: "-", " " | capitalize }}
                {% elsif note_area %}
                  {{ note_area.title }}
                {% endif %}
              </p>
              <h3 class="card-title">{{ note.title }}</h3>

              {% if note.description %}
                <p class="card-text">{{ note.description }}</p>
              {% endif %}

              {% if note_area %}
                <p class="card-text notes-card-meta">
                  <small class="text-muted">{{ note_area.title }}</small>
                </p>
              {% endif %}
            </div>
          </div>
        </a>
      {% endfor %}
    </div>
  </section>
</div>
