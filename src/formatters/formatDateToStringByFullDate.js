const formatDateToStringByFullDate = (date) => {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timezone: 'UTC',
  };
  const dateString = date.toLocaleString('ru', options);
  return dateString.slice(0, -3);
};

export default formatDateToStringByFullDate;
