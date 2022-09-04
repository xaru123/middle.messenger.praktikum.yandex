export function formatterDate(date: string | null): string | null {
  if (!date) {
    return null;
  }
  const dateNew = new Date(date);
  const now = new Date();
  const listMonths = ['янв', 'фев', 'мар', 'апр', 'мая', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
  const month = listMonths[dateNew.getMonth()];
  const day = dateNew.getDate();
  const hours = dateNew.getHours() as number;
  const formatterHours = hours >= 10 ? hours : `0${hours}`;
  const minutes = dateNew.getMinutes() as number;
  const formatterMinutes = minutes >= 10 ? minutes : `0${minutes}`;
  const time = `${formatterHours}:${formatterMinutes}`;
  let dateString = `${day} ${month}, ${time}`;

  if (now.getDate() - day < 1) {
    dateString = time;
  }

  return dateString;
}
