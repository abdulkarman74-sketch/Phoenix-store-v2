export const escapeHtml = (text: string) => {
  if (!text) return '';
  return text.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

export const formatRupiah = (n: number) => {
  return 'Rp' + n.toLocaleString('id-ID');
};

export const parsePriceNumber = (priceText: string) => {
  if (!priceText) return 0;
  return parseInt(priceText.replace(/[^0-9]/g, ''), 10) || 0;
};
