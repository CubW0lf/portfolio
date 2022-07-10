import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

const { url } = publicRuntimeConfig;

const getAssetURL = (id) => {
  if (!id) return null;
  return `${url}/assets/${id}`;
};

export default getAssetURL;
