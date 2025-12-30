
# BillSplit iOS Web App

A clean, high-performance utility designed with iOS aesthetics to split household bills (Electric, Heat, Water, Wifi) among three residents: Dylan, Kaitlyn, and Caroline.
**Made entirely using Google's AI studio**

## Features
- **Greedy Settlement Algorithm**: Calculates the absolute minimum number of transactions required to settle up.
- **iOS Responsive Design**: Tailored for mobile viewports with native-like UI components.
- **Real-time Updates**: Balances and transactions update instantly as you enter amounts.
- **High-Contrast Interface**: Easy to read on mobile devices.

## Local Development

To run this application locally, ensure you have [Node.js](https://nodejs.org/) installed.

1.  **Extract the files** into a project directory.
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
    *Note: If your environment uses a different command (e.g., `vite`), ensure your `package.json` scripts are set accordingly.*

4.  **Open in Browser**:
    Visit `http://localhost:5173` (or the port specified in your terminal).

## Tech Stack
- **React 18** (Functional Components, Hooks)
- **TypeScript** (Strong typing for settlement logic)
- **Tailwind CSS** (iOS design system implementation)
- **Lucide/Heroicons** (Visual context)
