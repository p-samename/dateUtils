import {
  addDays,
  differenceInCalendarDays,
  endOfMonth,
  format,
  formatDuration,
  intervalToDuration,
  isAfter,
  isBefore,
  isMatch,
  setDefaultOptions,
} from "date-fns";
import { ko } from "date-fns/locale";

// date-fns 기본 로컬 값 설정
setDefaultOptions({ locale: ko });

class DateUtils {
  defaultFormatRegExp: RegExp;
  defaultFormat: string;

  constructor() {
    this.defaultFormatRegExp = /^\d{4}-\d{2}-\d{2}$/;
    this.defaultFormat = "yyyy-MM-dd";
  }

  // baseDate의 형식이 defaultFormat과 일치하는지 체크
  isDateFormat(baseDate: string): boolean {
    if (
      this.defaultFormatRegExp.test(baseDate) &&
      isMatch(baseDate, this.defaultFormat)
    ) {
      return true;
    }

    console.error(`${baseDate}는 날짜형식이 아닙니다.`);
    return false;
  }

  // 날짜를 format 형식으로 반환
  dateForm(date: Date | string, formatType = this.defaultFormat): string {
    return format(date, formatType);
  }

  // 오늘 날짜를 반환
  today(): Date {
    return new Date();
  }

  // startDate 와 endDate의 날짜의 차이를 일수로 반환
  distanceDate(startDate: Date | string, endDate: Date | string): number {
    return Math.abs(differenceInCalendarDays(startDate, endDate));
  }

  // 몇 일 뒤의 날짜
  dayAfter(baseDateOrDurations: Date | number, durations: number = 1): Date {
    if (typeof baseDateOrDurations === "number") {
      return addDays(new Date(), baseDateOrDurations);
    } else {
      return addDays(baseDateOrDurations, durations);
    }
  }

  // baseDate가 targetDate의 이후인지 판별
  isAfterDate(baseDate: Date | string, targetDate: Date | string): boolean {
    return isAfter(baseDate, targetDate);
  }

  // baseDate가 targetDate의 이전인지 판별
  isBeforeDate(baseDate: Date | string, targetDate: Date | string): boolean {
    return isBefore(baseDate, targetDate);
  }

  // baseDate부터 targetDate까지 남은 시간(?년 ?일 ?시 ?분 ?초)을 반환
  remainFullTime(baseDate: Date | string, targetDate: Date | string): string {
    // start 부터 end 까지의 남은 시간을 반환 0인 값은 반환하지않음 - 초 까지 반환
    const { years, months, days, hours, minutes, seconds } = intervalToDuration(
      {
        start: baseDate,
        end: targetDate,
      }
    );

    const convertRemainTime = formatDuration({
      years: years,
      months: months,
      days: days,
      hours: hours,
      minutes: minutes,
      seconds: seconds,
    });
    return convertRemainTime;
  }

  // baseDate가 해당하는 달의 마지막 일자를 구함
  endDateOfMonth(baseDate: Date | string) {
    return endOfMonth(baseDate);
  }
}

const dateUtils: DateUtils = new DateUtils();

export default dateUtils;
