# Open INCI Lab

Open INCI Lab is a Next.js app for reading INCI and cosmetic ingredient lists from label photos. It uses browser-based OCR to extract ingredient names and match them against a transparent local sample database.

> This project is an MVP/prototype. It does not replace dermatological, medical, or regulatory advice.

## Features

- Upload cosmetic ingredient label photos in the browser
- Run OCR with Tesseract.js
- Apply simple image preprocessing before OCR
- Extract possible INCI ingredients from raw OCR text
- Match detected ingredients against a local sample database
- Display known and unknown ingredients separately
- No API keys required for the current version
- No user account, backend API, or database connection in the current MVP
- Responsive interface focused on readability

## Tech Stack

| Area | Technology |
| --- | --- |
| Framework | Next.js App Router |
| UI | React + TypeScript |
| OCR | Tesseract.js |
| Styling | Plain CSS |
| Data source | Local TypeScript file |

## Project Structure

```txt
.
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   └── ingredients.ts
├── public/
│   └── favicon.svg
├── .env.example
├── .gitignore
├── next-env.d.ts
├── next.config.mjs
├── package.json
├── package-lock.json
├── tsconfig.json
└── README.md
```

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the app in your browser:

```txt
http://localhost:3000
```

## Available Scripts

```bash
npm run dev      # starts the local development server
npm run build    # creates a production build
npm run start    # starts the production server after a build
npm run lint     # runs the configured lint command
```

## Environment Variables

The current version does not require environment variables.

A local `.env.local` file should not be committed to the repository. If environment variables are added later, create a safe template such as:

```bash
cp .env.example .env.local
```

Real keys, tokens, URLs, and private values should only be stored in `.env.local`.

## Privacy and Security

The current MVP processes selected images in the browser. It does not include a custom backend route, login system, or database connection.

Depending on the Tesseract.js configuration and hosting setup, OCR-related assets such as worker, WASM, or language files may be loaded by the browser. For a fully offline version, these assets should be bundled and configured locally.

Before publishing, make sure that no private files, API keys, tokens, personal email addresses, private URLs, or screenshots with sensitive data are included in the repository.

## Ingredient Database

The local sample database is stored in:

```txt
lib/ingredients.ts
```

A sample ingredient entry looks like this:

```ts
{
  inci_name: "Glycerin",
  aliases: ["Glycerol"],
  short_description: "A humectant that helps bind water in the upper skin layers.",
  long_description: "Glycerin is commonly used in cosmetic formulas to support hydration and improve product feel."
}
```

Ingredient descriptions should stay neutral and should not make medical claims.

## Roadmap

Potential next steps:

- Expand the local INCI database
- Improve OCR parsing for messy label photos
- Add manual editing before ingredient matching
- Add multilingual OCR support
- Add export options such as JSON or CSV
- Add local notes for custom ingredient research
- Add an optional backend mode with secure authentication

## GitHub Checklist

Before publishing:

- [ ] `.env.local` is not included
- [ ] `.env.example` contains only placeholders or comments
- [ ] No API keys or tokens are included
- [ ] No personal names, emails, handles, or private URLs are included
- [ ] No private screenshots or label photos are included
- [ ] `npm install` works locally
- [ ] `npm run build` works locally
- [ ] The app opens correctly at `http://localhost:3000`

## Deployment

The app can be deployed on platforms that support Next.js, such as Vercel, Netlify, or a custom Node server.

Typical build command:

```bash
npm run build
```

Typical start command:

```bash
npm run start
```

## License

No license has been selected yet. Choose a license before publishing if others should be allowed to use, copy, modify, or contribute to this project.
