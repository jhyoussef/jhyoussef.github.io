---
layout: page
title: notes
permalink: /notes/
description: notes and review content hub
nav: true
nav_order: 3
display_categories: [geosciences]
---

Very much in progress! Here, I want to document and post my consolidated visualizations and notes from my own study, as well as my astrophysics and geosciences education over time -- especially given the overlap in a number of the subjects covered. Cards here are broader subjects or courses - click to see specific topics. 

<div class="projects">
  {% if page.display_categories %}
    {% for category in page.display_categories %}
      <a id="{{ category }}" href=".#{{ category }}">
        <h2 class="category">{{ category }}</h2>
      </a>

      {% assign categorized_areas = site.note_areas | where: "category", category %}
      {% assign sorted_areas = categorized_areas | sort: "importance" %}

      <div class="projects-cards-grid projects-cards-grid--contained">
        {% for project in sorted_areas %}
          {% include projects.liquid %}
        {% endfor %}
      </div>
    {% endfor %}
  {% else %}
    {% assign sorted_areas = site.note_areas | sort: "importance" %}

    <div class="projects-cards-grid projects-cards-grid--contained">
      {% for project in sorted_areas %}
        {% include projects.liquid %}
      {% endfor %}
    </div>
  {% endif %}
</div>
