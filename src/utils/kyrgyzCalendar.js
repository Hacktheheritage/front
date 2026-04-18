import dayjs from "dayjs";
import { mucholYears } from "../data/mucholYears";

export const kyrgyzMonths = [
  { name: "Бирдин айы", start: "01-15", end: "02-18" },
  { name: "Жалган куран", start: "02-19", end: "03-16" },
  { name: "Чын куран", start: "03-17", end: "04-14" },
  { name: "Бугу", start: "04-15", end: "05-14" },
  { name: "Кулжа", start: "05-15", end: "06-13" },
  { name: "Теке", start: "06-14", end: "07-13" },
  { name: "Баш оона", start: "07-14", end: "08-12" },
  { name: "Аяк оона", start: "08-13", end: "09-11" },
  { name: "Тогуздун айы", start: "09-12", end: "10-11" },
  { name: "Жетинин айы", start: "10-12", end: "11-10" },
  { name: "Бештин айы", start: "11-11", end: "12-10" },
  { name: "Үчтүн айы", start: "12-11", end: "01-14" },
];

const monthNames = [
  "январь",
  "февраль",
  "март",
  "апрель",
  "май",
  "июнь",
  "июль",
  "август",
  "сентябрь",
  "октябрь",
  "ноябрь",
  "декабрь",
];

const formatDayMonth = (value) => `${value.date()}-${monthNames[value.month()]}`;
const formatRange = (start, end) => `${formatDayMonth(start)}дан ${formatDayMonth(end)}ка чейин`;

const resolveMonthRange = (date, entry) => {
  const year = date.year();
  const [sMonth, sDay] = entry.start.split("-").map(Number);
  const [eMonth, eDay] = entry.end.split("-").map(Number);

  let start = dayjs(new Date(year, sMonth - 1, sDay));
  let end = dayjs(new Date(year, eMonth - 1, eDay));

  if (eMonth < sMonth) {
    if (date.month() + 1 <= eMonth) {
      start = start.subtract(1, "year");
    } else {
      end = end.add(1, "year");
    }
  }

  return { start, end };
};

export function getKyrgyzDate(inputDate) {
  const date = dayjs(inputDate);
  const match = kyrgyzMonths.find((item) => {
    const { start, end } = resolveMonthRange(date, item);
    return date.isAfter(start.subtract(1, "day")) && date.isBefore(end.add(1, "day"));
  });

  const monthInfo = match || kyrgyzMonths[0];
  const { start, end } = resolveMonthRange(date, monthInfo);

  const animalIndex = ((date.year() - 2020) % 12 + 12) % 12;
  const muchol = mucholYears[animalIndex];

  return {
    month: monthInfo.name,
    range: formatRange(start, end),
    rangeStart: start,
    rangeEnd: end,
    muchol,
  };
}
