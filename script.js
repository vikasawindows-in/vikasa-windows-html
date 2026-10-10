// Add Vikasa Windows' WhatsApp number here in international format, digits only.
// Example: 919876543210. Leave empty to open WhatsApp's recipient picker.
const WHATSAPP_NUMBER = "";

const whatsappUrl = (message) => {
  const base = WHATSAPP_NUMBER
    ? `https://wa.me/${WHATSAPP_NUMBER}`
    : "https://wa.me/";
  return `${base}?text=${encodeURIComponent(message)}`;
};

document.querySelectorAll('a[href^="https://wa.me/"]').forEach((link) => {
  const message = new URL(link.href).searchParams.get("text") || "Hello Vikasa Windows, I'd like to enquire.";
  link.href = whatsappUrl(message);
});

const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation menu");
  navigation.classList.remove("open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navigation.classList.toggle("open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const filterButtons = document.querySelectorAll(".filter-button");
const productCards = document.querySelectorAll(".product-card");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      const isActive = filterButton === button;
      filterButton.classList.toggle("active", isActive);
      filterButton.setAttribute("aria-pressed", String(isActive));
    });

    productCards.forEach((card) => {
      card.hidden = selectedFilter !== "all" && card.dataset.category !== selectedFilter;
    });
  });
});

document.querySelectorAll(".product-enquire").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const productName = link.closest(".product-card").querySelector("h3").textContent;
    const message = `Hello Vikasa Windows, I'm interested in ${productName}. Please share more details.`;
    window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();

const form = document.querySelector("#enquiry-form");
form.addEventListener("submit", (event) => {
  event.preventDefault();
  if (!form.reportValidity()) return;

  const fields = new FormData(form);
  const message = [
    "Hello Vikasa Windows, I'd like to enquire about a project.",
    "",
    `Name: ${fields.get("name")}`,
    `Phone: ${fields.get("phone")}`,
    `Interested in: ${fields.get("interest")}`,
    fields.get("message") ? `Project details: ${fields.get("message")}` : "",
  ].filter(Boolean).join("\n");

  window.open(whatsappUrl(message), "_blank", "noopener,noreferrer");
});

const revealTargets = document.querySelectorAll(
  ".about-visual, .about-copy, .product-card, .benefit, .project, .testimonial-inner, .areas-inner, .enquiry-form",
);

if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  revealTargets.forEach((element) => element.classList.add("reveal"));
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealTargets.forEach((element) => observer.observe(element));
}
