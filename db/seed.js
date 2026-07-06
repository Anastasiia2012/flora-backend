'use strict';

require('dotenv').config();
const { sequelize, Bouquet } = require('./index');

const bouquets = [
  {
    title: 'Spring Elegance',
    description: 'A delicate blend of peonies, tulips, and roses — perfect for springtime gifting and bright smiles.',
    price: 35, category: 'bestseller',
    photoURL: 'images/product1/perfect-gift-wonderful-flowers-womens-day-tender-smiling-brunet-woman-holding-front-face-bouquet-spring-flowerspace-text@1x.png',
    favorite: false,
  },
  {
    title: 'Berry Chic',
    description: 'A stylish composition of roses, seasonal greenery and vibrant berries — a bold and elegant floral statement.',
    price: 40, category: 'bestseller',
    photoURL: 'images/product1/bridal-arrangement-wedding-flowers-closeup-decoration-roses-flowers-ornamental-plants-closeup@1x.png',
    favorite: false,
  },
  {
    title: 'Lavender Dream',
    description: 'A rich bouquet with lavender, lisianthus, and roses — ideal for those who love deep hues and gentle fragrance.',
    price: 55, category: 'bestseller',
    photoURL: 'images/product1/mixed-flower-bouquet-wooden-table@1x.png',
    favorite: false,
  },
  {
    title: 'Golden Hour',
    description: "Warm sun-kissed hues of amber, gold and peach — the perfect gift to brighten anyone's day.",
    price: 42, category: 'seasonal',
    photoURL: 'images/product1/bridal-arrangement-wedding-flowers-closeup-decoration-roses-flowers-ornamental-plants-closeup@1x.png',
    favorite: false,
  },
  {
    title: 'White Romance',
    description: 'A timeless arrangement of white roses and cream blooms — pure, elegant and deeply romantic.',
    price: 48, category: 'wedding',
    photoURL: 'images/product1/mixed-flower-bouquet-wooden-table@1x.png',
    favorite: false,
  },
  {
    title: 'Peach Sunset',
    description: 'Soft peach and coral tones blended with lush foliage — warm, radiant, and full of life.',
    price: 39, category: 'seasonal',
    photoURL: 'images/product1/mixed-flower-bouquet-wooden-table@1x.png',
    favorite: false,
  },
  {
    title: 'Peach Meadow',
    description: 'A soft and radiant arrangement of peach and blush roses with lush greenery in a straw basket — light and natural.',
    price: 55, category: 'classic',
    photoURL: 'images/product2/side-view-rose-bouquet-with-wildflowers-pink-basket@1x.png',
    favorite: false,
  },
  {
    title: 'Blush Romance',
    description: 'A premium bouquet of deep pink and ivory roses, complemented by silver eucalyptus — sophisticated and intimate.',
    price: 34, category: 'wedding',
    photoURL: 'images/product2/florist-makes-beautiful-bouquet-studio@1x.png',
    favorite: false,
  },
  {
    title: 'Pastel Garden',
    description: 'A pastel-toned mix of spray roses and greenery in a woven basket — gentle, airy, and perfect for any occasion.',
    price: 40, category: 'classic',
    photoURL: 'images/product2/big-basket-mixed-flowers-standing-table-with-christmas-cones@1x.png',
    favorite: false,
  },
  {
    title: 'Tulip Charm',
    description: 'A vivid bouquet of bright tulips and roses in a lavender box — cheerful and full of charm.',
    price: 61, category: 'seasonal',
    photoURL: 'images/product2/mixed-flower-composition-side-view@1x.png',
    favorite: false,
  },
  {
    title: 'Berry Bloom',
    description: 'A lush mix of rich pink, purple, and cream blooms with textured greens — romantic and elegant.',
    price: 32, category: 'classic',
    photoURL: 'images/product2/exotic-rustic-bunch-flowers-mixed-colors@1x.png',
    favorite: false,
  },
  {
    title: 'Sweet Whisper',
    description: 'A tender arrangement of soft pastel blooms and notecard — a quiet, heartfelt gift.',
    price: 40, category: 'classic',
    photoURL: 'images/product2/basket-filled-with-assorted-colorful-flowers-notecard@1x.png',
    favorite: false,
  },
  {
    title: 'Field Joy',
    description: 'A cheerful bunch of wildflowers in mixed colours — fresh, rustic and full of countryside spirit.',
    price: 49, category: 'seasonal',
    photoURL: 'images/product2/wild-flowers@1x.png',
    favorite: false,
  },
  {
    title: 'Soft Bloom',
    description: 'A vintage-styled bouquet on a dark background — refined, moody and quietly luxurious.',
    price: 37, category: 'classic',
    photoURL: 'images/product2/close-up-bouquet-decorated-vintage-style-dark-background@1x.png',
    favorite: false,
  },
];

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to database');
    await sequelize.sync({ alter: true });
    console.log('Tables synced');

    const existing = await Bouquet.count();
    if (existing > 0) {
      await Bouquet.destroy({ where: {} });
      console.log('Cleared existing records');
    }

    await Bouquet.bulkCreate(bouquets);
    console.log(`Seeded ${bouquets.length} bouquets successfully`);
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err.message);
    process.exit(1);
  }
})();
