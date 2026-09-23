/* ============================================================
   SHOPIFY WIRING — the ONLY file you need to edit.
   ============================================================

   Fill in `domain` and the numeric variant IDs below, then the
   storefront checkout goes live. Nothing else needs to change.

   The access token is OPTIONAL. With just a domain + variant IDs
   the site uses Shopify cart permalinks, which need no API app,
   no token, and no scopes. Add a token only if you later want
   the Storefront Cart API path (see SHOPIFY-SETUP.md).

   Where to find variant IDs:
     Shopify Admin > Products > (a product) > click a variant.
     The URL ends in .../variants/44123456789012
                                  ^^^^^^^^^^^^^^ that number.
     Full gid://shopify/ProductVariant/44123456789012 also works.
   ============================================================ */

window.SHOPIFY_CONFIG = {

  // e.g. 'milon-barebells.myshopify.com'  (no https://, no trailing slash)
  domain: '',

  // OPTIONAL — Storefront API access token. Leave '' to use permalinks.
  storefrontAccessToken: '',

  // Only used when storefrontAccessToken is set.
  apiVersion: '2026-01',

  // One entry per flavor. `bar` = the "Single Bar" variant,
  // `box` = the "Box of 12" variant. Leave a value '' to hide
  // that buying option for that flavor.
  variants: {
    'choco-dough':        { bar: '', box: '' },
    'salty-peanut':       { bar: '', box: '' },
    'white-choco-almond': { bar: '', box: '' },
    'caramel-cashew':     { bar: '', box: '' },
    'cookies-cream':      { bar: '', box: '' },
    'hazelnut-nougat':    { bar: '', box: '' },
    'coconut-choco':      { bar: '', box: '' },
    'creme-crisp':        { bar: '', box: '' },
  },

  // Where the mailto fallback goes when Shopify isn't configured yet.
  fallbackEmail: 'hi@milonstudio.com',
};
