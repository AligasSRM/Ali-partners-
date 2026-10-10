(function () {
  "use strict";
  const categories = [
    { id: "ai-automation", title: "AI & Automation", group: "digital", groupLabel: "Digital & technology", description: "AI assistants, workflow automation, and practical business integrations.", keywords: "artificial intelligence machine learning agents workflows", icon: "✦" },
    { id: "websites-commerce", title: "Websites & E-commerce", group: "digital", groupLabel: "Digital & technology", description: "Business websites, online stores, landing pages, and web development.", keywords: "website web design ecommerce store landing pages", icon: "⌘" },
    { id: "business-software", title: "Business Software", group: "operations", groupLabel: "Business operations", description: "Tools for organising daily work, projects, records, and team processes.", keywords: "software saas productivity project management", icon: "▦" },
    { id: "email-crm", title: "Email & CRM", group: "operations", groupLabel: "Business operations", description: "Customer records, email communication, and relationship management.", keywords: "customer contacts campaigns newsletter email", icon: "✉" },
    { id: "marketing-growth", title: "Marketing & Growth", group: "growth", groupLabel: "Marketing & growth", description: "Campaign strategy, audience growth, promotion, and performance marketing.", keywords: "advertising seo social media growth campaigns", icon: "↗" },
    { id: "design-content", title: "Design & Content", group: "growth", groupLabel: "Marketing & growth", description: "Brand identity, visual design, copywriting, and content production.", keywords: "branding graphics video writing creative", icon: "◈" },
    { id: "education-training", title: "Education & Training", group: "growth", groupLabel: "Marketing & growth", description: "Business learning, professional training, courses, and tutorials.", keywords: "academy learning courses training skills", icon: "▤" },
    { id: "productivity-operations", title: "Productivity & Operations", group: "operations", groupLabel: "Business operations", description: "Planning, scheduling, process improvement, and everyday operations.", keywords: "operations calendar booking task workflow", icon: "◷" }
  ];
  function filterCategories(query, group, source) {
    const normalizedQuery = String(query || "").trim().toLocaleLowerCase();
    const selectedGroup = String(group || "all");
    return source.filter((category) => {
      const groupMatches = selectedGroup === "all" || category.group === selectedGroup;
      const searchable = [category.title, category.groupLabel, category.description, category.keywords].filter(Boolean).join(" ").toLocaleLowerCase();
      return groupMatches && (!normalizedQuery || searchable.includes(normalizedQuery));
    });
  }
  window.AliPartnerCategories = { categories, filterCategories };
  if (typeof document === "undefined") return;
  const search = document.querySelector("#category-search");
  const group = document.querySelector("#category-group");
  const grid = document.querySelector("#category-grid");
  const status = document.querySelector("#category-status");
  const empty = document.querySelector("#category-empty");
  if (!search || !group || !grid || !status || !empty) return;
  function render() {
    const matches = filterCategories(search.value, group.value, categories);
    grid.replaceChildren();
    matches.forEach((category) => {
      const card = document.createElement("article");
      card.className = "category-card";
      const icon = document.createElement("span");
      icon.className = "category-icon";
      icon.setAttribute("aria-hidden", "true");
      icon.textContent = category.icon;
      const groupLabel = document.createElement("p");
      groupLabel.className = "category-group-label";
      groupLabel.textContent = category.groupLabel;
      const title = document.createElement("h3");
      title.textContent = category.title;
      const description = document.createElement("p");
      description.textContent = category.description;
      const link = document.createElement("a");
      link.className = "category-link";
      link.href = "../02-marketplace/index.html";
      link.textContent = "Explore demo marketplace →";
      card.append(icon, groupLabel, title, description, link);
      grid.append(card);
    });
    status.textContent = `Showing ${matches.length} of ${categories.length} category groups`;
    empty.hidden = matches.length !== 0;
  }
  search.addEventListener("input", render);
  group.addEventListener("change", render);
  render();
})();