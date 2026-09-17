(() => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#mobile-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.hasAttribute("hidden") === false;
      nav.toggleAttribute("hidden", open);
      toggle.setAttribute("aria-expanded", open ? "false" : "true");
    });
    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const form = document.querySelector(".contact-modal-panel");
  if (!form) return;
  const button = form.querySelector("button[type=submit]");
  const error = form.querySelector(".form-error");
  const box = document.querySelector("#contact-toggle");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!button || button.disabled) return;
    const data = new FormData(form);
    button.disabled = true;
    button.textContent = button.dataset.sending || "…";
    if (error) error.hidden = true;
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          whatsapp: data.get("whatsapp"),
          email: data.get("email"),
          company: data.get("company"),
          message: data.get("message"),
          hp: data.get("hp"),
        }),
      });
      if (!res.ok) throw new Error("send");
      button.textContent = button.dataset.sent || "OK";
      window.setTimeout(() => {
        form.reset();
        if (box) box.checked = false;
        button.disabled = false;
        button.textContent = button.dataset.idle || "Send";
      }, 1600);
    } catch {
      if (error) error.hidden = false;
      button.disabled = false;
      button.textContent = button.dataset.idle || "Send";
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && box && box.checked) box.checked = false;
  });
})();
