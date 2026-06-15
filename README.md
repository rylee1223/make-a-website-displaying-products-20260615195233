# Pokémon‑Gear E‑Shop (Dark‑Theme Demo)

## Overview
A **single‑page**, fully functional demo of a Pokémon merchandise storefront built with **HTML5, CSS3 and vanilla JavaScript**.  
The design follows the specification:

* Dark‑mode default with CSS custom properties  
* Responsive, mobile‑first layout (desktop → tablet → mobile)  
* Hero carousel, category cards, horizontal product scroll, best‑seller grid  
* Sticky header, mobile hamburger drawer, toast notifications, newsletter form, easter‑egg modal, scroll‑reveal animations, reduced‑motion support, custom Poké‑ball cursor.

All components are ready to be expanded into a multi‑page site (shop, product detail, cart, checkout, etc.).

## Features
| Feature | Implementation |
|---------|----------------|
| **Responsive Grid** | CSS Grid & Flexbox with 12‑col‑style helpers (`.grid-4`, `.grid-3`) |
| **Dark Theme** | CSS variables (`--bg`, `--accent`, …) |
| **Hero Carousel** | Auto‑slide (5 s), manual arrows, pagination dots, swipe via mouse hover |
| **Mobile Navigation** | Slide‑in drawer, overlay, ARIA attributes |
| **Add‑to‑Cart Toast** | Small pop‑up in bottom‑right, cart count updates |
| **Newsletter Validation** | Simple email regex + toast feedback |
| **Scroll Reveal** | `IntersectionObserver` adds `.revealed` class |
| **Easter‑Egg Modal** | Typing “Pikachu” opens a discount modal |
| **Accessibility** | Focusable elements, `aria-label`s, ESC to close modals, reduced‑motion media query |
| **Custom Cursor** | Poké‑ball SVG cursor on interactive elements |

## Project Structure
```
/ (root)
│
├─ index.html      ← main page, links to CSS & JS
├─ styles.css      ← all visual styles, variables, animations
├─ script.js       ← interactivity & UI logic
└─ README.md       ← this file
```

## Setup & Usage
1. **Download** all three files into the same folder.  
2. **Open** `index.html` in any modern browser (Chrome, Edge, Firefox, Safari).  
3. No build tools, npm, or server required – everything runs client‑side.

## Extending the Demo
* **Add pages** (`shop.html`, `product.html`, etc.) and reuse the same header/footer.  
* Connect a backend or localStorage to persist cart contents.  
* Replace placeholder Unsplash images with real product assets.  
* Implement the remaining sections (filter bar, pagination, checkout) following the same class conventions (`.product-card`, `.cta-btn`, `.nav-link`, …).

## License
This demo is provided **free for educational and personal use**. All images are sourced from Unsplash via dynamic URLs; replace with properly licensed assets for production.

--- 

Enjoy building your own Pokémon‑Gear store!