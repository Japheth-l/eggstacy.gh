# Eggstacy website

Static, mobile-first site for [@eggstacy.gh](https://www.instagram.com/eggstacy.gh/). Built with plain HTML, CSS and JS, with no build step. It's hosted on GitHub Pages.

## Features
- Hero with a looping food video, a promo ticker and count-up stats
- Slushy Combo promo: four meals with unlimited slushy refills, GH₵150 with a slushy cup or GH₵180 with a Las Vegas Tower
- Live "Open now / Closed" badge based on opening hours (Accra time)
- The full menu (loaded fries, burgers, rice, Thai chilli noodles, slushies, milkshakes, extras). Customers pick Medium or Large, and the order cart totals everything. Orders go to the chosen branch on WhatsApp, or customers can call the branch.
- "Crack the egg" random picker for people who can't decide
- Instagram reels: they play on hover or when scrolled into view, and open fullscreen with sound
- Three branch cards with directions, WhatsApp and call buttons
- FAQ accordion. Tapping the logo three times triggers an egg-confetti easter egg.

## Editing content
Menu items, prices, opening hours, branches and phone numbers live in **`js/data.js`**.
An item has either `price` (one price) or `sizes` (for example `{ Medium: 135, Large: 165 }`).

## Run locally
```
python3 -m http.server
```
Then open http://localhost:8000.
