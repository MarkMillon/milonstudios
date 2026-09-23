/* ============================================================
   VARIANT ID GRABBER
   ============================================================
   Skips clicking through 16 variants by hand.

   1. Open your store in a browser:  https://YOUR-STORE.myshopify.com
      (If the storefront is password-protected, either enter the
       password first, or temporarily turn it off under
       Online Store > Preferences > Restrict store access.)
   2. Open DevTools (Cmd+Option+J) > Console.
   3. Paste this entire file, press Enter.
   4. Copy the printed block into shopify-config.js, replacing
      the existing `variants: { ... }` block.
   ============================================================ */

(async () => {
  // Shopify product handle  ->  storefront product id (from index.html)
  const HANDLE_TO_KEY = {
    'barebells-chocolate-dough':        'choco-dough',
    'barebells-salty-peanut':           'salty-peanut',
    'barebells-white-chocolate-almond': 'white-choco-almond',
    'barebells-caramel-cashew':         'caramel-cashew',
    'barebells-cookies-and-cream':      'cookies-cream',
    'barebells-hazelnut-nougat':        'hazelnut-nougat',
    'barebells-coconut-chocolate':      'coconut-choco',
    'barebells-white-salty-peanut':     'creme-crisp',
  };

  let products = [];
  try {
    const res = await fetch('/products.json?limit=250');
    if (!res.ok) throw new Error('HTTP ' + res.status);
    products = (await res.json()).products || [];
  } catch (e) {
    console.error('Could not read /products.json —', e.message);
    console.error('Is the storefront password-protected? Enter the password first, then retry.');
    return;
  }

  const missing = [];
  const rows = Object.entries(HANDLE_TO_KEY).map(([handle, key]) => {
    const product = products.find(p => p.handle === handle);
    if (!product) { missing.push(handle); return `    '${key}':`.padEnd(28) + `{ bar: '', box: '' },`; }

    const bar = product.variants.find(v => /single/i.test(v.title));
    const box = product.variants.find(v => /box/i.test(v.title));
    if (!bar) missing.push(handle + ' (Single Bar variant)');
    if (!box) missing.push(handle + ' (Box of 12 variant)');

    return `    '${key}':`.padEnd(28) +
           `{ bar: '${bar ? bar.id : ''}', box: '${box ? box.id : ''}' },`;
  });

  console.log('\n  variants: {\n' + rows.join('\n') + '\n  },\n');
  console.log('Domain to use:  ' + location.host);

  if (missing.length) {
    console.warn('Not found (left blank — check the product/variant names):');
    missing.forEach(m => console.warn('  - ' + m));
  } else {
    console.log('All 8 products and 16 variants found.');
  }
})();
