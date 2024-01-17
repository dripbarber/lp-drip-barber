
export function getMonth(month = null) {
  const dayjs = useDayjs()
  let monthNomalized = month ? Math.floor(month) : Math.floor(dayjs()?.month());
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, monthNomalized, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, monthNomalized, currentMonthCount));
    });
  });
  return daysMatrix;
}
