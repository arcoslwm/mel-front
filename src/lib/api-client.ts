import { URLSearchParams } from "url";

const MIDDLE_API_BASE_URL = process.env.MIDDLE_API_BASE_URL
// adapter para crear el modelo y pasarlo a los componentes (?)

export async function getItem(id: string) {
  console.debug("apiClient getItem id:", id);
  const res = await fetch(`${MIDDLE_API_BASE_URL}/items/${id}`);

  const itemDesc = await res.json();
  if (!res.ok && res.status === 404) {
    return null;
  }
  return itemDesc;
}
  
  export async function searchItems(searchQuery:string) {
    console.debug("apiClient searchItems searchQuery:", searchQuery);
    const res = await fetch(`${MIDDLE_API_BASE_URL}/items?${ new URLSearchParams({search: searchQuery,limit: "4"})}`);

    console.debug("apiClient search Response:OK",res.ok);
    console.debug("apiClient search Response:status",res.status);
    const searchResult = await res.json();
    console.debug("apiClient searchResult:",searchResult);
    // if (!res.ok && res.status === 404) {
    //   return null;
    // }
    return searchResult;
  }