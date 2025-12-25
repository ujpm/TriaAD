# TriAD

TriAD is a demo frontend for a progressive, multi-agent Alzheimer’s screening experience.

The UI walks a user through a step-by-step pipeline:

- **Agent 1 (Cognitive)**: demographics + early-signal questions + scenario-based judgment prompts
- **Agent 2 (Genetic)**: APOE selection and optional VCF upload (mocked)
- **Agent 3 (Structural)**: scan type selection and MRI/CT upload (mocked)

This repository focuses on the **user experience** and **workflow**. It does **not** ship a clinical model.

The original design source is available on Figma:
https://www.figma.com/design/gcqpDv8hOsvMDRRNMCp6IQ/TriAD

## Features

- **Cognitive → Genetic → Structural** flow with a report after each agent
- Dynamic report titles:
  - `Cognitive Report`
  - `Genetic Report`
  - `Complete Report`
- **Next-agent CTA** on reports to continue the pipeline
- **Local persistence** (demo): latest screening snapshot stored in `localStorage`
- Mocked **Login / Register / Profile** pages for demo navigation

## Tech Stack

- React + TypeScript
- Vite
- Tailwind CSS
- `motion/react` for animations
- `lucide-react` icons

## Getting Started

### Prerequisites

- Node.js 18+ recommended
- npm

### Install

```bash
npm install
```

### Run (dev)

```bash
npm run dev
```

Then open the URL printed in the terminal (typically `http://localhost:5173`).

## Scripts

- `npm run dev` — start the development server
- `npm run build` — production build
- `npm run preview` — preview the production build locally

## Demo Notes

- **Authentication is mocked** (Login/Register just navigate to Profile).
- **Uploads are mocked** (file names are captured, no backend storage).
- Screening results are **for demonstration only**.

## Medical Disclaimer

TriAD is a screening demo and **does not provide medical diagnosis**.
Always consult qualified healthcare professionals for medical advice, diagnosis, and treatment decisions.
