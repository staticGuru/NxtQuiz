export const findOptionByValue = (options, value) => {
  return options ? options.find((option) => option.value === value) : null;
};

export const mapCountryData = (data) => {
  return data.map((country) => ({
    value: country.countryCode,
    label: country.countryName,
  }));
};
