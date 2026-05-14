(() => {
  const grid = document.getElementById("events-grid");
  if (!grid) return;

  const dialogOverlay = document.getElementById("event-dialog-overlay");
  const dialog = document.getElementById("event-dialog");
  const dialogTitle = document.getElementById("event-dialog-title");
  const dialogCategory = document.getElementById("event-dialog-category");
  const dialogDay = document.getElementById("event-dialog-day");
  const dialogDate = document.getElementById("event-dialog-date");
  const dialogTime = document.getElementById("event-dialog-time");
  const dialogLocation = document.getElementById("event-dialog-location");
  const dialogRegister = document.getElementById("event-dialog-register");
  const dialogClose = document.getElementById("event-dialog-close");

  let eventsData = [];
  let currentDay = "all";
  let currentCategory = "all";
  let selectedEventId = null;
  let lastFocusedEl = null;

  const pastelByCategory = {
    Dance: "bg-[#FFE8E8]",
    Music: "bg-[#E8F1FF]",
    Gaming: "bg-[#FFF5E6]",
    Drama: "bg-[#F3E8FF]",
    Technical: "bg-[#E9FFE8]",
  };

  const pastelFallback = ["bg-[#FFE8E8]", "bg-[#E8F1FF]", "bg-[#E9FFE8]", "bg-[#FFF5E6]", "bg-[#F3E8FF]"];

  const dayTheme = {
    all: {
      inactive: ["border-white/30", "bg-white/10", "text-white", "hover:bg-black", "hover:text-white"],
      active: ["border-white", "bg-white", "text-black", "hover:bg-white"],
    },
    1: {
      inactive: ["border-[#ff9ac6]", "text-[#ff9ac6]", "bg-white/10", "hover:bg-[#ff9ac6]", "hover:text-black"],
      active: ["border-[#ff9ac6]", "bg-[#ff9ac6]", "text-black", "hover:bg-[#ff9ac6]"],
    },
    2: {
      inactive: ["border-white", "text-white", "bg-white/10", "hover:bg-white", "hover:text-black"],
      active: ["border-white", "bg-white", "text-black", "hover:bg-white"],
    },
    3: {
      inactive: ["border-[#8b0000]", "text-[#8b0000]", "bg-white/10", "hover:bg-[#8b0000]", "hover:text-white"],
      active: ["border-[#8b0000]", "bg-[#8b0000]", "text-white", "hover:bg-[#8b0000]"],
    },
  };

  const categoryTheme = {
    all: {
      inactive: ["border-white/30", "bg-white/10", "text-white", "hover:bg-black", "hover:text-white"],
      active: ["border-white", "bg-white", "text-black", "hover:bg-white"],
    },
    Dance: {
      inactive: ["border-black/10", "bg-[#FFE8E8]", "text-black", "hover:brightness-95"],
      active: ["border-black/10", "bg-[#FFE8E8]", "text-black", "ring-2", "ring-black/20"],
    },
    Music: {
      inactive: ["border-black/10", "bg-[#E8F1FF]", "text-black", "hover:brightness-95"],
      active: ["border-black/10", "bg-[#E8F1FF]", "text-black", "ring-2", "ring-black/20"],
    },
    Gaming: {
      inactive: ["border-black/10", "bg-[#FFF5E6]", "text-black", "hover:brightness-95"],
      active: ["border-black/10", "bg-[#FFF5E6]", "text-black", "ring-2", "ring-black/20"],
    },
    Drama: {
      inactive: ["border-black/10", "bg-[#F3E8FF]", "text-black", "hover:brightness-95"],
      active: ["border-black/10", "bg-[#F3E8FF]", "text-black", "ring-2", "ring-black/20"],
    },
    Technical: {
      inactive: ["border-black/10", "bg-[#E9FFE8]", "text-black", "hover:brightness-95"],
      active: ["border-black/10", "bg-[#E9FFE8]", "text-black", "ring-2", "ring-black/20"],
    },
  };

  function escapeHtml(str) {
    return String(str)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function normalizeDay(value) {
    return value === "all" ? "all" : String(Number(value));
  }

  function normalizeCategory(value) {
    return value === "all" ? "all" : String(value);
  }

  function applyTheme(button, theme, active) {
    const all = new Set([...theme.inactive, ...theme.active]);
    all.forEach((cls) => button.classList.remove(cls));
    (active ? theme.active : theme.inactive).forEach((cls) => button.classList.add(cls));
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
  }

  function setDayActive(activeButton) {
    document.querySelectorAll(".day-filter").forEach((btn) => {
      const key = normalizeDay(btn.dataset.day);
      const theme = dayTheme[key] ?? dayTheme.all;
      applyTheme(btn, theme, btn === activeButton);
    });
  }

  function setCategoryActive(activeButton) {
    document.querySelectorAll(".cat-filter").forEach((btn) => {
      const key = normalizeCategory(btn.dataset.category);
      const theme = categoryTheme[key] ?? categoryTheme.all;
      applyTheme(btn, theme, btn === activeButton);
    });
  }

  function getFilteredEvents() {
    let filtered = eventsData;

    if (currentDay !== "all") {
      filtered = filtered.filter((event) => String(event.day) === currentDay);
    }

    if (currentCategory !== "all") {
      filtered = filtered.filter((event) => event.category === currentCategory);
    }

    return filtered;
  }

  function applySelectedHighlight() {
    const selected = selectedEventId == null ? null : String(selectedEventId);
    grid.querySelectorAll(".event-card").forEach((card) => {
      const isSelected = selected != null && card instanceof HTMLElement && card.dataset.eventId === selected;
      card.classList.toggle("ring-2", isSelected);
      card.classList.toggle("ring-[#8b0000]", isSelected);
      card.classList.toggle("ring-offset-2", isSelected);
      card.classList.toggle("ring-offset-white/70", isSelected);
    });
  }

  function populateDialog(event) {
    if (!event) return;

    if (dialogTitle) dialogTitle.textContent = event.title ?? "";
    if (dialogCategory) dialogCategory.textContent = event.category ?? "";
    if (dialogDay) dialogDay.textContent = event.day != null ? `Day ${event.day}` : "";
    if (dialogDate) dialogDate.textContent = event.date ?? "";
    if (dialogTime) dialogTime.textContent = event.time ?? "";
    if (dialogLocation) dialogLocation.textContent = event.location ?? "";

    if (dialogRegister) {
      dialogRegister.setAttribute("href", "#");
      dialogRegister.setAttribute("aria-label", `Register for ${event.title ?? "event"}`);
    }
  }

  function openDialog() {
    if (!dialogOverlay || !dialog) return;

    lastFocusedEl = document.activeElement;
    dialogOverlay.classList.remove("hidden");
    dialogOverlay.classList.add("flex");
    document.body.style.overflow = "hidden";

    (dialogClose instanceof HTMLElement ? dialogClose : dialog).focus?.();
  }

  function closeDialog({ restoreFocus = true } = {}) {
    if (!dialogOverlay) return;
    if (dialogOverlay.classList.contains("hidden")) return;

    dialogOverlay.classList.add("hidden");
    dialogOverlay.classList.remove("flex");
    document.body.style.overflow = "";

    if (restoreFocus && lastFocusedEl instanceof HTMLElement) lastFocusedEl.focus();
    lastFocusedEl = null;

    selectedEventId = null;
    applySelectedHighlight();
  }

  function selectEventById(eventId) {
    const id = String(eventId);
    const event = eventsData.find((e) => String(e.id) === id);
    if (!event) return;

    selectedEventId = id;
    populateDialog(event);
    applySelectedHighlight();
    openDialog();
  }

  function renderEvents() {
    const filtered = getFilteredEvents();
    grid.innerHTML = "";

    if (filtered.length === 0) {
      grid.innerHTML =
        '<div class="text-white/70 text-center col-span-full">No events match your filters.</div>';
      selectedEventId = null;
      return;
    }

    if (selectedEventId != null && !filtered.some((event) => String(event.id) === String(selectedEventId))) {
      selectedEventId = null;
    }

    filtered.forEach((event, index) => {
      const pastel = pastelByCategory[event.category] ?? pastelFallback[index % pastelFallback.length];

      const title = escapeHtml(event.title);
      const category = escapeHtml(event.category);
      const date = escapeHtml(event.date);
      const time = escapeHtml(event.time);
      const location = escapeHtml(event.location);
      const day = escapeHtml(event.day);

      const card = document.createElement("div");

      card.className = [
        "event-card",
        "relative",
        pastel,
        "rounded-2xl",
        "p-4",
        "md:p-6",
        "shadow-sm",
        "hover:shadow-md",
        "transition",
        "duration-200",
        "text-black"
      ].join(" ");
      card.dataset.eventId = String(event.id ?? "");

      card.innerHTML = `
        <div class="relative h-full flex flex-col">

          <!-- Festival Mark -->
          <span class="absolute top-3 right-4 text-[#8b0000] text-lg font-bold opacity-80 select-none">
            祭
          </span>

          <!-- Title -->
          <h3 class="text-base md:text-lg lg:text-xl font-semibold leading-snug">
            ${title}
          </h3>

          <!-- Category -->
          <p class="mt-1 text-sm font-semibold opacity-70">
            ${category}
          </p>

          <!-- Event Info -->
          <div class="mt-4 text-sm space-y-1 opacity-90">
            <p><span class="font-semibold">Day:</span> ${day}</p>
            <p><span class="font-semibold">Date:</span> ${date}</p>
            <p><span class="font-semibold">Time:</span> ${time}</p>
            <p><span class="font-semibold">Location:</span> ${location}</p>
          </div>

          <!-- Button -->
          <button
            type="button"
            data-event-id="${escapeHtml(event.id)}"
            class="mt-6 border border-black/20 rounded-full px-4 py-2 text-sm font-semibold hover:bg-black hover:text-white transition">
            View Details
          </button>

        </div>
      `;

      grid.appendChild(card);
    });

    applySelectedHighlight();
  }

  async function loadEvents() {
    grid.innerHTML = '<div class="text-white/70 text-center col-span-full">Loading events...</div>';

    const candidates = ["../data/events.json", "/src/data/events.json", "./src/data/events.json"];
    let lastError = null;

    for (const url of candidates) {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`${new URL(url, window.location.href)} (${res.status})`);
        eventsData = await res.json();
        renderEvents();
        return;
      } catch (e) {
        lastError = e;
      }
    }

    const message = lastError instanceof Error ? lastError.message : String(lastError);
    grid.innerHTML = `<div class="text-white/70 text-center col-span-full">Failed to load events.json: ${escapeHtml(message)}</div>`;
    console.error(lastError);
  }

  document.querySelectorAll(".day-filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      setDayActive(btn);
      currentDay = normalizeDay(btn.dataset.day);
      renderEvents();
    });
  });

  document.querySelectorAll(".cat-filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      setCategoryActive(btn);
      currentCategory = normalizeCategory(btn.dataset.category);
      renderEvents();
    });
  });

  grid.addEventListener("click", (e) => {
    const target = e.target instanceof Element ? e.target : null;
    const btn = target?.closest?.('button[data-event-id]');
    if (!btn) return;
    selectEventById(btn.getAttribute("data-event-id"));
  });

  dialogClose?.addEventListener("click", () => closeDialog());

  dialogOverlay?.addEventListener("click", (e) => {
    if (e.target === dialogOverlay) closeDialog();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDialog({ restoreFocus: true });
  });

  const initialDay =
    document.querySelector(".day-filter.active") ??
    document.querySelector('.day-filter[aria-pressed="true"]') ??
    document.querySelector(".day-filter");
  const initialCategory =
    document.querySelector(".cat-filter.active") ??
    document.querySelector('.cat-filter[aria-pressed="true"]') ??
    document.querySelector(".cat-filter");

  if (initialDay instanceof HTMLElement) setDayActive(initialDay);
  if (initialCategory instanceof HTMLElement) setCategoryActive(initialCategory);

  loadEvents();
})();
