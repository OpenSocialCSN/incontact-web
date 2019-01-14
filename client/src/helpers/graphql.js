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
    });
};

export const getUserById = userId => {
  const query = `
  query GetUserById {
    user(_id:"5c3cd65a8474e01b17a8101d"){
      _id
      createdAt
      firstName
      lastName
      email
      contacts {
        _id
        email
        firstName
        lastName
        displayName
        workPhone
        homePhone
      }
    }
  }`;

  return executeQuery(query).catch(errors => console.log("errs:", errors));
};
