(function () {
  "use strict";

  function filterSections(query, sections) {
    const normalizedQuery = String(query || "").trim().toLocaleLowerCase();
    if (!normalizedQuery) return sections.slice();

    return sections.filter((section) => {
      const searchableText = [
        section.title,
        section.description,
        section.keywords
      ].filter(Boolean).join(" ").toLocaleLowerCase();
      return searchableText.includes(normalizedQuery);
    });
  }

  window.AliPartnerHome = { filterSections };

  if (typeof document === "undefined") return;

  const searchInput = document.querySelector("#section-search");
  const grid = document.querySelector("#discovery-grid");
  const status = document.querySelector("#section-search-status");
  const emptyState = document.querySelector("#section-search-empty");

  if (!searchInput || !grid || !status || !emptyState) {
    document.documentElement.dataset.ready = "true";
    return;
  }

  const cards = Array.from(grid.querySelectorAll("[data-title]"));
  const sections = cards.map((card) => ({
    element: card,
    title: card.dataset.title || "",
    description: card.dataset.description || "",
    keywords: card.dataset.keywords || ""
  }));

  function renderResults() {
    const matches = new Set(filterSections(searchInput.value, sections));
    let visibleCount = 0;

    sections.forEach((section) => {
      const visible = matches.has(section);
      section.element.hidden = !visible;
      section.element.dataset.filterHidden = String(!visible);
      if (visible) visibleCount += 1;
    });

    const query = searchInput.value.trim();
    status.textContent = query
      ? `Showing ${visibleCount} of ${sections.length} sections`
      : `Showing all ${sections.length} sections`;
    emptyState.hidden = visibleCount !== 0;
  }

  searchInput.addEventListener("input", renderResults);
  renderResults();
  document.documentElement.dataset.ready = "true";
})();
