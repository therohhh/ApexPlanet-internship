const PRODUCTS = [
  // Electronics
  {
    id: 1,
    name: 'Wireless Noise-Cancelling Headphones',
    category: 'electronics',
    price: 299,
    rating: 4.7,
    reviews: 1243,
    emoji: '🎧',
    desc: 'Deep bass, 30hr battery, and active noise cancellation for uninterrupted focus.'
  },
  {
    id: 2,
    name: 'Mechanical Keyboard — TKL',
    category: 'electronics',
    price: 149,
    rating: 4.5,
    reviews: 876,
    emoji: '⌨️',
    desc: 'Tactile brown switches, aluminium frame, PBT keycaps. Built to last.'
  },
  {
    id: 3,
    name: 'Ultrawide Monitor 34"',
    category: 'electronics',
    price: 699,
    rating: 4.6,
    reviews: 512,
    emoji: '🖥️',
    desc: '3440×1440 IPS panel, 144Hz, curved. Your desk deserves this.'
  },
  {
    id: 4,
    name: 'Wireless Charging Pad',
    category: 'electronics',
    price: 39,
    rating: 4.1,
    reviews: 2341,
    emoji: '🔋',
    desc: '15W fast charge, compatible with all Qi devices. Slim and minimal.'
  },
  {
    id: 5,
    name: 'USB-C Hub — 7 in 1',
    category: 'electronics',
    price: 59,
    rating: 4.3,
    reviews: 987,
    emoji: '🔌',
    desc: 'HDMI 4K, 3x USB-A, SD card, PD charging. One dock for everything.'
  },
  {
    id: 6,
    name: 'Smart LED Desk Lamp',
    category: 'electronics',
    price: 89,
    rating: 4.4,
    reviews: 654,
    emoji: '💡',
    desc: 'Adjustable colour temperature, USB-A port, touch dimming. Zero flicker.'
  },

  // Clothing
  {
    id: 7,
    name: 'Heavyweight Cotton Tee',
    category: 'clothing',
    price: 29,
    rating: 4.8,
    reviews: 3421,
    emoji: '👕',
    desc: '240gsm combed cotton. Structured fit, no-roll collar, pre-shrunk.'
  },
  {
    id: 8,
    name: 'Slim Chino Trousers',
    category: 'clothing',
    price: 65,
    rating: 4.3,
    reviews: 1102,
    emoji: '👖',
    desc: 'Stretch twill fabric, slim through the thigh, tapered leg. All-day comfort.'
  },
  {
    id: 9,
    name: 'Merino Wool Crew Sweater',
    category: 'clothing',
    price: 110,
    rating: 4.6,
    reviews: 789,
    emoji: '🧥',
    desc: 'Extra-fine merino, naturally thermoregulating. Soft against the skin.'
  },
  {
    id: 10,
    name: 'Running Shorts — 5"',
    category: 'clothing',
    price: 45,
    rating: 4.2,
    reviews: 567,
    emoji: '🩳',
    desc: 'Lightweight woven shell, built-in liner, reflective details.'
  },

  // Books
  {
    id: 11,
    name: 'The Design of Everyday Things',
    category: 'books',
    price: 18,
    rating: 4.9,
    reviews: 8912,
    emoji: '📗',
    desc: 'Don Norman\'s timeless classic on human-centred design. Essential reading.'
  },
  {
    id: 12,
    name: 'Atomic Habits',
    category: 'books',
    price: 16,
    rating: 4.8,
    reviews: 15023,
    emoji: '📘',
    desc: 'James Clear on building systems that compound. Changed how people work.'
  },
  {
    id: 13,
    name: 'Clean Code',
    category: 'books',
    price: 22,
    rating: 4.5,
    reviews: 5601,
    emoji: '📕',
    desc: 'Robert C. Martin\'s guide to writing readable, maintainable software.'
  },
  {
    id: 14,
    name: 'Deep Work',
    category: 'books',
    price: 15,
    rating: 4.7,
    reviews: 6723,
    emoji: '📙',
    desc: 'Cal Newport on focused work in a distracted world. Do less, better.'
  },
  {
    id: 15,
    name: 'The Pragmatic Programmer',
    category: 'books',
    price: 25,
    rating: 4.6,
    reviews: 4231,
    emoji: '📒',
    desc: '20th Anniversary Edition. Career-defining advice for software craftspeople.'
  },

  // Home
  {
    id: 16,
    name: 'Ceramic Pour-Over Coffee Set',
    category: 'home',
    price: 55,
    rating: 4.7,
    reviews: 1876,
    emoji: '☕',
    desc: 'Hand-thrown matte ceramic dripper with matching server. Brews 400ml.'
  },
  {
    id: 17,
    name: 'Linen Duvet Cover — King',
    category: 'home',
    price: 120,
    rating: 4.5,
    reviews: 934,
    emoji: '🛏️',
    desc: 'Stone-washed French linen. Gets softer with every wash. Oeko-Tex certified.'
  },
  {
    id: 18,
    name: 'Minimalist Wall Clock',
    category: 'home',
    price: 45,
    rating: 4.4,
    reviews: 723,
    emoji: '🕐',
    desc: 'Brushed steel hands, silent sweep movement, 30cm beech frame.'
  },
  {
    id: 19,
    name: 'Wooden Desk Organiser',
    category: 'home',
    price: 35,
    rating: 4.3,
    reviews: 456,
    emoji: '🗂️',
    desc: 'Solid oak, modular slots for pens, cards, cables. Timeless on any desk.'
  },

  // Fitness
  {
    id: 20,
    name: 'Adjustable Dumbbell Set — 5-25kg',
    category: 'fitness',
    price: 249,
    rating: 4.8,
    reviews: 2341,
    emoji: '🏋️',
    desc: 'Dial-select weight system. Replaces 9 pairs of dumbbells. Space-efficient.'
  },
  {
    id: 21,
    name: 'Yoga Mat — 6mm Natural Rubber',
    category: 'fitness',
    price: 79,
    rating: 4.6,
    reviews: 3102,
    emoji: '🧘',
    desc: 'Non-slip natural rubber base, microfibre surface. Alignment markers included.'
  },
  {
    id: 22,
    name: 'Resistance Band Set',
    category: 'fitness',
    price: 29,
    rating: 4.4,
    reviews: 4521,
    emoji: '💪',
    desc: '5 resistance levels, latex-free, includes door anchor and handles.'
  },
  {
    id: 23,
    name: 'Insulated Water Bottle — 1L',
    category: 'fitness',
    price: 35,
    rating: 4.7,
    reviews: 8901,
    emoji: '💧',
    desc: '18/8 stainless steel, keeps cold 24hr, hot 12hr. Leak-proof lid.'
  },
  {
    id: 24,
    name: 'Pull-Up Bar — Doorframe',
    category: 'fitness',
    price: 45,
    rating: 4.2,
    reviews: 1876,
    emoji: '🤸',
    desc: 'No screws needed, 150kg capacity, foam grips. Fits most doorframes.'
  }
];
