import {
  format,
  addYears,
  addMonths,
  addDays,
  subYears,
  subMonths,
  subDays,
} from "date-fns";
import { ja } from "date-fns/locale";
import {
  FormatDate,
  GetNextYear,
  GetNextMonth,
  GetNextWeek,
  GetNextDate,
  GetPrevYear,
  GetPrevMonth,
  GetPrevWeek,
  GetPrevDate,
} from "./types/date";

export const formatDate: FormatDate = (date, formatRule) => {
  return format(date, formatRule, { locale: ja })
}

export const getNextYear: GetNextDate = (date) => {
  return addYears(date, 1);
};

export const getNextMonth: GetNextMonth = (date) => {
  return addMonths(date, 1);
};

export const getNextWeek: GetNextWeek = (date) => {
  return addDays(date, 7);
}

export const getNextDate: GetNextYear = (date) => {
  return addDays(date, 1);
};

export const getPrevYear: GetPrevYear = (date) => {
  return subYears(date, 1);
};

export const getPrevMonth: GetPrevMonth = (date) => {
  return subMonths(date, 1);
};

export const getPrevWeek: GetPrevWeek = (date) => {
  return subDays(date, 7);
}

export const getPrevDate: GetPrevDate = (date) => {
  return subDays(date, 1)
}