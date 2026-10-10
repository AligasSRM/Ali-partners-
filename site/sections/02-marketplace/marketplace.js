(function () {
  "use strict";

  const demoListings = [
    {
      id: "demo-digital-service",
      title: "Website design service",
      category: "digital-services",
      categoryLabel: "Digital services",
      description: "Illustrative listing for a business website design service.",
      icon: "✦",
      keywords: "web design website landing page development"
    },
    {
      id: "demo-marketing-service",
      title: "Marketing support",
      category: "marketing",
      categoryLabel: "Marketing",
      description: "Illustrative listing for campaign planning and marketing support.",
      icon: "↗",
      keywords: "marketing campaigns content promotion growth"
    },
    {
      id: "demo-business-software",
      title: "Business workflow software",
      category: "business-software",
      categoryLabel: "Business software",
      description: "Illustrative listing for tools that organise everyday business work.",
      icon: "▦",
      keywords: "software workflow productivity operations"
    }
  ];

  function filterListings(query, category, listings) {
    const normalizedQuery = String(query || "").trim().toLocaleLowerCase();
    const selectedCategory = String(category || "all");
    return listings.filter((listing) => {
      const categoryMatches = selectedCategory === "all" || listing.category === selectedCategory;
      const searchable = [listing.title, listing.categoryLabel, listing.description, listing.keywords]
        .filter(Boolean).join(" ").toLocaleLowerCase();
      return categoryMatches && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }

  window.AliPartnerMarketplace = { demoListings, filterListings };
  if (typeof document === "undefined") return;

  const searchInput = document.querySelector("#listing-search");
  const categoryFilter = document.querySelector("#category-filter");
  const grid = document.querySelector("#listing-grid");
  const status = document.querySelector("#listing-status");
  const emptyState = document.querySelector("#listing-empty");

  if (!searchInput || !categoryFilter || !grid || !status || !emptyState) return;

  function render() {
    const matches = filterListings(searchInput.value, categoryFilter.value, demoListings);
    grid.replaceChildren();

    matches.forEach((listing) => {
      const card = document.createElement("article");
      card.className = "listing-card";

      const icon = document.createElement("div");
      icon.className = "listing-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = listing.icon;

      const category = document.createElement("p");
      category.className = "listing-category";
      category.textContent = listing.categoryLabel;

      const title = document.createElement("h3");
      title.textContent = listing.title;

      const description = document.createElement("p");
      description.textContent = listing.description;

      const disclaimer = document.createElement("p");
      disclaimer.className = "listing-disclaimer";
      disclaimer.textContent = "Demo listing · no real provider or offer";

      card.append(icon, category, title, description, disclaimer);
      grid.append(card);
    });

    status.textContent = `Showing ${matches.length} of ${demoListings.length} demo listings`;
    emptyState.hidden = matches.length !== 0;
  }

  searchInput.addEventListener("input", render);
  categoryFilter.addEventListener("change", render);
  render();
})();