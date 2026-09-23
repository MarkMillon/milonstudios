# Wiring the storefront to Shopify

Everything on the site is done. What's left is the part that needs your
identity: creating the merchant account. Budget ~10 minutes total.

The page needs **two** things — a domain and variant IDs. It does **not**
need a Storefront API token or an API app, because checkout uses Shopify
cart permalinks by default. The token is an optional upgrade (step 6).

---

## 1. Create the store — 4 min (only you can do this)

Go to <https://shopify.com> and start the trial. Store name: `milon-barebells`
(or anything — it just sets your `.myshopify.com` subdomain).

Note the domain it gives you, e.g. `milon-barebells.myshopify.com`.

> **Trial limitation:** trial stores can't take *real* payments until you
> pick a plan. Everything below works on the trial — the cart, the tier
> discounts, the redirect into Shopify checkout — you just can't collect
> money until you're on a paid plan. For showing manufacturers a working
> storefront, the trial is enough.

## 2. Import the products — 30 sec

**Products → Import → Add file →** `barebells-shopify-products.csv`
(sitting next to this file) **→ Upload and continue.**

That creates all 8 flavors, each with two variants:

| Variant | SKU pattern | Price |
|---|---|---|
| Single Bar | `BB-*-1` | $3.29 |
| Box of 12 | `BB-*-12` | $35.88 |

Inventory tracking is off, so nothing shows as out of stock. Turn it on
later if you want real stock counts.

> ### Check the preview before you confirm
>
> Shopify has two generations of CSV column names and the importer
> **silently ignores columns it doesn't recognise** — so a mismatch
> doesn't throw an error, it imports products with no price and no SKU.
> There are two files here for that reason:
>
> | File | Header style |
> |---|---|
> | `barebells-shopify-products.csv` | legacy — `Handle`, `Body (HTML)`, `Variant Price` |
> | `barebells-shopify-products-newformat.csv` | current docs — `URL handle`, `Description`, `Price` |
>
> On the import preview screen, confirm you see **$3.29** and **$35.88**
> against the variants. If prices are blank or $0.00, cancel the import
> and upload the other file instead. Both produce identical products.
>
> If a partial import already went through: **Products → select all →
> Delete**, then re-import with the other file.

## 3. Create the volume discounts — 2 min

Box price is set to the 1–4 tier ($35.88). The deeper tiers on the page are
enforced by three **automatic discounts**. These are fixed amounts, not
percentages, so they land exactly on the advertised numbers.

**Discounts → Create discount → Amount off products → Automatic discount.**
For each row: set *Applies to* → **Specific collections/products** → select
all 8 Barebells products; set *Minimum purchase requirement* → **Minimum
quantity of items**.

| Name | Discount | Min quantity | Resulting box price | Per bar |
|---|---|---|---|---|
| Bulk 5+ boxes | $3.60 off each | 5 | $32.28 | $2.69 |
| Bulk 20+ boxes | $7.20 off each | 20 | $28.68 | $2.39 |
| Bulk 50+ boxes | $10.80 off each | 50 | $25.08 | $2.09 |

> Scope each discount to the **Box of 12** variants only, so single bars
> don't get box pricing. Shopify applies the single best-matching automatic
> discount, so the three tiers won't stack.

## 4. Get the variant IDs — 1 min

Open your storefront in a browser, open the console (Cmd+Option+J), and
paste the contents of `get-variant-ids.js`. It prints a finished `variants:`
block ready to paste.

Manual fallback: **Products → (product) → click a variant.** The URL ends in
`/variants/44123456789012` — that trailing number is the ID.

## 5. Fill in `shopify-config.js` — 30 sec

```js
domain: 'milon-barebells.myshopify.com',
variants: {
  'choco-dough': { bar: '44111111111111', box: '44222222222222' },
  ...
}
```

Both plain numeric IDs and full `gid://shopify/ProductVariant/...` strings
work. Deploy. Checkout is live — the cart now redirects into real Shopify
checkout with the right line items.

## 6. Optional — Storefront API token

Only worth it if you later want cart state to live on Shopify's side rather
than in the browser. **Settings → Apps and sales channels → Develop apps →
Create an app → Configure Storefront API scopes →** check
`unauthenticated_read_product_listings` and `unauthenticated_write_checkouts`
**→ Install app → Reveal token.**

Paste it into `storefrontAccessToken` in `shopify-config.js`. The page will
use the Storefront Cart API and fall back to permalinks automatically if the
call fails, so adding it can't break checkout.

---

## How the page behaves at each stage

| State | Checkout button does |
|---|---|
| Nothing configured | "Request Invoice" — opens an itemised order email |
| Domain + variant IDs | Redirects to Shopify checkout via cart permalink |
| ...plus a token | Creates a Shopify cart, redirects to its `checkoutUrl` |

Partially-filled configs degrade cleanly: a flavor with no `box` ID simply
has that buying option greyed out.

---

## One thing to sort out before showing manufacturers

The page currently states **"Authorized Retailer"** and **"sourced directly
through authorized distribution channels"**, and uses the Barebells name and
brand styling throughout. If the authorization isn't in place yet, that's
worth correcting before this goes in front of Barebells' manufacturer or any
distributor — an unbacked authorization claim is the kind of thing that ends
a wholesale conversation early. Say the word and I'll reword those sections
to "independent reseller" framing, which reads fine for a bulk inquiry.
