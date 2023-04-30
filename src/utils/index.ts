export const convertFormatDate = (dateInString: string) => {
  const date = new Date(dateInString);

  const yyyy = date.getFullYear();
  const mm = date.getMonth() + 1; // Months start at 0!
  const dd = date.getDate();
  const hh = date.getHours();
  const mimi = date.getMinutes();

  let ddInText = dd.toString();
  let mmInText = mm.toString();
  let hhInText = hh.toString();
  let mimiInText = mimi.toString();

  if (dd < 10) {
    ddInText = `0${ddInText}`;
  }
  if (mm < 10) {
    mmInText = `0${mmInText}`;
  }
  if (hh < 10) {
    hhInText = `0${hhInText}`;
  }
  if (mimi < 10) {
    mimiInText = `0${mimiInText}`;
  }

  const formattedDate = `${yyyy}-${mmInText}-${ddInText}`;

  const hourMinute = `${hhInText}:${mimiInText}`;

  return { dd, mm, yyyy, formattedDate, hourMinute };
};
