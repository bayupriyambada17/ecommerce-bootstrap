export const urlApi = 'https://bootcamp-api.bayupriyambada.repl.co/api/v1/productsApi.json'

function formatRp(input) {
  if (input) {
    // Remove non-numeric characters
    let value = input.value.replace(/\D/g, '');

    // Convert to a BigInt and then to a string to handle large numbers
    value = BigInt(value).toLocaleString('id-ID');

    // Format as Rupiah currency
    value = value;

    // Update the input value
    input.value = value;
  }
}

formatRp();