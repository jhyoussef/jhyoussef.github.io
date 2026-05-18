---
layout: page
title: research
permalink: /research/
description: A growing collection of projects & descriptions of my work
nav: true
nav_order: 3
display_categories: [geosciences, art]
horizontal: true
---

<!-- pages/projects.md -->
<div class="research-page">
  <div class="row research-layout-row">
    <div class="col-lg-3 col-md-4">
      <aside class="research-sidebar">
        <section class="home-section research-sidebar-section">
          <h2 class="home-section-title">talks</h2>

          {% if site.data.talks and site.data.talks.size > 0 %}
            <ol class="research-mini-list">
              {% assign sorted_talks = site.data.talks | sort: "date" | reverse %}
              {% for talk in sorted_talks %}
                <li>
                  {% if talk.url %}
                    <a href="{{ talk.url }}">{{ talk.title }}</a>
                  {% else %}
                    <span>{{ talk.title }}</span>
                  {% endif %}
                  {% if talk.venue %}
                    <span class="research-mini-meta">{{ talk.venue }}</span>
                  {% endif %}
                  {% if talk.date %}
                    <span class="research-mini-meta">{{ talk.date | date: "%Y" }}</span>
                  {% endif %}
                </li>
              {% endfor %}
            </ol>
          {% else %}
            <p class="research-empty-state">Talks will live here.</p>
          {% endif %}
        </section>

        <section class="home-section research-sidebar-section">
          <h2 class="home-section-title">publications</h2>
          <p class="research-sidebar-copy">
            The full generated bibliography lives on the
            <a href="{{ '/publications/' | relative_url }}">publications page</a>.
          </p>
          <div class="research-sidebar-actions">
            <a class="research-sidebar-link" href="{{ '/publications/' | relative_url }}">View publications</a>
          </div>
        </section>
      </aside>
    </div>

    <div class="col-lg-9 col-md-8">
      <section class="home-section research-main-section">
        <h2 class="home-section-title">projects</h2>
        <div class="research-intro">
          <p>
            Here, I display my current, longer-term projects in science- and art-related categories. These may be specific commissions, paper research, literature review, or anything else that more parsimoniously falls into the idea of a project. Pun intended.
          </p>
        </div>

        <div class="projects">
          {% if site.enable_project_categories and page.display_categories %}
            <!-- Display categorized projects -->
            {% for category in page.display_categories %}
              <a id="{{ category }}" href=".#{{ category }}">
                <h2 class="category">{{ category }}</h2>
              </a>
              {% assign categorized_projects = site.projects | where: "category", category %}
              {% assign sorted_projects = categorized_projects | sort: "importance" %}
              <!-- Generate cards for each project -->
              <div class="projects-cards-grid projects-cards-grid--fill">
                {% for project in sorted_projects %}
                  {% include projects.liquid %}
                {% endfor %}
              </div>
            {% endfor %}
          {% else %}
            <!-- Display projects without categories -->
            {% assign sorted_projects = site.projects | sort: "importance" %}

            <!-- Generate cards for each project -->
            <div class="projects-cards-grid projects-cards-grid--fill">
              {% for project in sorted_projects %}
                {% include projects.liquid %}
              {% endfor %}
            </div>
          {% endif %}
        </div>
      </section>
    </div>
  </div>
</div>
