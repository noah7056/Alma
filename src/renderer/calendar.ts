/**
 * Alma Calendar — a Google Calendar style scheduler.
 *
 * Day, week and month views over a set of local events, with calendars,
 * reminders and a mini month picker. Like the other native apps the module
 * owns its state and persists it to localStorage; renderer.ts drives it
 * through the `calendarApp` facade at the bottom of this file.
 */

export type CalLang = "en" | "it" | "zh";

type CalView = "day" | "week" | "month";

interface CalEvent {
  id: string;
  title: string;
  /** Local timestamp, "YYYY-MM-DDTHH:mm". */
  start: string;
  end: string;
  allDay: boolean;
  description: string;
  calendarId: string;
  /** Minutes before the start, or null for no reminder. */
  reminder: number | null;
  createdAt: number;
  updatedAt: number;
}

interface CalCalendar {
  id: string;
  name: string;
  color: string;
  visible: boolean;
}

const EVENTS_KEY = "alma:calendar_events";
const CALENDARS_KEY = "alma:calendar_calendars";
const FIRED_KEY = "alma:calendar_reminders_fired";

const HOUR_HEIGHT = 46;
const SNAP_MINUTES = 15;
const MIN_DURATION = 15;
const DEFAULT_CALENDAR_COLOR = "#4285f4";

// ---- Strings ----

interface CalStrings {
  appName: string;
  today: string;
  day: string;
  week: string;
  month: string;
  create: string;
  newEvent: string;
  editEvent: string;
  eventTitle: string;
  addTitle: string;
  start: string;
  end: string;
  allDay: string;
  calendar: string;
  reminder: string;
  noReminder: string;
  minutesBefore: string;
  hoursBefore: string;
  daysBefore: string;
  weeksBefore: string;
  description: string;
  save: string;
  cancel: string;
  delete: string;
  edit: string;
  myCalendars: string;
  noEvents: string;
  reminderTitle: string;
  allDayEvent: string;
  noDescription: string;
  weekday: string;
  monthName: string;
  newCalendar: string;
  calendarName: string;
  add: string;
  previousPeriod: string;
  nextPeriod: string;
  deleteEventConfirm: string;
}

const STRINGS: Record<CalLang, CalStrings> = {
  en: {
    appName: "Calendar",
    today: "Today",
    day: "Day",
    week: "Week",
    month: "Month",
    create: "Create",
    newEvent: "New event",
    editEvent: "Edit event",
    eventTitle: "Event title",
    addTitle: "Add title",
    start: "Start",
    end: "End",
    allDay: "All day",
    calendar: "Calendar",
    reminder: "Reminder",
    noReminder: "No reminder",
    minutesBefore: "minutes before",
    hoursBefore: "hours before",
    daysBefore: "days before",
    weeksBefore: "weeks before",
    description: "Description",
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    myCalendars: "My calendars",
    noEvents: "No events",
    reminderTitle: "Reminder",
    allDayEvent: "All day",
    noDescription: "No description",
    weekday: "Week",
    monthName: "Month",
    newCalendar: "New calendar",
    calendarName: "Calendar name",
    add: "Add",
    previousPeriod: "Previous",
    nextPeriod: "Next",
    deleteEventConfirm: "Delete this event? This cannot be undone.",
  },
  it: {
    appName: "Calendar",
    today: "Oggi",
    day: "Giorno",
    week: "Settimana",
    month: "Mese",
    create: "Crea",
    newEvent: "Nuovo evento",
    editEvent: "Modifica evento",
    eventTitle: "Titolo evento",
    addTitle: "Aggiungi titolo",
    start: "Inizio",
    end: "Fine",
    allDay: "Tutto il giorno",
    calendar: "Calendario",
    reminder: "Promemoria",
    noReminder: "Nessun promemoria",
    minutesBefore: "minuti prima",
    hoursBefore: "ore prima",
    daysBefore: "giorni prima",
    weeksBefore: "settimane prima",
    description: "Descrizione",
    save: "Salva",
    cancel: "Annulla",
    delete: "Elimina",
    edit: "Modifica",
    myCalendars: "I miei calendari",
    noEvents: "Nessun evento",
    reminderTitle: "Promemoria",
    allDayEvent: "Tutto il giorno",
    noDescription: "Nessuna descrizione",
    weekday: "Settimana",
    monthName: "Mese",
    newCalendar: "Nuovo calendario",
    calendarName: "Nome del calendario",
    add: "Aggiungi",
    previousPeriod: "Periodo precedente",
    nextPeriod: "Periodo successivo",
    deleteEventConfirm: "Eliminare questo evento? L'operazione non può essere annullata.",
  },
  zh: {
    appName: "Calendar",
    today: "今天",
    day: "日",
    week: "周",
    month: "月",
    create: "创建",
    newEvent: "新建事件",
    editEvent: "编辑事件",
    eventTitle: "事件标题",
    addTitle: "添加标题",
    start: "开始",
    end: "结束",
    allDay: "全天",
    calendar: "日历",
    reminder: "提醒",
    noReminder: "无提醒",
    minutesBefore: "分钟前",
    hoursBefore: "小时前",
    daysBefore: "天前",
    weeksBefore: "周前",
    description: "描述",
    save: "保存",
    cancel: "取消",
    delete: "删除",
    edit: "编辑",
    myCalendars: "我的日历",
    noEvents: "暂无事件",
    reminderTitle: "提醒",
    allDayEvent: "全天",
    noDescription: "无描述",
    weekday: "周",
    monthName: "月",
    newCalendar: "新建日历",
    calendarName: "日历名称",
    add: "添加",
    previousPeriod: "上一个时段",
    nextPeriod: "下一个时段",
    deleteEventConfirm: "删除此事件？此操作无法撤销。",
  },
};

let lang: CalLang = "en";
function str(): CalStrings {
  return STRINGS[lang];
}

// ---- State ----

let events: CalEvent[] = [];
let calendars: CalCalendar[] = [];
let view: CalView = "month";
let anchor = new Date();
let miniAnchor = new Date();
let editingEventId: string | null = null;
let firedReminders: string[] = [];
let expandedDays: Set<string> = new Set();
let uiReady = false;

// ---- Helpers ----

