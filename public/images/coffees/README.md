# Furks coffee artwork

The eight supplied PNGs are preserved without edits. The full reference cards
are never rendered as product cards: all names, prices, notes, origins, roast
levels and stock states are HTML populated from `public.products`.

`lib/products/presentation.ts` maps the existing product IDs to circular
viewports in these sources. `ImageViewport` preserves the source aspect ratio
and uses `next/image`; CSS reveals only the selected art region. This also
reuses small ingredient photos for the live tasting-note labels. The last
three circular coffees share one source file, avoiding three duplicate copies.

| Product ID | Artwork                                                      |
| ---------- | ------------------------------------------------------------ |
| 1          | moda-blend.png                                               |
| 2          | etiyopya-yirgacheffe.png                                     |
| 3          | kolombiya-huila-source.png, right-hand circle                |
| 4          | kenya-nyeri-aa-source.png, right-hand circle                 |
| 5          | guatemala-antigua-source.png, right-hand circle              |
| 6          | brezilya-espresso-kafeinsiz-source.png, bottom-left circle   |
| 7          | brezilya-espresso-kafeinsiz-source.png, bottom-middle circle |
| 8          | brezilya-espresso-kafeinsiz-source.png, bottom-right circle  |

The two `*-reference.png` files provide the Moda/Ethiopia visual references
and their ingredient photos. Unknown products or new tasting notes receive a
neutral illustration, not another product's picture.

The current schema has no description, package-weight, slug or image columns.
The short description is composed from the live origin, roast and notes;
250 g remains the site's existing package size. No database migration is needed.
