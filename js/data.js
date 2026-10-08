// ─────────────────────────────────────────────────────────────
//  EGGSTACY SITE DATA — edit this file to update the website.
//  Prices are in Ghana cedis. Set price to null to show "Ask in store".
// ─────────────────────────────────────────────────────────────

window.EGGSTACY = {
  instagram: "https://www.instagram.com/eggstacy.gh/",

  branches: [
    {
      id: "osu",
      name: "Osu",
      area: "Osu Shell Filling Station",
      address: "Shell Filling Station, Osu, Accra",
      phone: "0594681767",
      maps: "https://www.google.com/maps/search/?api=1&query=Eggstacy+Osu+Shell+Filling+Station+Accra",
    },
    {
      id: "lagos-ave",
      name: "East Legon",
      area: "Lagos Avenue",
      address: "69 Lagos Avenue, East Legon, Accra",
      phone: "0559367502",
      maps: "https://www.google.com/maps/search/?api=1&query=Eggstacy+69+Lagos+Avenue+East+Legon+Accra",
    },
    {
      id: "legon-hills",
      name: "East Legon Hills",
      area: "Nana Krom Junction",
      address: "Nana Krom Junction, East Legon Hills, Accra",
      phone: "0559413275",
      maps: "https://www.google.com/maps/search/?api=1&query=Eggstacy+Nana+Krom+Junction+East+Legon+Hills",
    },
  ],

  categories: [
    { id: "all", label: "Everything" },
    { id: "combos", label: "Combos 🔥" },
    { id: "fries", label: "Loaded Fries" },
    { id: "noodles", label: "Noodles" },
    { id: "burgers", label: "Egg Burgers" },
    { id: "drinks", label: "Slushies" },
    { id: "cakes", label: "Ice Cream Cakes" },
  ],

  menu: [
    {
      id: "noodle-slushy-combo",
      cat: "combos",
      name: "Chicken Noodles + Slushy",
      desc: "Our signature wok noodles with chicken & sausage, plus a slushy with UNLIMITED refills.",
      price: 150,
      img: "assets/img/promo-flyer.jpg",
      tag: "Promo",
    },
    {
      id: "chicken-loaded-fries",
      cat: "fries",
      name: "Chicken Loaded Fries",
      desc: "Crispy fries buried under crunchy fried chicken, golden cheese sauce and ketchup.",
      price: null,
      img: "assets/img/fries-chicken.jpg",
      tag: "Best seller",
    },
    {
      id: "cheesy-loaded-fries",
      cat: "fries",
      name: "Cheesy Loaded Fries",
      desc: "Fries + chicken + a mountain of mozzarella, melted and drizzled. The cheese pull is real.",
      price: null,
      img: "assets/img/loaded-pull.jpg",
      tag: "Cheese pull",
    },
    {
      id: "sauce-loaded-fries",
      cat: "fries",
      name: "Saucy Loaded Fries",
      desc: "Creamy white sauce, cheese drizzle and ketchup zig-zags over hot fries.",
      price: null,
      img: "assets/img/cheese-fries-close.jpg",
    },
    {
      id: "chicken-noodles",
      cat: "noodles",
      name: "Chicken Noodles",
      desc: "Wok-tossed noodles with chicken, sausage, peppers, carrots & onions.",
      price: null,
      img: "assets/img/noodles-sausage.jpg",
      tag: "Hot",
    },
    {
      id: "assorted-noodles",
      cat: "noodles",
      name: "Assorted Noodles",
      desc: "Loaded with beef, chicken and veggies, fresh from the fire.",
      price: null,
      img: "assets/img/noodles.jpg",
    },
    {
      id: "classic-egg-burger",
      cat: "burgers",
      name: "Classic Egg Burger",
      desc: "Juicy patty, fried egg with a runny yolk, cheese and our house sauce.",
      price: null,
      emoji: "🍔",
    },
    {
      id: "chicken-egg-burger",
      cat: "burgers",
      name: "Chicken Egg Burger",
      desc: "Crispy chicken fillet, fried egg, lettuce and spicy mayo.",
      price: null,
      emoji: "🍳",
    },
    {
      id: "slushy",
      cat: "drinks",
      name: "Eggstacy Slushy",
      desc: "Ice-cold rainbow slushy in the iconic Eggstacy yard cup.",
      price: null,
      img: "assets/img/slushie-tray.jpg",
      tag: "Cold",
    },
    { id: "cake-choco-vanilla", cat: "cakes", name: "Choco Vanilla Ice Cream Cake", desc: "It's not just cake, it's ICE CREAM cake.", price: 90, emoji: "🍫" },
    { id: "cake-oreo", cat: "cakes", name: "Oreo Ice Cream Cake", desc: "Cookies & cream, layered cold.", price: 90, emoji: "🍪" },
    { id: "cake-cheesecake", cat: "cakes", name: "Cheesecake Ice Cream Cake", desc: "Creamy cheesecake meets ice cream.", price: 90, emoji: "🍰" },
    { id: "cake-red-velvet", cat: "cakes", name: "Red Velvet Ice Cream Cake", desc: "Red velvet, frozen to perfection.", price: null, emoji: "❤️" },
  ],
};
