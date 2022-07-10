import directus from "./directus";

// Items

export const getAll = async (item) => {
  return directus
    .items(item)
    .readByQuery({ limit: -1, fields: ["*.*"] })
    .then((response) => response.data)
    .catch((error) => error);
};

export const getAllBy = async (item, query) => {
  return directus
    .items(item)
    .readByQuery(query)
    .then((response) => response)
    .catch((error) => error);
};

export const find = async (item, id) => {
  return await directus
    .items(item)
    .readOne(id, {
      fields: ["*.*"],
    })
    .then((response) => response)
    .catch((error) => error);
};

export const createItem = async (item, object) => {
  return await directus.items(item).createOne(object);
};

export const deleteItem = async (item, id) => {
  return await directus.items(item).deleteOne(id);
};

export const update = async (item, id) => {
  return await directus.items(item).updateOne(id);
};
