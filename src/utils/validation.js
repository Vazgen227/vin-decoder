function validateVin(vin) {
  if (!vin) {
    return "Введіть VIN";
  }
  if (vin.lenght > 17) {
    return "VIN має містити 17 символів";
  }

  const regex = /^[A-HJ-NPR-Z0-9]+$/;

  if (!regex.test(vin.toUpperCase())) {
    return "VIN містить недопустимі символи";
  }
}

export { validateVin };
