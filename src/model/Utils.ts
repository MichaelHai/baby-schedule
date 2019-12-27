import {DateAndTime} from '@/model/index';

export function toSelectOptions<T>(values: Array<string>, nameMap: { [key: string]: string }): Array<{ text: string, value: T }> {
  return values.map((key) => {
    return {
      text: nameMap[key],
      value: key as unknown as T,
    };
  });
}

function leadingZero(value: number): string {
  return ('00' + value).slice(-2);
}

export function currentDateAndTime(): DateAndTime {
  const date = new Date();
  return {
    date: `${(date.getFullYear())}-${leadingZero(date.getMonth() + 1)}-${leadingZero(date.getDate())}`,
    time: `${leadingZero(date.getHours())}:${leadingZero(date.getMinutes())}`,
  };
}

export function createDate(dateStr: string, timeStr: string): Date {
  const date: Date = new Date();
  const dateSplitted: Array<string> = dateStr.split('-');
  date.setFullYear(Number(dateSplitted[0]));
  date.setMonth(Number(dateSplitted[1]) - 1);
  date.setDate(Number(dateSplitted[2]));

  const timeSplitted: Array<string> = timeStr.split(':');
  date.setHours(Number(timeSplitted[0]));
  date.setMinutes(Number(timeSplitted[1]));
  return date;
}
