const header = document.querySelector("[data-header]");
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-nav]");
const copyButton = document.querySelector("[data-copy-email]");

const renderIcons = () => {
  if (window.lucide) {
    window.lucide.createIcons();
  }
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
