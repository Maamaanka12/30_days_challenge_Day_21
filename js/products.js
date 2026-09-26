/* Catalogue data · source: warafragrance.com/products.json (read 2026-09-26)
 * Prices are the store's listed USD prices. Images are the store's own product
 * photography, served from its Shopify CDN. No size, volume or ingredient claim
 * is made here that the store does not itself make.
 */

const IMG = 'https://cdn.shopify.com/s/files/1/0695/7524/6037/files/';
const CARD_SIZE = '&width=900';

export const PRODUCTS = [
  {
    id: 'moonbeam-smoky',
    name: 'Moonbeam Smoky',
    price: 46,
    cat: 'unisex',
    family: 'Oriental woody',
    img: 'SmokeyWara.jpg?v=1766142683',
    blurb: 'Sicilian bergamot and pink pepper over oud, leather and vetiver.',
    notes: ['Sicilian bergamot', 'Pink pepper', 'Oud', 'White amber', 'Leather', 'Vetiver']
  },
  {
    id: 'moonbeam-rouge',
    name: 'Moonbeam Rouge',
    price: 46,
    cat: 'her',
    family: 'Oriental ambery',
    img: 'Moon_beam_Rouge_1.jpg?v=1756305578',
    blurb: 'Incense with raspberry and apricot, drying into tonka and amberwood.',
    notes: ['Incense', 'Raspberry', 'Apricot', 'Cotton candy', 'Sandalwood', 'Tonka bean']
  },
  {
    id: 'moonbeam-empire',
    name: 'Moonbeam Empire',
    price: 35,
    cat: 'unisex',
    family: 'Woody floral',
    img: 'Empire_Black_Wara.jpg?v=1766142361',
    blurb: 'Bergamot and luminous orange blossom grounded by patchouli.',
    notes: ['Bergamot', 'Orange blossom', 'Ambrofix', 'Patchouli']
  },
  {
    id: 'moonbeam-blush',
    name: 'Moonbeam Blush',
    price: 35,
    cat: 'her',
    family: 'Gourmand',
    img: 'BlushWara.jpg?v=1766142636',
    blurb: 'Pistachio gelato and hazelnut softening into peach, jasmine and tonka.',
    notes: ['Pistachio gelato', 'Hazelnut', 'Rum', 'White peach', 'Jasmine', 'Tonka bean']
  },
  {
    id: 'light-orchid',
    name: 'Light Orchid for Men',
    price: 34,
    cat: 'him',
    family: 'Aquatic',
    img: 'Orchid2.png?v=1744973388',
    blurb: 'Mandarin and petitgrain with orchid, lavender, amber and cedarwood.',
    notes: ['Mandarin', 'Petitgrain', 'Orchid', 'Lavender', 'Amber', 'Cedarwood']
  },
  {
    id: 'sidra',
    name: 'Sidra',
    price: 32,
    cat: 'unisex',
    family: 'Fruity floral',
    img: 'Sidra1.jpg?v=1744973812',
    blurb: 'Juicy fruit meeting tuberose and jasmine on patchouli and cedar.',
    notes: ['Juicy fruit', 'Tuberose', 'Jasmine', 'Patchouli', 'Cedar', 'Musk']
  },
  {
    id: 'yasir',
    name: 'Yasir',
    price: 32,
    cat: 'unisex',
    family: 'Floral oriental',
    img: 'Yasir.jpg?v=1744973942',
    blurb: 'Rare orchid and dark fruits deepening into sandalwood and vanilla.',
    notes: ['Rare orchid', 'Dark fruits', 'Warm spice', 'Patchouli', 'Sandalwood', 'Vanilla']
  },
  {
    id: 'gentle-one',
    name: 'Gentle One',
    price: 32,
    cat: 'him',
    family: 'Citrus spicy',
    img: 'gentle_one_perfume.jpg?v=1719306848',
    blurb: 'Citrus lifted by warm spices, made for day into evening.',
    notes: ['Citrus', 'Warm spice']
  },
  {
    id: 'moon-beam',
    name: 'Moon Beam',
    price: 31,
    cat: 'unisex',
    family: 'Oriental woody',
    img: 'Moon_Beam_1.png?v=1745077654',
    blurb: 'Fruity brightness with warm spice and an amber-woody dry-down.',
    notes: ['Fruit', 'Warm spice', 'Floral heart', 'Amber wood']
  },
  {
    id: 'wara-max',
    name: 'Wara Max',
    price: 28,
    cat: 'him',
    family: 'Woody musk',
    img: 'max-min.jpg?v=1724063178',
    blurb: 'Cedarwood and musk in a robust, long-wearing profile.',
    notes: ['Cedarwood', 'Musk']
  },
  {
    id: 'wara-femme',
    name: 'Wara Femme',
    price: 28,
    cat: 'her',
    family: 'Floral sweet',
    img: 'femme.jpg?v=1724062328',
    blurb: 'Rose and vanilla, sweet and composed.',
    notes: ['Rose', 'Vanilla']
  },
  {
    id: 'wara-strong-lady',
    name: 'Wara Strong Lady',
    price: 27,
    cat: 'her',
    family: 'Floral woody',
    img: 'stronglady.jpg?v=1719306813',
    blurb: 'Jasmine and sandalwood with a straightforward, confident trail.',
    notes: ['Jasmine', 'Sandalwood']
  },
  {
    id: 'gift-pack-unisex',
    name: 'Gift Pack, Unisex',
    price: 25,
    cat: 'gift',
    family: 'Gift set',
    img: '0013.jpg?v=1751546511',
    blurb: 'Wara gift pack, unisex.',
    notes: []
  },
  {
    id: 'gift-pack-male',
    name: 'Gift Pack, For Him',
    price: 25,
    cat: 'gift',
    family: 'Gift set',
    img: '0012_65af5b76-a993-422c-a72a-8bb154e6b286.jpg?v=1751554676',
    blurb: 'Wara gift pack, for him.',
    notes: []
  },
  {
    id: 'gift-pack-female',
    name: 'Gift Pack, For Her',
    price: 25,
    cat: 'gift',
    family: 'Gift set',
    img: '0011_15706f4a-4512-42a7-bf2c-822a8dd10bc0.jpg?v=1751554367',
    blurb: 'Wara gift pack, for her.',
    notes: []
  }
];

/* hero plate: the house's own white-background shot */
export const HERO_IMAGE = IMG + 'SidraWhite.jpg?v=1744973812&width=1200';

export function imgUrl(product, size = CARD_SIZE) {
  return IMG + product.img + size;
}

export function money(value) {
  return '$' + value.toFixed(2);
}
