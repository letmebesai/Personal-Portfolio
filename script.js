const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const copyButton = document.querySelector("[data-copy-email]");
const fallbackImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E";

const renderIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
};

const applyImageFallback = (image) => {
  if (image.dataset.fallbackApplied) {
    return;
  }

  image.dataset.fallbackApplied = "true";
  image.alt = "";
  image.src = fallbackImage;
};

const syncHeader = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 18);
};

syncHeader();
window.addEventListener("scroll", syncHeader, { passive: true });

navToggle?.addEventListener("click", () => {
  document.body.classList.toggle("nav-open");
  const isOpen = document.body.classList.contains("nav-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav?.addEventListener("click", (event) => {
  if (event.target instanceof HTMLAnchorElement) {
    document.body.classList.remove("nav-open");
    navToggle?.setAttribute("aria-expanded", "false");
  }
});

document.querySelectorAll("img").forEach((image) => {
  image.addEventListener("error", () => applyImageFallback(image), { once: true });

  if (image.complete && image.naturalWidth === 0) {
    applyImageFallback(image);
  }
});

copyButton?.addEventListener("click", async () => {
  const email = copyButton.dataset.copyEmail;

  if (!email) {
    return;
  }

  try {
    await navigator.clipboard.writeText(email);
    const original = copyButton.innerHTML;
    copyButton.innerHTML = '<i data-lucide="check"></i>Copied';
    renderIcons();
    window.setTimeout(() => {
      copyButton.innerHTML = original;
      renderIcons();
    }, 1500);
  } catch {
    window.location.href = `mailto:${email}`;
  }
});

window.addEventListener("load", renderIcons);
