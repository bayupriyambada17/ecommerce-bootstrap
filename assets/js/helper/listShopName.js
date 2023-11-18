export const listShopName = (shopName) => {
  const lowercaseKey = shopName.toLowerCase().replace(/ /g, '-');
  return `
  <option value="${lowercaseKey}">${shopName}</option>
  `
}