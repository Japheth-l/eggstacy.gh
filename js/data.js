// ─────────────────────────────────────────────────────────────
//  EGGSTACY SITE DATA — edit this file to update the website.
//  Prices are in Ghana cedis.
//  An item has either `price` (one price) or `sizes` ({ label: price }).
// ─────────────────────────────────────────────────────────────

window.EGGSTACY = {
  instagram: "https://www.instagram.com/eggstacy.gh/",

  // 0 = Sunday … 6 = Saturday. Times are 24h, Accra time (GMT). close past 24 = after midnight.
  hours: [
    { days: "Monday – Thursday", from: 1, to: 4, open: 10, close: 23, label: "10AM – 11PM" },
    { days: "Friday – Sunday", from: 5, to: 0, open: 10, close: 25, label: "10AM – 1AM" },
  ],

  branches: [
    {
      id: "lagos-ave",
      name: "East Legon",
      area: "Lagos Avenue (Munasak Plaza)",
      address: "Munasak Plaza, Lagos Avenue, East Legon. Same premises as Yah! Ice Cream.",
      phone: "0559367502",
      maps: "https://www.google.com/maps/search/?api=1&query=Munasak+Plaza+Lagos+Avenue+East+Legon+Accra",
    },
    {
      id: "osu",
      name: "Osu",
      area: "Osu Shell",
      address: "Osu Shell, adjacent Papaye, Oxford Street, Accra.",
      phone: "0594681767",
      maps: "https://www.google.com/maps/search/?api=1&query=Shell+Oxford+Street+Osu+Papaye+Accra",
    },
    {
      id: "legon-hills",
      name: "East Legon Hills",
      area: "Nana Kurom Junction",
      address: "Nana Kurom Junction, adjacent Melcom, East Legon Hills.",
      phone: "0559413275",
      maps: "https://www.google.com/maps/search/?api=1&query=Melcom+Nana+Kurom+Junction+East+Legon+Hills",
    },
  ],

  categories: [
    { id: "all", label: "Everything" },
    { id: "combos", label: "Slushy Combos 🔥" },
    { id: "fries", label: "Loaded Fries" },
    { id: "burgers", label: "Burgers" },
    { id: "rice", label: "Rice" },
    { id: "noodles", label: "Thai Chilli Noodles" },
    { id: "slushies", label: "Slushies" },
    { id: "shakes", label: "Milkshakes" },
    { id: "extras", label: "Extras" },
  ],

  menu: [
    // ── Slushy combos (unlimited refills) ──
    { id: "combo-jollof", cat: "combos", name: "Assorted Jollof + Slushy", desc: "Assorted jollof with chicken & sausage, plus a slushy with unlimited refills.", sizes: { "Slushy cup": 150, "Las Vegas Tower": 180 }, img: "assets/img/combo-jollof.jpg", tag: "Unlimited refills" },
    { id: "combo-noodles", cat: "combos", name: "Chicken Noodles + Slushy", desc: "Chicken & sausage noodles, plus a slushy with unlimited refills.", sizes: { "Slushy cup": 150, "Las Vegas Tower": 180 }, img: "assets/img/combo-noodles.jpg", tag: "Unlimited refills" },
    { id: "combo-fries", cat: "combos", name: "Chicken Loaded Fries + Slushy", desc: "Chicken loaded fries, plus a slushy with unlimited refills.", sizes: { "Slushy cup": 150, "Las Vegas Tower": 180 }, img: "assets/img/combo-fries.jpg", tag: "Unlimited refills" },
    { id: "combo-burger", cat: "combos", name: "Beef Burger + Slushy", desc: "Stacked beef burger, plus a slushy with unlimited refills.", sizes: { "Slushy cup": 150, "Las Vegas Tower": 180 }, img: "assets/img/combo-burger.jpg", tag: "Unlimited refills" },

    // ── Loaded fries ──
    { id: "fries-chicken-rush", cat: "fries", name: "Chicken Rush", desc: "Fries loaded with crispy fried chicken, cheese sauce and ketchup.", sizes: { Medium: 135, Large: 165 }, img: "assets/img/fries-chicken.jpg", tag: "Best seller" },
    { id: "fries-beefd-up", cat: "fries", name: "Beef'd Up", desc: "Fries piled with seasoned beef and creamy cheese drizzle.", sizes: { Medium: 155, Large: 184 }, img: "assets/img/cheese-fries-close.jpg" },
    { id: "fries-meat-overload", cat: "fries", name: "Meat Overload", desc: "All the meats, melted mozzarella, the cheese pull of your dreams.", sizes: { Medium: 180, Large: 212 }, img: "assets/img/loaded-pull.jpg", tag: "Cheese pull" },

    // ── Burgers ──
    { id: "burger-egg", cat: "burgers", name: "Egg Burger", desc: "The Eggstacy original, with a fried egg in a soft toasted bun.", price: 85, emoji: "🍳" },
    { id: "burger-chicken", cat: "burgers", name: "Chicken Burger", desc: "Crispy chicken fillet, fresh lettuce and tomato.", price: 105, img: "assets/img/chicken-burger.jpg" },
    { id: "burger-beef", cat: "burgers", name: "Beef Burger", desc: "Juicy beef patty, melted cheese and all the fixings.", price: 115, img: "assets/img/beef-burger.jpg" },

    // ── Rice ──
    { id: "rice-jollof", cat: "rice", name: "Jollof", desc: "Smoky, spicy Ghana jollof.", sizes: { Medium: 85, Large: 105 }, img: "assets/img/jollof.jpg" },
    { id: "rice-asd-jollof", cat: "rice", name: "Assorted Jollof", desc: "Jollof loaded with chicken, sausage and more.", sizes: { Medium: 100, Large: 119 }, img: "assets/img/combo-jollof.jpg", tag: "Popular" },
    { id: "rice-veg-jollof", cat: "rice", name: "Veg. Jollof", desc: "Jollof packed with vegetables.", sizes: { Medium: 90, Large: 115 }, img: "assets/img/jollof.jpg" },
    { id: "rice-fried", cat: "rice", name: "Fried Rice", desc: "Classic veggie fried rice.", sizes: { Medium: 80, Large: 100 }, img: "assets/img/fried-rice.jpg" },
    { id: "rice-asd-fried", cat: "rice", name: "Assorted Fried Rice", desc: "Fried rice with assorted meats.", sizes: { Medium: 105, Large: 117 }, img: "assets/img/fried-rice.jpg" },

    // ── Thai chilli noodles ──
    { id: "noodles-chicken", cat: "noodles", name: "Chicken Noodles", desc: "Wok-tossed Thai chilli noodles with chicken, peppers & carrots.", sizes: { Medium: 77, Large: 97 }, img: "assets/img/noodles-sausage.jpg", tag: "Hot" },
    { id: "noodles-beef", cat: "noodles", name: "Beef Noodles", desc: "Thai chilli noodles with tender beef strips.", sizes: { Medium: 85, Large: 115 }, img: "assets/img/noodles.jpg" },
    { id: "noodles-seafood", cat: "noodles", name: "Shrimps / Kalamari Noodles", desc: "Thai chilli noodles with shrimps or calamari.", sizes: { Medium: 135, Large: 170 }, img: "assets/img/noodles-wok.jpg" },
    { id: "noodles-assorted", cat: "noodles", name: "Assorted Noodles", desc: "A bit of everything: chicken, beef, sausage and veg.", sizes: { Medium: 155, Large: 195 }, img: "assets/img/combo-noodles.jpg" },

    // ── Slushies ──
    { id: "slush-vegas", cat: "slushies", name: "Las Vegas Tower", desc: "The iconic yard-long Eggstacy slushie tower.", price: 65, img: "assets/img/slushie-towers.jpg", tag: "Iconic" },
    { id: "slush-vegas-alc", cat: "slushies", name: "Las Vegas Alcohol", desc: "The Las Vegas Tower with a grown-up kick. 18+.", price: 80, img: "assets/img/slushie-tray.jpg", tag: "18+" },
    { id: "slush-mega", cat: "slushies", name: "Mega Tower (Slushie)", desc: "The giant tower. Bring friends.", price: 250, img: "assets/img/slushie-machines.jpg" },
    { id: "slush-mega-alc", cat: "slushies", name: "Mega Alcohol", desc: "The giant tower, spiked. 18+.", price: 300, emoji: "🍹", tag: "18+" },
    { id: "water", cat: "slushies", name: "Water", desc: "Chilled bottled water.", price: 5, emoji: "💧" },

    // ── Milkshakes ──
    { id: "shake-vanilla", cat: "shakes", name: "Vanilla Milkshake", desc: "Thick, creamy vanilla.", sizes: { Medium: 65, Large: 85 }, img: "assets/img/milkshakes.jpg" },
    { id: "shake-chocolate", cat: "shakes", name: "Chocolate Milkshake", desc: "Rich chocolate, topped right.", sizes: { Medium: 65, Large: 80 }, img: "assets/img/milkshakes.jpg" },
    { id: "shake-strawberry", cat: "shakes", name: "Strawberry Milkshake", desc: "Sweet strawberry swirl.", sizes: { Medium: 65, Large: 80 }, img: "assets/img/milkshakes.jpg" },
    { id: "greek-yogurt", cat: "shakes", name: "Greek Yogurt", desc: "Cool and tangy.", price: 20, emoji: "🥛" },
    { id: "ice-cream", cat: "shakes", name: "Ice Cream", desc: "A cold scoop of happiness.", sizes: { Medium: 35, Large: 55 }, emoji: "🍦" },

    // ── Extras ──
    { id: "extra-bacon", cat: "extras", name: "Bacon", desc: "Add crispy bacon to anything.", price: 30, emoji: "🥓" },
    { id: "extra-cheese", cat: "extras", name: "Extra Cheese", desc: "Because there's never enough.", price: 15, emoji: "🧀" },
    { id: "extra-fries", cat: "extras", name: "Fries", desc: "A side of golden fries.", price: 30, emoji: "🍟" },
    { id: "extra-eggs", cat: "extras", name: "Eggs", desc: "Put an egg on it. It's the Eggstacy way.", price: 15, emoji: "🥚" },
  ],
};
