# Welcome to React Router!

A modern, production-ready template for building full-stack React applications using React Router.

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/remix-run/react-router-templates/tree/main/default)

## Features

- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)

## Getting Started

### Installation

Install the dependencies:

```bash
npm install
```

### Development

Start the development server with HMR:

```bash
npm run dev
```

Your application will be available at `http://localhost:5173`.

## Building for Production

Create a production build:

```bash
npm run build
```

## Deployment

This project is configured as a Single-Page Application (SPA) because `ssr: false` is set in `react-router.config.ts`. The deployment instructions below are for an SPA.

### Static Site Hosting

After running `npm run build`, a `build/client` directory will be created containing all the static assets for your application (`index.html`, JavaScript, CSS, etc.).

You can deploy the contents of this `build/client` directory to any static hosting service. Some popular options are:

- Vercel
- Netlify
- GitHub Pages
- Cloudflare Pages

The process generally involves:
1.  Connecting your Git repository to the hosting provider.
2.  Configuring the build command: `npm run build`.
3.  Configuring the publish directory: `build/client`.

Your site will then be built and deployed automatically on every push to your main branch.

#### Deploying to GitHub Pages

You can automate the deployment of your SPA to GitHub Pages using GitHub Actions.

1.  **Configure Repository Settings**:
    *   In your GitHub repository, go to the **Settings** tab.
    *   In the left sidebar, click on **Pages**.
    *   Under "Build and deployment", for the **Source**, select **GitHub Actions**.

2.  **Create a Workflow File**:
    *   Create a directory named `.github/workflows` in the root of your project if it doesn't already exist.
    *   Inside this directory, create a new file named `deploy.yml`.
    *   Copy and paste the following content into `deploy.yml`. This workflow builds your app and deploys the contents of `build/client` to GitHub Pages.

    ```yaml
    name: Deploy to GitHub Pages

    on:
      # Runs on pushes targeting the default branch
      push:
        branches: ["main"]

      # Allows you to run this workflow manually from the Actions tab
      workflow_dispatch:

    # Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
    permissions:
      contents: read
      pages: write
      id-token: write

    jobs:
      deploy:
        runs-on: ubuntu-latest
        environment:
          name: github-pages
          url: ${{ steps.deployment.outputs.page_url }}
        steps:
          - name: Checkout
            uses: actions/checkout@v4
          - name: Set up Node.js
            uses: actions/setup-node@v4
            with:
              node-version: "20"
              cache: "npm"
          - name: Install dependencies
            run: npm install
          - name: Build
            run: npm run build
          - name: Upload artifact
            uses: actions/upload-pages-artifact@v3
            with:
              path: './build/client'
          - name: Deploy to GitHub Pages
            id: deployment
            uses: actions/deploy-pages@v4
    ```

3.  **Commit and Push**:
    *   Commit the new `.github/workflows/deploy.yml` file and push it to your `main` branch.
    *   The GitHub Action will automatically run. You can monitor its progress in the **Actions** tab of your repository. Once it's complete, your site will be live at the URL provided in your repository's **Pages** settings.

### Note on Server-Side Rendering (SSR)

The original template for this project supports SSR. If you wish to enable it, you must set `ssr: true` in `react-router.config.ts`. If you do so, the deployment process will be different, as you will need a Node.js server environment to run the application. The Docker and DIY deployment methods described in the original template's README would then be applicable.


## Styling

This template comes with [Tailwind CSS](https://tailwindcss.com/) already configured for a simple default starting experience. You can use whatever CSS framework you prefer.

---

Built with ❤️ using React Router.
