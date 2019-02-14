export const executeQuery = query => {
  return fetch("/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
      query
    })
  })
    .then(r => r.json())
    .then(res => {
      return new Promise((resolve, reject) => {
        if (res.errors) {
          reject(res.errors);
        } else {
          resolve(res.data);
        }
      });
    })
    .catch(errors => console.log("errs:", errors));
};

export const generateArgs = updateObject => {
  let args = ``;
  const keys = Object.keys(updateObject);
  keys.forEach((key, i) => {
    let value = updateObject[key];
    value = value === "" ? null : value;

    if (typeof value === "string" && key !== "syncStatus") {
      // syncStatus is an enum, do not wrap in quotes
      value = `${value}` // triple quotes allows line breaks
    }
    args += `${key}:${value}${i < keys.length - 1 ? `, ` : ``}`;
  });

  return args;
};
