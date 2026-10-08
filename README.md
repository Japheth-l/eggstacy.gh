# Eggstacy website

Static, mobile-first site for [@eggstacy.gh](https://www.instagram.com/eggstacy.gh/). Built with plain HTML, CSS and JS, with no build step. It's hosted on GitHub Pages.

## Features
- Hero with a looping food video, a promo ticker and count-up stats
- Monthly promo card (Chicken Noodles + Slushy, GH₵150, unlimited refills)
- Filterable, searchable menu with an order cart. Orders go to the chosen branch on WhatsApp, or customers can call the branch.
- "Crack the egg" random picker for people who can't decide
- Instagram reels: they play on hover or when scrolled into view, and open fullscreen with sound
- Three branch cards with directions, WhatsApp and call buttons
- FAQ accordion. Tapping the logo three times triggers an egg-confetti easter egg.

## Editing content
Menu items, prices, branches and phone numbers live in **`js/data.js`**.
Set `price: null` to show "Ask in store".

## Run locally
```
python3 -m http.server
```
Then open http://localhost:8000.
