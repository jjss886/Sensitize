export const csvJSON = csv => {
  const lines = csv.split("\n"),
    result = [],
    headers = lines[0].split(",");

  for (var i = 1; i < lines.length; i++) {
    const obj = {},
      currentline = lines[i].split(",");

    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentline[j];
    }
    result.push(obj);
  }

  return JSON.stringify(result);
};
