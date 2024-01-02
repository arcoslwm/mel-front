import { URLSearchParams } from "url";

const MIDDLE_API_BASE_URL = process.env.MIDDLE_API_BASE_URL
// adapter para crear el modelo y pasarlo a los componentes (?)

export async function getItem(id: string) {
  const res = await fetch(`${MIDDLE_API_BASE_URL}/items/${id}`);

  const itemDesc = await res.json();
  if (!res.ok && res.status === 404) {
    return null;
  }
  return itemDesc;
}
  
  export async function searchItems(searchQuery:string) {
    const res = await fetch(`${MIDDLE_API_BASE_URL}/items?${ new URLSearchParams({search: searchQuery,limit: "4"})}`);

    const searchResult = await res.json();
    return searchResult;
  }