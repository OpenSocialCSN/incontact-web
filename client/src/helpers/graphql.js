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
      user(_id:"${userId}"){
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
          workPhone
          homePhone
        }
      }
    }`;

  return executeQuery(query).catch(errors => console.log("errs:", errors));
};

export const createContact = contact => {
  if (!contact) throw new Error("Bad arg @ createContact:", contact);
  const userId = "5c3cd65a8474e01b17a8101d"; //TODO:

  const args = `userId:"${userId}", ${generateArgs(contact)}`;
  const query = `
    mutation CreateContact {
      createContact(${args}){
        _id
      }
    }`;

  return executeQuery(query).catch(errors => console.log("errs:", errors));
};

export const updateContact = contact => {
  if (!contact || !contact._id)
    throw new Error("Bad arg @ updateContact:", contact);
  const args = generateArgs(contact);

  const query = `
    mutation UpdateContact {
      updateContact(${args}){
        _id
      }
    }`;

  return executeQuery(query).catch(errors => console.log("errs:", errors));
};

const generateArgs = updateObject => {
  let args = ``;
  const keys = Object.keys(updateObject);
  keys.forEach((key, i) => {
    let value = updateObject[key];
    value = value === "" ? null : value;
    if (typeof value === "string") {
      value = `"${value}"`;
    }
    args += `${key}:${value}${i < keys.length - 1 ? `, ` : ``}`;
  });

  return args;
};
