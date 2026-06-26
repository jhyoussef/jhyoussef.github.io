document.addEventListener("DOMContentLoaded", () => {
  const items = Array.from(document.querySelectorAll(".art-filter-item"));
  const filterButtons = Array.from(document.querySelectorAll(".art-tag-filter"));

  if (!items.length || !filterButtons.length) {
    return;
  }

  const normalizeTag = (value) =>
    (value || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const readTagFromUrl = () => normalizeTag(new URLSearchParams(window.location.search).get("tag"));

  const updateUrl = (tag) => {
    const url = new URL(window.location.href);

    if (tag) {
      url.searchParams.set("tag", tag);
    } else {
      url.searchParams.delete("tag");
    }

    history.replaceState({}, "", url);
  };

  const applyFilter = (tag, syncUrl) => {
    items.forEach((item) => {
      const tags = (item.dataset.tags || "").split(/\s+/).filter(Boolean);
      item.hidden = tag !== "" && !tags.includes(tag);
    });

    filterButtons.forEach((button) => {
      const buttonTag = button.dataset.artTag || "";
      const isActive = buttonTag === tag;
      button.classList.toggle("is-active", isActive);
      button.setAttribute("aria-current", isActive ? "true" : "false");
    });

    if (syncUrl) {
      updateUrl(tag);
    }
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      applyFilter(button.dataset.artTag || "", true);
    });
  });

  window.addEventListener("popstate", () => {
    applyFilter(readTagFromUrl(), false);
  });

  applyFilter(readTagFromUrl(), false);
});
