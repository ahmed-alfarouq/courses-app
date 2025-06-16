const formatDate = (date: string) => {
  const longDate: Intl.DateTimeFormatOptions = {
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const shortDate: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formattedLongDate: string = new Date(date).toLocaleString(
    "en-US",
    longDate
  );

  const formattedShortDate: string = new Date(date).toLocaleString(
    "en-US",
    shortDate
  );

  return {
    longDate: formattedLongDate,
    shortDate: formattedShortDate,
  };
};

export default formatDate;
