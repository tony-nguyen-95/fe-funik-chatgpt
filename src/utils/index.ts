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

export function getContactType(num: Number) {
  switch (num) {
    case 1:
      return 'Zalo';
    case 2:
      return 'Discord';
    case 3:
      return 'Facebook';
    case 4:
      return 'Email';
    case 5:
      return 'Viber';
    case 6:
      return 'Telegram';
    case 7:
      return 'Skype';
    case 8:
      return 'PhoneNumber';
    case 99:
      return 'Khác';
    default:
      return 'Chưa cập nhật';
  }
}

export function getStatus(num: Number) {
  switch (num) {
    case 1:
      return 'Mới';
    case 2:
      return 'Đang học';
    case 3:
      return 'Tạm dừng';
    case 4:
      return 'Bảo Lưu';
    case 5:
      return 'Hoàn Thành';
    default:
      return 'Chưa cập nhật';
  }
}
