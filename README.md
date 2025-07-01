# React Draggable Page Navigation

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app). It features a draggable page navigation system built using `framer-motion` and custom components.

## Deployment

The project is deployed at [https://react-draggable-page-nav.vercel.app/](https://react-draggable-page-nav.vercel.app/).

## Features

- Draggable page navigation using `framer-motion`.
- Customizable icons and page settings.
- Responsive design with Tailwind CSS.
- Optimized SVG handling with `@svgr/webpack`.

## Getting Started

Follow these steps to set up the project locally:

### Prerequisites

Ensure you have the following installed:
- Node.js (v16 or higher)
- npm (v8 or higher)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/react-draggable-page-nav.git
   cd react-draggable-page-nav
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Build

To create an optimized production build:
```bash
npm run build
```

### Start

To serve the production build:
```bash
npm start
```

## Project Structure

```
src/
├── app/
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
├── assets/
│   ├── icons/
│   │   ├── big-add.svg
│   │   ├── circle-check.svg
│   │   ├── circle-info.svg
│   │   ├── clipboard.svg
│   │   ├── document.svg
│   │   ├── flag.svg
│   │   ├── pencil-line.svg
│   │   ├── small-add.svg
│   │   ├── square-behind-square.svg
│   │   ├── trash-can.svg
│   │   ├── vertical-dot-grid.svg
├── components/
│   ├── AddPageButton.tsx
│   ├── DraggablePageItem.tsx
│   ├── FormPage.tsx
│   ├── icons.tsx
│   ├── PageButton.tsx
│   ├── PageNavigation.tsx
│   ├── SettingsMenu.tsx
```

## Technologies Used

- **Next.js**: Framework for React applications.
- **Framer Motion**: Library for animations and gestures.
- **Tailwind CSS**: Utility-first CSS framework.
- **@svgr/webpack**: SVG-to-React component transformer.

## License

This project is licensed under the MIT License.
