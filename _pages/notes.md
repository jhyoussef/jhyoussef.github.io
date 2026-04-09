---
layout: page
title: notes
permalink: /notes/
description: notes and review content hub
nav: true
nav_order: 3
---

In progress! Here, I want to eventually post my consolidated visualizations and notes from my astrophysics and geosciences education over time, given the overlap in a number of subjects covered.

<div class="projects">
  {% assign sorted_areas = site.note_areas | sort: "importance" %}

  <div class="row row-cols-1 row-cols-md-3">
    {% for project in sorted_areas %}
      {% include projects.liquid %}
    {% endfor %}
  </div>
</div>