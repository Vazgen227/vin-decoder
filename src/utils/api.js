async function decodeVIN(vin) {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/decodevin/${vin}?format=json`,
  );
  const data = await response.json();
  return data;
}

async function getVariablesList() {
  const response = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/getvehiclevariablelist?format=json`,
  );
  const data = await response.json();
  return data;
}

export { decodeVIN, getVariablesList };
