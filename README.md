# Ecommerce App (React Native)

A small **e-commerce style** demo app built with **React Native** and **TypeScript**. It uses **Native Base** for UI, **React Navigation** (stack + custom curved bottom tabs), and **dummy data** throughout—no real payments or API calls.

**Use case:** learn navigation patterns, cart state, and a full **checkout flow** (including card form validation) without wiring a payment gateway.

---

## Features

- **Home** — Search and category filters, product grid, add to cart, product detail screen.
- **Cart** — Responsive line items, quantity controls, running total, checkout entry point.
- **Checkout** — Review order (demo address) → **payment** with Apple Pay / PayPal shortcuts or **credit/debit card** entry.
- **Card entry (demo)** — Formatting and validation via [`card-validator`](https://github.com/braintree/card-validator) (Luhn, issuer lengths, expiry, CVV/CID rules, cardholder name). Values stay on-device; nothing is charged or sent to a processor.
- **Order confirmation** — After “pay,” order snapshot is stored in memory and the cart clears.
- **Orders** — Lists orders placed in the current app session.
- **Explore / Profile / Notifications** — Placeholder or lightweight screens to round out the tab and root stack.

**UI notes:** Custom curved bottom bar (cart FAB), safe-area–aware layouts, and a small top “toast” for feedback (plain React Native, not Native Base toast) where needed.

---

## Tech stack

| Area | Choice |
|------|--------|
| Runtime | React 19, React Native 0.85 |
| Language | TypeScript |
| UI | Native Base 3, React Native SVG (icons) |
| Navigation | `@react-navigation/native`, native stack, curved bottom bar |
| Cart / orders | React context (in-memory) |
| Card validation (demo) | `card-validator` |

---

## Requirements

- **Node.js** ≥ 22.11 (see `package.json` `engines`)
- **iOS:** Xcode, CocoaPods (`bundle install` / `pod install` as needed for your setup)
- **Android:** Android Studio / SDKs per [React Native environment setup](https://reactnative.dev/docs/set-up-your-environment)

---

## Install

```sh
git clone <your-repo-url>
cd ecommerceApp
```

If `npm install` fails on peer dependency conflicts (common with Native Base + recent React), try:

```sh
npm install --legacy-peer-deps
```

iOS native deps (from project `ios/`, when applicable):

```sh
cd ios && bundle exec pod install && cd ..
```

---

## Run

Start Metro:

```sh
npm start
```

**Android** (separate terminal):

```sh
npm run android
```

**iOS** (separate terminal):

```sh
npm run ios
```

You can also open the `ios/*.xcworkspace` in Xcode and run a simulator or device from there.

---

## Scripts

| Command | Purpose |
|--------|---------|
| `npm start` | Metro bundler |
| `npm run ios` | Build & run iOS |
| `npm run android` | Build & run Android |
| `npm run lint` | ESLint |
| `npm test` | Jest (config may need module tweaks for all imports) |

---

## Project structure (high level)

```text
src/
  components/     # Shared UI (screen chrome, toasts, pressables, …)
  context/         # Cart + orders (in-memory)
  data/            # Dummy products, payment method labels
  navigation/      # App navigator, tab + home/cart stacks
  screens/         # Feature screens
  theme/           # Native Base theme / design tokens
  utils/           # e.g. formatPrice, dummy card helpers
App.tsx
```

---

## Troubleshooting

- **Metro / build errors:** See the official [React Native troubleshooting](https://reactnative.dev/docs/troubleshooting) guide.
- **CocoaPods / iOS:** Re-run `pod install` after changing native dependencies.

---

## License

This project is for **learning and demonstration**. Product images may come from public URLs (e.g. Unsplash) as configured in dummy data; respect those services’ terms if you fork or ship builds.

If you do not add a `LICENSE` file, GitHub will not infer one—add a license file if you plan to open-source the repo.
