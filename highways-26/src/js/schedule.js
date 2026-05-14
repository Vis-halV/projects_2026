(() => {
  const items = document.getElementById("schedule-items");
  if (!items) return;

  const tabs = Array.from(document.querySelectorAll(".day-tab"));
  let eventsData = [];
  let currentDay = "all";

  const dayTheme = {
    all: {
      inactive: [
        "border-white/30",
        "bg-white/10",
        "text-white",
        "hover:bg-black",
        "hover:text-white",
      ],
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

  const pastelByDay = {
    1: "bg-[#FFE8E8]",
    2: "bg-[#E8F1FF]",
    3: "bg-[#E9FFE8]",
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

  function applyTabTheme(button, theme, active) {
    const all = new Set([...theme.inactive, ...theme.active]);
    all.forEach((cls) => button.classList.remove(cls));
    (active ? theme.active : theme.inactive).forEach((cls) => button.classList.add(cls));
    button.setAttribute("aria-pressed", String(active));
  }

  function setActiveTab(activeButton) {
    tabs.forEach((btn) => {
      const key = normalizeDay(btn.dataset.day);
      const theme = dayTheme[key] ?? dayTheme.all;
      applyTabTheme(btn, theme, btn === activeButton);
    });
  }

  function parseTimeToMinutes(timeText) {
    const text = String(timeText ?? "").trim();
    const match = text.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
    if (!match) return Number.POSITIVE_INFINITY;

    let hours = Number(match[1]);
    const minutes = Number(match[2]);
    const period = match[3].toUpperCase();

    if (period === "AM") {
      if (hours === 12) hours = 0;
    } else {
      if (hours !== 12) hours += 12;
    }

    return hours * 60 + minutes;
  }

  function prefersReducedMotion() {
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }

  function setItemsHtml(html) {
    items.innerHTML = html;
  }

  function renderSchedule() {
    let filtered = eventsData;
    if (currentDay !== "all") filtered = filtered.filter((event) => String(event.day) === currentDay);

    if (filtered.length === 0) {
      setItemsHtml('<div class="text-white/70 text-center">No events found for this day.</div>');
      return;
    }

    const byDay = new Map();
    filtered.forEach((event) => {
      const day = String(event.day ?? "");
      if (!byDay.has(day)) byDay.set(day, []);
      byDay.get(day).push(event);
    });

    const dayOrder = currentDay === "all" ? ["1", "2", "3"] : [currentDay];
    const parts = [];
    let isFirstHeader = true;

    dayOrder.forEach((dayKey) => {
      const dayEvents = byDay.get(dayKey) ?? [];
      dayEvents.sort((a, b) => parseTimeToMinutes(a.time) - parseTimeToMinutes(b.time));
      const dayBg = pastelByDay[Number(dayKey)] ?? "bg-white/10";

      if (currentDay === "all") {
        parts.push(`
          <h2 class="text-xl font-semibold text-white ${isFirstHeader ? "" : "mt-10"}">
            Day ${escapeHtml(dayKey)}
          </h2>
        `);
        isFirstHeader = false;
      }

      const byTime = new Map();
      dayEvents.forEach((event) => {
        const key = String(event.time ?? "");
        if (!byTime.has(key)) byTime.set(key, []);
        byTime.get(key).push(event);
      });

      const timeKeys = Array.from(byTime.keys()).sort((a, b) => parseTimeToMinutes(a) - parseTimeToMinutes(b));

      timeKeys.forEach((timeKey) => {
        const group = byTime.get(timeKey) ?? [];
        parts.push(`
          <div class="schedule-item ${dayBg} border border-black/10 rounded-xl p-5 text-black hover:brightness-95 transition">
            <div class="grid grid-cols-1 gap-3 md:grid-cols-[120px_1fr] items-start">
              <div class="time font-semibold md:pl-2">${escapeHtml(timeKey)}</div>
              <div class="space-y-4">
                ${group
                  .map((event, idx) => {
                    const divider = idx === 0 ? "" : "pt-4 border-t border-black/10";
                    return `
                      <div class="${divider} grid grid-cols-1 gap-2 sm:grid-cols-[1fr_180px] sm:items-start">
                        <div class="event">
                          <h3 class="text-lg font-semibold leading-snug">${escapeHtml(event.title ?? "")}</h3>
                          <p class="text-black/60">${escapeHtml(event.category ?? "")}</p>
                        </div>
                        <div class="location sm:text-right text-black/70">${escapeHtml(event.location ?? "")}</div>
                      </div>
                    `;
                  })
                  .join("")}
              </div>
            </div>
          </div>
        `);
      });
    });

    setItemsHtml(parts.join(""));
  }

  function renderWithTransition() {
    if (prefersReducedMotion()) {
      renderSchedule();
      return;
    }

    items.classList.add("opacity-0");
    window.setTimeout(() => {
      renderSchedule();
      requestAnimationFrame(() => items.classList.remove("opacity-0"));
    }, 140);
  }

  async function loadSchedule() {
    setItemsHtml('<div class="text-white/70 text-center">Loading schedule...</div>');

    const candidates = ["../data/events.json", "/src/data/events.json", "./src/data/events.json"];
    let lastError = null;

    for (const url of candidates) {
      try {
        const res = await fetch(url, { cache: "no-store" });
        if (!res.ok) throw new Error(`${new URL(url, window.location.href)} (${res.status})`);
        eventsData = await res.json();
        renderSchedule();
        return;
      } catch (e) {
        lastError = e;
      }
    }

    const message = lastError instanceof Error ? lastError.message : String(lastError);
    setItemsHtml(`<div class="text-white/70 text-center">Failed to load events.json: ${escapeHtml(message)}</div>`);
    console.error(lastError);
  }

  tabs.forEach((btn) => {
    btn.addEventListener("click", () => {
      setActiveTab(btn);
      currentDay = normalizeDay(btn.dataset.day);
      renderWithTransition();
    });
  });

  const initial =
    document.querySelector(".day-tab[aria-pressed=\"true\"]") ??
    document.querySelector(".day-tab");
  if (initial instanceof HTMLElement) setActiveTab(initial);

  loadSchedule();
})();
