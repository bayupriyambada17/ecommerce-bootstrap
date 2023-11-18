export const getCategoryProd = (category) => {
  const lowercaseKey = category.toLowerCase().replace(/ /g, '-');
  const dataList = `<option value="${lowercaseKey}">${category}</option>`;
  return dataList;
}