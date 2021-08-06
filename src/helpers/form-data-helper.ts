const getFormData = (object: any) => {
  const formData = new FormData();
  const days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
  ];
  Object.keys(object).forEach((key) => {
    const value = days.includes(key)
      ? JSON.stringify(object[key])
      : object[key];
    formData.append(key, value);
  });
  return formData;
};

export { getFormData };