function uid(prefix: string): string {
  return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

function el<T extends HTMLElement>(id: string): T | null {
  return document.getElementById(id) as T | null;
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function pad(value: number): string {
  return value < 10 ? `0${value}` : String(value);
}

function dateKey(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function timeKey(date: Date): string {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function toStamp(date: Date): string {
  return `${dateKey(date)}T${timeKey(date)}`;
}

function parseStamp(stamp: string): Date {
  const [datePart, timePart = "00:00"] = stamp.split("T");
  const [year, month, day] = datePart.split("-").map(Number);
  const [hours, minutes] = timePart.split(":").map(Number);
  return new Date(year || 1970, (month || 1) - 1, day || 1, hours || 0, minutes || 0, 0, 0);
}

function startOfDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function addDays(date: Date, count: number): Date {
  const next = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  next.setDate(next.getDate() + count);
  return next;
}

function addMonths(date: Date, count: number): Date {
  const next = new Date(date.getFullYear(), date.getMonth() + count, 1);
  return next;
}

function sameDay(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}

function firstDayOfWeek(): number {
  // en starts the week on Sunday, it and zh on Monday.
  return lang === "en" ? 0 : 1;
}

function startOfWeek(date: Date): Date {
  const day = startOfDay(date);
  const diff = (day.getDay() - firstDayOfWeek() + 7) % 7;
  return addDays(day, -diff);
}

function formatTime(date: Date): string {
  try {
    return date.toLocaleTimeString(lang, { hour: "2-digit", minute: "2-digit" });
  } catch {
    return timeKey(date);
  }
}

function formatWeekday(date: Date, style: "short" | "long" = "short"): string {
  try {
    return date.toLocaleDateString(lang, { weekday: style });
  } catch {
    return String(date.getDay());
  }
}

function formatDateLong(date: Date): string {
  try {
    return date.toLocaleDateString(lang, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  } catch {
    return dateKey(date);
  }
}

function formatMonthTitle(date: Date): string {
  try {
    return date.toLocaleDateString(lang, { month: "long", year: "numeric" });
  } catch {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`;
  }
}

function formatMonthShort(date: Date): string {
  try {
    return date.toLocaleDateString(lang, { month: "short" });
  } catch {
    return pad(date.getMonth() + 1);
  }
}

function formatDayNumber(date: Date): string {
  try {
    return date.toLocaleDateString(lang, { day: "numeric" });
  } catch {
    return String(date.getDate());
  }
}

function eventStart(event: CalEvent): Date {
  return parseStamp(event.start);
}

function eventEnd(event: CalEvent): Date {
  return parseStamp(event.end);
}

function overlapsDay(event: CalEvent, day: Date): boolean {
  const dayStart = startOfDay(day).getTime();
  const dayEnd = addDays(startOfDay(day), 1).getTime();
  const start = eventStart(event).getTime();
  const end = eventEnd(event).getTime();
  return start < dayEnd && end > dayStart;
}

function calendarById(id: string): CalCalendar | null {
  return calendars.find((c) => c.id === id) ?? null;
}

function colorOf(event: CalEvent): string {
  return calendarById(event.calendarId)?.color ?? DEFAULT_CALENDAR_COLOR;
}

function visibleEvents(): CalEvent[] {
  const hidden = new Set(calendars.filter((c) => !c.visible).map((c) => c.id));
  return events.filter((e) => !hidden.has(e.calendarId));
}

// ---- Storage ----

function loadEvents(): CalEvent[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(EVENTS_KEY) || "[]");
    if (!Array.isArray(parsed)) return [];
    return parsed.map((raw: any) => normalizeEvent(raw)).filter(Boolean) as CalEvent[];
  } catch {
    return [];
  }
}

function normalizeEvent(raw: any): CalEvent | null {
  if (!raw || typeof raw !== "object" || !raw.id) return null;
  const start = typeof raw.start === "string" ? raw.start : "";
  const end = typeof raw.end === "string" ? raw.end : "";
  if (!start) return null;
  return {
    id: String(raw.id),
    title: typeof raw.title === "string" ? raw.title : "",
    start,
    end: end || start,
    allDay: !!raw.allDay,
    description: typeof raw.description === "string" ? raw.description : "",
    calendarId: typeof raw.calendarId === "string" ? raw.calendarId : "default",
    reminder: typeof raw.reminder === "number" ? raw.reminder : null,
    createdAt: Number(raw.createdAt) || Date.now(),
    updatedAt: Number(raw.updatedAt) || Date.now(),
  };
}

function persistEvents(): void {
  try {
    localStorage.setItem(EVENTS_KEY, JSON.stringify(events));
  } catch {
    // ignore
  }
}

function defaultCalendars(): CalCalendar[] {
  return [
    { id: "default", name: "Personal", color: DEFAULT_CALENDAR_COLOR, visible: true },
    { id: "work", name: "Work", color: "#d93025", visible: true },
  ];
}

function loadCalendars(): CalCalendar[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(CALENDARS_KEY) || "[]");
    if (!Array.isArray(parsed) || !parsed.length) return defaultCalendars();
    return parsed
      .map((raw: any) => ({
        id: String(raw.id ?? uid("cal")),
        name: typeof raw.name === "string" ? raw.name : "Calendar",
        color: typeof raw.color === "string" ? raw.color : DEFAULT_CALENDAR_COLOR,
        visible: raw.visible !== false,
      }))
      .slice(0, 12);
  } catch {
    return defaultCalendars();
  }
}

function persistCalendars(): void {
  try {
    localStorage.setItem(CALENDARS_KEY, JSON.stringify(calendars));
  } catch {
    // ignore
  }
}

// ---- Rendering: header ----

function periodTitle(): string {
  if (view === "day") return formatDateLong(anchor);
  if (view === "week") {
    const start = startOfWeek(anchor);
    const end = addDays(start, 6);
    if (start.getMonth() === end.getMonth()) {
      return `${formatMonthShort(start)} ${formatDayNumber(start)} – ${formatDayNumber(end)}, ${end.getFullYear()}`;
    }
    return `${formatMonthShort(start)} ${formatDayNumber(start)} – ${formatMonthShort(end)} ${formatDayNumber(end)}, ${end.getFullYear()}`;
  }
  return formatMonthTitle(anchor);
}

function renderHeader(): void {
  const title = el("cal-title");
  if (title) title.textContent = periodTitle();
  document.querySelectorAll<HTMLElement>("#cal-view-switch [data-cal-view]").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.calView === view);
  });
  const todayBtn = el("cal-today-btn");
  if (todayBtn) todayBtn.textContent = str().today;
}

// ---- Rendering: sidebar ----

function renderMiniCalendar(): void {
  const host = el("cal-mini");
  if (!host) return;
  const first = new Date(miniAnchor.getFullYear(), miniAnchor.getMonth(), 1);
  const gridStart = startOfWeek(first);
  const today = new Date();

  const head = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(gridStart, i);
    return `<span class="cal-mini-head">${escapeHtml(formatWeekday(day))}</span>`;
  }).join("");

  const cells = Array.from({ length: 42 }, (_, i) => {
    const day = addDays(gridStart, i);
    const outside = day.getMonth() !== first.getMonth();
    const isToday = sameDay(day, today);
    const count = visibleEvents().filter((e) => overlapsDay(e, day)).length;
    const dots = count > 0 ? `<span class="cal-mini-dots">${count > 3 ? "•" : "•".repeat(count)}</span>` : "";
    return `<button class="cal-mini-cell${outside ? " outside" : ""}${isToday ? " today" : ""}" data-cal-date="${dateKey(day)}">${formatDayNumber(day)}${dots}</button>`;
  }).join("");

  host.innerHTML = `
    <div class="cal-mini-head-row">
      <span class="cal-mini-title">${escapeHtml(formatMonthTitle(miniAnchor))}</span>
      <span class="cal-mini-nav">
        <button class="cal-mini-nav-btn" id="cal-mini-prev" aria-label="${escapeHtml(str().previousPeriod)}">‹</button>
        <button class="cal-mini-nav-btn" id="cal-mini-next" aria-label="${escapeHtml(str().nextPeriod)}">›</button>
      </span>
    </div>
    <div class="cal-mini-grid cal-mini-weekdays">${head}</div>
    <div class="cal-mini-grid">${cells}</div>`;

  el("cal-mini-prev")?.addEventListener("click", () => {
    miniAnchor = addMonths(miniAnchor, -1);
    renderMiniCalendar();
  });
  el("cal-mini-next")?.addEventListener("click", () => {
    miniAnchor = addMonths(miniAnchor, 1);
    renderMiniCalendar();
  });

  host.querySelectorAll<HTMLElement>("[data-cal-date]").forEach((cell) => {
    cell.addEventListener("click", () => {
      const [year, month, day] = cell.dataset.calDate!.split("-").map(Number);
      anchor = new Date(year, month - 1, day);
      miniAnchor = new Date(year, month - 1, 1);
      render();
    });
  });
}

function renderCalendarList(): void {
  const host = el("cal-calendars");
  if (!host) return;
  const title = el("cal-calendars-title");
  if (title) title.textContent = str().myCalendars;

  host.innerHTML = calendars
    .map(
      (cal) => `
      <label class="cal-list-item">
        <input type="checkbox" data-cal-id="${cal.id}" ${cal.visible ? "checked" : ""} />
        <span class="cal-swatch" style="background:${escapeHtml(cal.color)}"></span>
        <span class="cal-list-name">${escapeHtml(cal.name)}</span>
      </label>`
    )
    .join("");

  host.querySelectorAll<HTMLInputElement>("input[data-cal-id]").forEach((box) => {
    box.addEventListener("change", () => {
      const cal = calendarById(box.dataset.calId as string);
      if (!cal) return;
      cal.visible = box.checked;
      persistCalendars();
      render();
    });
  });
}

// ---- Rendering: month view ----

const BELL_SVG = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 3h16z" /><path d="M10 21h4" /></svg>`;

function eventChipHtml(event: CalEvent): string {
  const color = colorOf(event);
  const start = eventStart(event);
  const bell = event.reminder !== null ? `<span class="cal-chip-bell">${BELL_SVG}</span>` : "";
  const time = event.allDay ? "" : `<span class="cal-chip-time">${escapeHtml(formatTime(start))}</span>`;
  return `
    <div class="cal-chip" data-event-id="${event.id}" style="--cal-color:${escapeHtml(color)}">
      ${time}
      <span class="cal-chip-title">${escapeHtml(event.title || str().newEvent)}</span>
      ${bell}
    </div>`;
}

function renderMonthView(): string {
  const first = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  const gridStart = startOfWeek(first);
  const today = new Date();

  const head = Array.from({ length: 7 }, (_, i) => {
    const day = addDays(gridStart, i);
    return `<div class="cal-month-head-cell">${escapeHtml(formatWeekday(day))}</div>`;
  }).join("");

  const cells = Array.from({ length: 42 }, (_, i) => {
    const day = addDays(gridStart, i);
    const outside = day.getMonth() !== first.getMonth();
    const isToday = sameDay(day, today);
    const dayEvents = visibleEvents()
      .filter((e) => overlapsDay(e, day))
      .sort((a, b) => {
        if (a.allDay !== b.allDay) return a.allDay ? -1 : 1;
        return eventStart(a).getTime() - eventStart(b).getTime();
      });
    const key = dateKey(day);
    const expanded = expandedDays.has(key);
    const shown = expanded ? dayEvents : dayEvents.slice(0, 3);
    const chips = shown.map(eventChipHtml).join("");
    const hidden = dayEvents.length - shown.length;
    const more = hidden > 0
      ? `<div class="cal-chip-more" data-cal-more="${key}">+${hidden} more</div>`
      : expanded && dayEvents.length > 3
        ? `<div class="cal-chip-more" data-cal-more="${key}">Show less</div>`
        : "";
    return `
      <div class="cal-month-cell${outside ? " outside" : ""}${isToday ? " today" : ""}" data-cal-date="${dateKey(day)}">
        <div class="cal-month-cell-head"><span class="cal-daynum">${formatDayNumber(day)}</span></div>
        <div class="cal-month-events">${chips}</div>
        ${more}
      </div>`;
  }).join("");

  return `
    <div class="cal-month">
      <div class="cal-month-head">${head}</div>
      <div class="cal-month-grid">${cells}</div>
    </div>`;
}

// ---- Rendering: week / day view ----

interface PositionedEvent {
  event: CalEvent;
  column: number;
  columns: number;
}

/** Classic overlap layout: events that share time sit next to each other. */
function layoutOverlaps(items: CalEvent[]): PositionedEvent[] {
  const sorted = [...items].sort(
    (a, b) => eventStart(a).getTime() - eventStart(b).getTime() || eventEnd(b).getTime() - eventEnd(a).getTime()
  );
  const result: PositionedEvent[] = [];
  let cluster: CalEvent[] = [];
  let clusterEnd = -Infinity;

  const flush = () => {
    if (!cluster.length) return;
    const columns: CalEvent[][] = [];
    const columnOf = new Map<string, number>();
    for (const event of cluster) {
      let placed = false;
      for (let i = 0; i < columns.length; i++) {
        const last = columns[i][columns[i].length - 1];
        if (eventEnd(last).getTime() <= eventStart(event).getTime()) {
          columns[i].push(event);
          columnOf.set(event.id, i);
          placed = true;
          break;
        }
      }
      if (!placed) {
        columns.push([event]);
        columnOf.set(event.id, columns.length - 1);
      }
    }
    for (const event of cluster) {
      result.push({ event, column: columnOf.get(event.id) ?? 0, columns: columns.length });
    }
    cluster = [];
    clusterEnd = -Infinity;
  };

  for (const event of sorted) {
    if (eventStart(event).getTime() >= clusterEnd) flush();
    cluster.push(event);
    clusterEnd = Math.max(clusterEnd, eventEnd(event).getTime());
  }
  flush();
  return result;
}

function eventBlockHtml(positioned: PositionedEvent, day: Date): string {
  const { event, column, columns } = positioned;
  const color = colorOf(event);
  const start = eventStart(event);
  const end = eventEnd(event);
  const dayStart = startOfDay(day);
  const fromMinutes = Math.max(0, (start.getTime() - dayStart.getTime()) / 60000);
  const toMinutes = Math.min(24 * 60, (end.getTime() - dayStart.getTime()) / 60000);
  const top = (fromMinutes / 60) * HOUR_HEIGHT;
  const height = Math.max(18, ((toMinutes - fromMinutes) / 60) * HOUR_HEIGHT);
  const width = 100 / columns;
  const left = column * width;
  const bell = event.reminder !== null ? `<span class="cal-block-bell">${BELL_SVG}</span>` : "";
  const timeLabel = event.allDay ? "" : `<span class="cal-block-time">${escapeHtml(formatTime(start))}</span>`;
  // Short blocks put the time and the title on one line so the title is not clipped.
  const compact = height < 46 ? " compact" : "";
  return `
    <div class="cal-block${compact}" data-event-id="${event.id}" style="--cal-color:${escapeHtml(color)};top:${top}px;height:${height}px;left:${left}%;width:calc(${width}% - 4px)">
      <div class="cal-block-body">
        ${timeLabel}
        <span class="cal-block-title">${escapeHtml(event.title || str().newEvent)}</span>
        ${bell}
      </div>
      <span class="cal-block-resize cal-resize-top" data-cal-resize="top"></span>
      <span class="cal-block-resize cal-resize-bottom" data-cal-resize="bottom"></span>
    </div>`;
}

function renderTimeGrid(days: Date[]): string {
  const today = new Date();
  const gutter = Array.from({ length: 24 }, (_, hour) => {
    const label = new Date(2000, 0, 1, hour).toLocaleTimeString(lang, { hour: "2-digit" });
    return `<div class="cal-hour-label">${escapeHtml(label)}</div>`;
  }).join("");

  const head = days
    .map(
      (day) => `
      <div class="cal-time-head${sameDay(day, today) ? " today" : ""}" data-cal-date="${dateKey(day)}">
        <div class="cal-time-head-name">${escapeHtml(formatWeekday(day))}</div>
        <div class="cal-time-head-num">${formatDayNumber(day)}</div>
      </div>`
    )
    .join("");

  const allDay = days
    .map((day) => {
      const dayEvents = visibleEvents().filter((e) => e.allDay && overlapsDay(e, day));
      return `<div class="cal-allday-col" data-cal-date="${dateKey(day)}">${dayEvents.map(eventChipHtml).join("")}</div>`;
    })
    .join("");

  const columns = days
    .map((day) => {
      const timed = visibleEvents().filter((e) => !e.allDay && overlapsDay(e, day));
      const positioned = layoutOverlaps(timed);
      const isToday = sameDay(day, today);
      const nowTop = ((today.getHours() * 60 + today.getMinutes()) / 60) * HOUR_HEIGHT;
      const nowLine = isToday ? `<div class="cal-now-line" style="top:${nowTop}px"></div>` : "";
      return `
        <div class="cal-time-col${isToday ? " today" : ""}" data-cal-date="${dateKey(day)}">
          <div class="cal-hour-lines">${Array.from({ length: 24 }, () => '<div class="cal-hour-line"></div>').join("")}</div>
          ${positioned.map((p) => eventBlockHtml(p, day)).join("")}
          ${nowLine}
        </div>`;
    })
    .join("");

  return `
    <div class="cal-time">
      <div class="cal-time-heads">
        <div class="cal-time-gutter-head"></div>
        ${head}
      </div>
      <div class="cal-time-allday">
        <div class="cal-time-gutter-head"></div>
        ${allDay}
      </div>
      <div class="cal-time-body">
        <div class="cal-time-gutter">${gutter}</div>
        <div class="cal-time-columns">${columns}</div>
      </div>
    </div>`;
}

function renderWeekView(): string {
  const start = startOfWeek(anchor);
  const days = Array.from({ length: 7 }, (_, i) => addDays(start, i));
  return renderTimeGrid(days);
}

function renderDayView(): string {
  return renderTimeGrid([startOfDay(anchor)]);
}

// ---- Rendering: main ----

function renderMain(): void {
  const main = el("cal-main");
  if (!main) return;
  main.innerHTML = view === "month" ? renderMonthView() : view === "week" ? renderWeekView() : renderDayView();

  if (view === "month") {
    main.querySelectorAll<HTMLElement>(".cal-month-cell").forEach((cell) => {
      cell.addEventListener("click", (event) => {
        const chip = (event.target as HTMLElement).closest(".cal-chip");
        if (chip) return;
        const more = (event.target as HTMLElement).closest("[data-cal-more]");
        if (more) {
          const key = more.getAttribute("data-cal-more") as string;
          if (expandedDays.has(key)) expandedDays.delete(key);
          else expandedDays.add(key);
          renderMain();
          return;
        }
        const day = parseStamp(`${cell.dataset.calDate}T09:00`);
        openEventEditor(null, day, addDays(day, 1));
      });
    });
  } else {
    main.querySelectorAll<HTMLElement>(".cal-time-col").forEach((col) => {
      col.addEventListener("mousedown", (event) => {
        if ((event.target as HTMLElement).closest(".cal-block")) return;
        startSlotSelection(col, event);
      });
    });
  }

  main.querySelectorAll<HTMLElement>("[data-event-id]").forEach((node) => {
    node.addEventListener("click", (event) => {
      event.stopPropagation();
      // Ignore the click that a drag produces when it ends.
      if (lastPointerUp && Date.now() - lastPointerUp.time < 600) {
        const distance = Math.hypot(event.clientX - lastPointerUp.x, event.clientY - lastPointerUp.y);
        lastPointerUp = null;
        if (distance < 6) return;
      }
      const found = events.find((e) => e.id === node.dataset.eventId);
      if (found) showEventPeek(found, node);
    });
    node.addEventListener("dblclick", (event) => {
      event.stopPropagation();
      const found = events.find((e) => e.id === node.dataset.eventId);
      if (!found) return;
      closeEventPeek();
      openEventEditor(found);
    });
  });

  if (view !== "month") {
    main.querySelectorAll<HTMLElement>(".cal-block").forEach((block) => {
      block.addEventListener("mousedown", (event) => {
        const edge = (event.target as HTMLElement).dataset.calResize as "top" | "bottom" | undefined;
        startEventDrag(block, event, edge ?? null);
      });
    });
  }
}

function render(): void {
  renderHeader();
  renderMiniCalendar();
  renderCalendarList();
  renderMain();
}

// ---- Navigation ----

function shiftPeriod(direction: number): void {
  if (view === "day") anchor = addDays(anchor, direction);
  else if (view === "week") anchor = addDays(anchor, 7 * direction);
  else anchor = addMonths(anchor, direction);
  miniAnchor = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
  render();
}

// ---- Event editor ----

function reminderOptions(): [string, string][] {
  return [
    ["", str().noReminder],
    ["5", `5 ${str().minutesBefore}`],
    ["10", `10 ${str().minutesBefore}`],
    ["30", `30 ${str().minutesBefore}`],
    ["60", `1 ${str().hoursBefore}`],
    ["1440", `1 ${str().daysBefore}`],
    ["10080", `1 ${str().weeksBefore}`],
  ];
}

function openEventEditor(event: CalEvent | null, start?: Date, end?: Date): void {
  const modal = el("cal-event-modal");
  if (!modal) return;
  closeEventPeek();
  editingEventId = event?.id ?? null;

  const titleInput = el<HTMLInputElement>("cal-event-title");
  const dateInput = el<HTMLInputElement>("cal-event-date");
  const startInput = el<HTMLInputElement>("cal-event-start");
  const endInput = el<HTMLInputElement>("cal-event-end");
  const allDayBox = el<HTMLInputElement>("cal-event-allday");
  const calendarSelect = el<HTMLSelectElement>("cal-event-calendar");
  const reminderSelect = el<HTMLSelectElement>("cal-event-reminder");
  const descriptionInput = el<HTMLTextAreaElement>("cal-event-description");
  const modalTitle = el("cal-event-modal-title");
  const deleteBtn = el("cal-event-delete");

  if (modalTitle) modalTitle.textContent = event ? str().editEvent : str().newEvent;
  if (titleInput) {
    titleInput.value = event?.title ?? "";
    titleInput.setAttribute("placeholder", str().addTitle);
  }
  if (descriptionInput) descriptionInput.value = event?.description ?? "";

  const effectiveStart = event ? eventStart(event) : start ?? new Date();
  const effectiveEnd = event ? eventEnd(event) : end ?? addDays(effectiveStart, 1);
  if (dateInput) dateInput.value = dateKey(effectiveStart);
  if (startInput) startInput.value = timeKey(effectiveStart);
  if (endInput) endInput.value = timeKey(effectiveEnd);
  if (allDayBox) allDayBox.checked = event?.allDay ?? false;
  if (startInput) startInput.disabled = allDayBox?.checked ?? false;
  if (endInput) endInput.disabled = allDayBox?.checked ?? false;

  if (calendarSelect) {
    calendarSelect.innerHTML = calendars
      .map((cal) => `<option value="${cal.id}">${escapeHtml(cal.name)}</option>`)
      .join("");
    calendarSelect.value = event?.calendarId ?? calendars[0]?.id ?? "default";
  }
  if (reminderSelect) {
    reminderSelect.innerHTML = reminderOptions()
      .map(([value, label]) => `<option value="${value}">${escapeHtml(label)}</option>`)
      .join("");
    reminderSelect.value = event?.reminder !== null && event?.reminder !== undefined ? String(event.reminder) : "";
  }
  if (deleteBtn) deleteBtn.style.display = event ? "" : "none";

  modal.style.display = "flex";
  setTimeout(() => titleInput?.focus(), 30);
}

function closeEventEditor(): void {
  const modal = el("cal-event-modal");
  if (modal) modal.style.display = "none";
  editingEventId = null;
}

function saveEventFromEditor(): void {
  const titleInput = el<HTMLInputElement>("cal-event-title");
  const dateInput = el<HTMLInputElement>("cal-event-date");
  const startInput = el<HTMLInputElement>("cal-event-start");
  const endInput = el<HTMLInputElement>("cal-event-end");
  const allDayBox = el<HTMLInputElement>("cal-event-allday");
  const calendarSelect = el<HTMLSelectElement>("cal-event-calendar");
  const reminderSelect = el<HTMLSelectElement>("cal-event-reminder");
  const descriptionInput = el<HTMLTextAreaElement>("cal-event-description");
  if (!dateInput || !startInput || !endInput) return;

  const allDay = !!allDayBox?.checked;
  let start = `${dateInput.value}T${startInput.value || "00:00"}`;
  let end = `${dateInput.value}T${endInput.value || "23:59"}`;
  if (allDay) {
    start = `${dateInput.value}T00:00`;
    end = `${dateInput.value}T23:59`;
  }
  if (parseStamp(end).getTime() <= parseStamp(start).getTime()) {
    end = allDay ? `${dateInput.value}T23:59` : addDays(parseStamp(start), 1).toISOString().slice(0, 16);
    if (!allDay) end = toStamp(addDays(parseStamp(start), 1));
  }

  const reminderValue = reminderSelect?.value ?? "";
  const reminder = reminderValue === "" ? null : Number(reminderValue);

  const existing = editingEventId ? events.find((e) => e.id === editingEventId) : null;
  if (existing) {
    existing.title = titleInput?.value.trim() ?? "";
    existing.start = start;
    existing.end = end;
    existing.allDay = allDay;
    existing.description = descriptionInput?.value ?? "";
    existing.calendarId = calendarSelect?.value ?? "default";
    existing.reminder = reminder;
    existing.updatedAt = Date.now();
  } else {
    const now = Date.now();
    events.push({
      id: uid("evt"),
      title: titleInput?.value.trim() ?? "",
      start,
      end,
      allDay,
      description: descriptionInput?.value ?? "",
      calendarId: calendarSelect?.value ?? "default",
      reminder,
      createdAt: now,
      updatedAt: now,
    });
  }

  persistEvents();
  closeEventEditor();
  render();
}

function deleteEventFromEditor(): void {
  if (!editingEventId) return;
  const found = events.find((e) => e.id === editingEventId);
  if (!found) return;
  if (!window.confirm(str().deleteEventConfirm)) return;
  events = events.filter((e) => e.id !== editingEventId);
  persistEvents();
  closeEventEditor();
  render();
}

// ---- Event peek popup ----

let peekEventId: string | null = null;

function closeEventPeek(): void {
  const peek = el("cal-event-peek");
  if (peek) peek.style.display = "none";
  peekEventId = null;
}

function showEventPeek(event: CalEvent, anchor: HTMLElement): void {
  const peek = el("cal-event-peek");
  const shell = document.querySelector<HTMLElement>(".cal-shell");
  if (!peek || !shell) return;

  const title = el("cal-peek-title");
  const when = el("cal-peek-when");
  const calendarLabel = el("cal-peek-calendar");
  const swatch = el("cal-peek-swatch");
  const desc = el("cal-peek-desc");
  const editBtn = el("cal-peek-edit");
  const deleteBtn = el("cal-peek-delete");

  const start = eventStart(event);
  const end = eventEnd(event);
  const whenText = event.allDay
    ? `${formatDateLong(start)} — ${str().allDayEvent}`
    : `${formatDateLong(start)} · ${formatTime(start)} – ${formatTime(end)}`;

  if (title) title.textContent = event.title || str().newEvent;
  if (when) when.textContent = whenText;
  if (calendarLabel) calendarLabel.textContent = calendarById(event.calendarId)?.name ?? str().calendar;
  if (swatch) swatch.style.background = colorOf(event);
  if (desc) {
    desc.textContent = event.description;
    desc.style.display = event.description ? "block" : "none";
  }
  if (editBtn) editBtn.textContent = str().edit;
  if (deleteBtn) deleteBtn.textContent = str().delete;

  peekEventId = event.id;
  peek.style.display = "block";

  const shellRect = shell.getBoundingClientRect();
  const rect = anchor.getBoundingClientRect();
  const width = peek.offsetWidth;
  const height = peek.offsetHeight;
  let left = rect.left - shellRect.left + 10;
  let top = rect.bottom - shellRect.top + 6;
  if (left + width > shellRect.width - 8) left = Math.max(8, shellRect.width - width - 8);
  if (top + height > shellRect.height - 8) top = Math.max(8, rect.top - shellRect.top - height - 6);
  peek.style.left = `${left}px`;
  peek.style.top = `${top}px`;
}

// ---- Drag interactions (week / day views) ----

interface DragState {
  kind: "move" | "resize" | "slot";
  resizeEdge?: "top" | "bottom";
  moved?: boolean;
  eventId?: string;
  column?: HTMLElement;
  startX: number;
  startY: number;
  originStart?: number;
  originEnd?: number;
  grabOffset?: number;
  slotStartMinutes?: number;
  slotEndMinutes?: number;
}

let dragState: DragState | null = null;
/** Where the last drag ended, so the click it produces can be ignored. */
let lastPointerUp: { x: number; y: number; time: number } | null = null;

function minutesFromPointer(column: HTMLElement, clientY: number): number {
  const rect = column.getBoundingClientRect();
  const raw = ((clientY - rect.top) / HOUR_HEIGHT) * 60;
  return Math.max(0, Math.min(24 * 60, raw));
}

function snap(minutes: number): number {
  return Math.round(minutes / SNAP_MINUTES) * SNAP_MINUTES;
}

function startEventDrag(block: HTMLElement, event: MouseEvent, edge: "top" | "bottom" | null): void {
  const id = block.dataset.eventId as string;
  const found = events.find((e) => e.id === id);
  const column = block.closest(".cal-time-col") as HTMLElement | null;
  if (!found || !column) return;

  event.preventDefault();
  event.stopPropagation();

  const start = eventStart(found);
  const end = eventEnd(found);
  const pointerMinutes = minutesFromPointer(column, event.clientY);

  dragState = {
    kind: edge ? "resize" : "move",
    resizeEdge: edge ?? undefined,
    moved: false,
    eventId: id,
    column,
    startX: event.clientX,
    startY: event.clientY,
    originStart: start.getTime(),
    originEnd: end.getTime(),
    // Keep the grab point: the event follows the cursor instead of jumping.
    grabOffset: edge ? 0 : pointerMinutes - (start.getHours() * 60 + start.getMinutes()),
    slotStartMinutes: 0,
    slotEndMinutes: 0,
  };

  window.addEventListener("mousemove", onDragMove);
  window.addEventListener("mouseup", onDragEnd);
}

function startSlotSelection(column: HTMLElement, event: MouseEvent): void {
  const minutes = snap(minutesFromPointer(column, event.clientY));
  dragState = {
    kind: "slot",
    column,
    startX: event.clientX,
    startY: event.clientY,
    slotStartMinutes: minutes,
    slotEndMinutes: minutes + 60,
  };
  window.addEventListener("mousemove", onDragMove);
  window.addEventListener("mouseup", onDragEnd);
}

function onDragMove(event: MouseEvent): void {
  if (!dragState) return;
  // Re-query the column from the live DOM: renderMain() rebuilds the grid
  // during a drag, which detaches the column captured at drag start.
  const columnDate = dragState.column?.dataset?.calDate;
  if (columnDate) {
    const live = document.querySelector<HTMLElement>(`.cal-time-col[data-cal-date="${columnDate}"]`);
    if (live) dragState.column = live;
  }
  const column = dragState.column;
  if (!column) return;
  // The raw pointer position keeps the element under the cursor; only the
  // resulting time is snapped to the grid.
  const rawMinutes = minutesFromPointer(column, event.clientY);
  const minutes = snap(rawMinutes);

  if (dragState.kind === "slot") {
    dragState.slotEndMinutes = Math.max(minutes, (dragState.slotStartMinutes ?? 0) + SNAP_MINUTES);
    dragState.slotStartMinutes = Math.min(dragState.slotStartMinutes ?? 0, minutes);
    showSlotPreview(column, dragState.slotStartMinutes, dragState.slotEndMinutes);
    return;
  }

  const found = events.find((e) => e.id === dragState?.eventId);
  if (!found) return;
  if (!dragState.moved && (Math.abs(event.clientY - dragState.startY) > 3 || Math.abs(event.clientX - dragState.startX) > 3)) {
    dragState.moved = true;
  }

  const duration = (dragState.originEnd ?? 0) - (dragState.originStart ?? 0);
  const dayStart = startOfDay(new Date(dragState.originStart ?? 0)).getTime();

  if (dragState.kind === "move") {
    const nextStart = snap(Math.max(0, Math.min(24 * 60 - duration / 60000, rawMinutes - (dragState.grabOffset ?? 0))));
    const next = new Date(dayStart + nextStart * 60000);
    found.start = toStamp(next);
    found.end = toStamp(new Date(next.getTime() + duration));
  } else if (dragState.resizeEdge === "top") {
    // Drag the top edge: the start moves, the end stays put.
    const latest = (dragState.originEnd ?? 0) - MIN_DURATION * 60000;
    const nextStart = Math.min(dayStart + minutes * 60000, latest);
    found.start = toStamp(new Date(Math.max(dayStart, nextStart)));
  } else {
    // Drag the bottom edge: the end moves, the start stays put.
    const earliest = (dragState.originStart ?? 0) + MIN_DURATION * 60000;
    const nextEnd = Math.max(dayStart + minutes * 60000, earliest);
    found.end = toStamp(new Date(Math.min(dayStart + 24 * 60 * 60000, nextEnd)));
  }
  found.updatedAt = Date.now();
  renderMain();
}

function showSlotPreview(column: HTMLElement, from: number, to: number): void {
  let preview = column.querySelector<HTMLElement>(".cal-slot-preview");
  if (!preview) {
    preview = document.createElement("div");
    preview.className = "cal-slot-preview";
    column.appendChild(preview);
  }
  const top = (from / 60) * HOUR_HEIGHT;
  const height = Math.max(12, ((to - from) / 60) * HOUR_HEIGHT);
  preview.style.top = `${top}px`;
  preview.style.height = `${height}px`;
}

function onDragEnd(event?: MouseEvent): void {
  window.removeEventListener("mousemove", onDragMove);
  window.removeEventListener("mouseup", onDragEnd);
  if (!dragState) return;
  const state = dragState;
  dragState = null;

  if (state.kind !== "slot" && state.moved) {
    lastPointerUp = { x: event?.clientX ?? 0, y: event?.clientY ?? 0, time: Date.now() };
  }
  const columnDate = state.column?.dataset?.calDate;
  const liveColumn = columnDate
    ? (document.querySelector<HTMLElement>(`.cal-time-col[data-cal-date="${columnDate}"]`) ?? state.column)
    : state.column;
  if (state.kind === "slot" && liveColumn) {
    liveColumn.querySelector(".cal-slot-preview")?.remove();
    const day = parseStamp(`${liveColumn.dataset.calDate}T00:00`);
    const from = new Date(day.getTime() + (state.slotStartMinutes ?? 0) * 60000);
    const to = new Date(day.getTime() + (state.slotEndMinutes ?? 0) * 60000);
    persistEvents();
    render();
    openEventEditor(null, from, to);
    return;
  }

  if (state.moved) {
    persistEvents();
    render();
  }
}

// ---- Reminders ----

function reminderKey(event: CalEvent): string {
  return `${event.id}@${event.start}`;
}

function loadFiredReminders(): void {
  try {
    const parsed = JSON.parse(localStorage.getItem(FIRED_KEY) || "[]");
    firedReminders = Array.isArray(parsed) ? parsed : [];
  } catch {
    firedReminders = [];
  }
}

function persistFiredReminders(): void {
  try {
    localStorage.setItem(FIRED_KEY, JSON.stringify(firedReminders.slice(-200)));
  } catch {
    // ignore
  }
}

function checkReminders(): void {
  const now = Date.now();
  let changed = false;
  for (const event of events) {
    if (event.reminder === null) continue;
    const lead = eventStart(event).getTime() - now;
    // The reminder is due while the event is inside its lead time and has not started.
    if (lead <= 0 || lead > event.reminder * 60000) continue;
    const key = reminderKey(event);
    if (firedReminders.includes(key)) continue;
    firedReminders.push(key);
    changed = true;
    showReminderToast(event);
  }
  if (changed) persistFiredReminders();
}

function showReminderToast(event: CalEvent): void {
  const host = el("cal-toasts");
  if (!host) return;
  const color = colorOf(event);
  const toast = document.createElement("div");
  toast.className = "cal-toast";
  toast.style.setProperty("--cal-color", color);
  const when = event.allDay ? str().allDayEvent : formatTime(eventStart(event));
  toast.innerHTML = `
    <div class="cal-toast-head">
      <span class="cal-toast-badge">${escapeHtml(str().reminderTitle)}</span>
      <span class="cal-toast-when">${escapeHtml(when)}</span>
    </div>
    <div class="cal-toast-title">${escapeHtml(event.title || str().newEvent)}</div>
    ${event.description ? `<div class="cal-toast-desc">${escapeHtml(event.description)}</div>` : ""}`;
  host.appendChild(toast);
  setTimeout(() => {
    toast.classList.add("leaving");
    setTimeout(() => toast.remove(), 250);
  }, 8000);
}

// ---- Wiring ----

function setupUI(): void {
  if (uiReady) return;
  uiReady = true;

  el("cal-today-btn")?.addEventListener("click", () => {
    anchor = new Date();
    miniAnchor = new Date(anchor.getFullYear(), anchor.getMonth(), 1);
    render();
  });
  el("cal-prev-btn")?.addEventListener("click", () => shiftPeriod(-1));
  el("cal-next-btn")?.addEventListener("click", () => shiftPeriod(1));

  document.querySelectorAll<HTMLElement>("#cal-view-switch [data-cal-view]").forEach((btn) => {
    btn.addEventListener("click", () => {
      view = (btn.dataset.calView as CalView) ?? "month";
      render();
    });
  });

  el("cal-create-btn")?.addEventListener("click", () => {
    const start = new Date();
    start.setMinutes(0, 0, 0);
    start.setHours(start.getHours() + 1);
    openEventEditor(null, start, new Date(start.getTime() + 60 * 60000));
  });

  el("cal-peek-close")?.addEventListener("click", closeEventPeek);
  el("cal-peek-edit")?.addEventListener("click", () => {
    if (!peekEventId) return;
    const found = events.find((e) => e.id === peekEventId);
    closeEventPeek();
    if (found) openEventEditor(found);
  });
  el("cal-peek-delete")?.addEventListener("click", () => {
    if (!peekEventId) return;
    const found = events.find((e) => e.id === peekEventId);
    if (!found) return;
    if (!window.confirm(str().deleteEventConfirm)) return;
    events = events.filter((e) => e.id !== peekEventId);
    persistEvents();
    closeEventPeek();
    render();
  });

  // A click anywhere else closes the peek popup.
  document.addEventListener("click", (event) => {
    const peek = el("cal-event-peek");
    if (!peek || peek.style.display === "none") return;
    if ((event.target as HTMLElement).closest(".cal-peek")) return;
    if ((event.target as HTMLElement).closest("[data-event-id]")) return;
    closeEventPeek();
  });

  el("cal-event-save")?.addEventListener("click", saveEventFromEditor);
  el("cal-event-cancel")?.addEventListener("click", closeEventEditor);
  el("cal-event-close")?.addEventListener("click", closeEventEditor);
  el("cal-event-delete")?.addEventListener("click", deleteEventFromEditor);
  el("cal-event-modal")?.addEventListener("click", (event) => {
    if (event.target === el("cal-event-modal")) closeEventEditor();
  });
  el("cal-event-title")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      saveEventFromEditor();
    }
  });
  el("cal-event-allday")?.addEventListener("change", () => {
    const allDay = el<HTMLInputElement>("cal-event-allday")?.checked;
    const startInput = el<HTMLInputElement>("cal-event-start");
    const endInput = el<HTMLInputElement>("cal-event-end");
    if (allDay) {
      if (startInput) startInput.disabled = true;
      if (endInput) endInput.disabled = true;
    } else {
      if (startInput) startInput.disabled = false;
      if (endInput) endInput.disabled = false;
    }
  });

  window.addEventListener("beforeunload", () => persistEvents());

  // Keep the "now" line and the reminder queue up to date.
  window.setInterval(() => {
    checkReminders();
    const host = el("calendar-view");
    const modal = el("cal-event-modal");
    if (host && host.style.display !== "none" && (!modal || modal.style.display === "none")) {
      renderMain();
    }
  }, 30000);
}

// ---- Public facade ----

export const calendarApp = {
  /** Called by renderer.ts when the Calendar view becomes visible. */
  onShow(): void {
    setupUI();
    events = loadEvents();
    calendars = loadCalendars();
    loadFiredReminders();
    checkReminders();
    render();
  },

  /** True while the event editor is open on top of the calendar. */
  isEditing(): boolean {
    const modal = el("cal-event-modal");
    return !!modal && modal.style.display !== "none";
  },

  /** The calendar has no sub-view to leave, so this only closes the editor modal. */
  closeEditor(): void {
    closeEventEditor();
  },

  /** Switches the interface language. */
  setLang(next: CalLang): void {
    lang = next;
    const title = el("cal-app-title");
    if (title) title.textContent = str().appName;
    const todayBtn = el("cal-today-btn");
    if (todayBtn) todayBtn.textContent = str().today;
    const createBtn = el("cal-create-btn-label");
    if (createBtn) createBtn.textContent = str().create;
    document.querySelectorAll<HTMLElement>("#cal-view-switch [data-cal-view]").forEach((btn) => {
      const key = btn.dataset.calView as CalView;
      btn.textContent = str()[key];
    });
    const modalTitle = el("cal-event-modal-title");
    if (modalTitle) modalTitle.textContent = str().newEvent;
    const titleInput = el<HTMLInputElement>("cal-event-title");
    if (titleInput) titleInput.setAttribute("placeholder", str().addTitle);
    const saveBtn = el("cal-event-save");
    if (saveBtn) saveBtn.textContent = str().save;
    const cancelBtn = el("cal-event-cancel");
    if (cancelBtn) cancelBtn.textContent = str().cancel;
    const deleteBtn = el("cal-event-delete");
    if (deleteBtn) deleteBtn.textContent = str().delete;
    const calendarsTitle = el("cal-calendars-title");
    if (calendarsTitle) calendarsTitle.textContent = str().myCalendars;
    render();
  },
};
