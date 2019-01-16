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
          homeEmail
          workEmail
          firstName
          lastName
          workPhone
          homePhone
          homeAddress
          workAddress
          imageUrl
          social {
            linkedin
            facebook
            skype
            instagram
            twitter
            webpage
          }
        }
      }
    }`;

  return executeQuery(query);
};

export const createUser = (email, password) => {
  if (!email) throw new Error("Bad args @ createUser");

  const args = `email:"${email}"`;
  const query = `
    mutation CreateUser {
      createUser(${args}){
        _id
      }
    }`;

  return executeQuery(query);
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

  return executeQuery(query);
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

  return executeQuery(query);
};

export const deleteContactById = contactId => {
  if (!contactId) throw new Error("No id passed @ deleteContact");

  const query = `
    mutation DeleteContact{
      deleteContact(_id:"${contactId}")
    }`;

  return executeQuery(query);
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
