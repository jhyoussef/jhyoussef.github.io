---
layout: page
title: notes
permalink: /notes/
description: notes and review content hub
nav: true
nav_order: 3
---

<div class="projects">
  {% assign sorted_areas = site.note_areas | sort: "importance" %}

  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_areas %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>