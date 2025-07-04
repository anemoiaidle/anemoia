export function formatNumber(num) {
   if (typeof num !== 'number' || isNaN(num)) return '-';

   const units = [
      { value: 1e33, symbol: 'Dc' },   // Decillion
      { value: 1e30, symbol: 'No' },   // Nonillion
      { value: 1e27, symbol: 'Oc' },   // Octillion
      { value: 1e24, symbol: 'Sp' },   // Septillion
      { value: 1e21, symbol: 'Sx' },   // Sextillion
      { value: 1e18, symbol: 'Qi' },   // Quintillion
      { value: 1e15, symbol: 'Q' },    // Quadrillion
      { value: 1e12, symbol: 'T' },    // Trillion
      { value: 1e9,  symbol: 'B' },    // Billion
      { value: 1e6,  symbol: 'M' },    // Million
      { value: 1,   symbol: '' },      // No suffix
   ];

   const absNum = Math.abs(num);

   if (absNum < 1) {
      return num.toFixed(2);
   }
   
   for (const unit of units) {
      if (absNum >= unit.value) {
      const scaled = num / unit.value;

      let formatted;
      if (scaled < 10) {
         formatted = scaled.toFixed(2);
      } else if (scaled < 100) {
         formatted = scaled.toFixed(2); 
      } else {
         formatted = scaled.toFixed(2); 
      }

      return `${formatted} ${unit.symbol}`;
      }
   }

   if (absNum < 1_000_000) {
    return Math.round(num).toLocaleString();
  }

   return num.toString();
}
