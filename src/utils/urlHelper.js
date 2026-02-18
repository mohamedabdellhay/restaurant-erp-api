/**
 * Helper function to append BASE_URL to file paths
 */
export const appendBaseUrl = (path) => {
  if (!path) return path;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  
  const baseUrl = process.env.BASE_URL || "";
  // Ensure we don't have double slashes if path starts with /
  const sanitizedPath = path.startsWith("/") ? path : `/${path}`;
  
  return `${baseUrl}${sanitizedPath}`;
};

/**
 * Helper function to append BASE_URL to an array of objects with an image field
 */
export const appendBaseUrlToItems = (items, imageField = "image") => {
  if (!items) return items;
  
  const isArray = Array.isArray(items);
  const itemsList = isArray ? items : [items];
  
  const mappedItems = itemsList.map(item => {
    const itemObj = item.toObject ? item.toObject() : item;
    if (itemObj[imageField]) {
      itemObj[imageField] = appendBaseUrl(itemObj[imageField]);
    }
    return itemObj;
  });
  
  return isArray ? mappedItems : mappedItems[0];
};

/**
 * Helper function to remove BASE_URL from file paths before saving to DB
 */
export const removeBaseUrl = (url) => {
  if (!url) return url;
  const baseUrl = process.env.BASE_URL;
  if (baseUrl && url.startsWith(baseUrl)) {
    return url.replace(baseUrl, "");
  }
  return url;
};

/**
 * Helper function to remove BASE_URL from an item's image field before saving
 */
export const removeBaseUrlFromItem = (item, imageField = "image") => {
  if (!item || !item[imageField]) return item;
  
  const newItem = { ...item };
  newItem[imageField] = removeBaseUrl(newItem[imageField]);
  return newItem;
};
