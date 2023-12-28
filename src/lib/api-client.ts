const MIDDLE_API_HOST = process.env.MIDDLE_API_HOST


export async function getItem(id: string) {
    console.debug("apiClient getItem id:", id);
    // const res = await fetch('https://api.mercadolibre.com/items/' + id + '/description');
    const res = await fetch(`${MIDDLE_API_HOST}/items/${id}/description`);
    const itemDesc = await res.json();
    console.debug("RETURN apiClient getItem:",itemDesc);
    // return null;
    return itemDesc;
  }
  