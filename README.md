# Nuxt-BetterAuth-Boilerplate

> **Current version 1.0.1-beta** A frontend boilerplate for Nuxt applications using Better-Auth for authentication.

This project is being created to learn and provide a template for me and others to quickly set up a frontend application using [Nuxt](https://nuxt.com/) to avoid having to rewrite the same code for every project, to help focus on the unique features of the application and not have to worry about building from scratch every time.

This boilerplate is using [Better-Auth](https://better-auth.com/) Client's library for handling authentication; it uses TypeScript for type safety and a better development experience, and it's designed to seamlessly integrate with my backend template, [Express-BetterAuth-Boilerplate](https://github.com/mrmovas/Express-BetterAuth-Boilerplate)

---

## Tech Stack

| Technology | Purpose |
|------------|---------|
| [Nuxt](https://nuxt.com/) | The main framework for building the frontend application. |
| [Tailwind CSS](https://tailwindcss.com/) | A utility-first CSS framework for styling the application. |
| [Better-Auth Client](https://better-auth.com/) | A library for handling the authentication |
| [TypeScript](https://www.typescriptlang.org/) | A superset of JavaScript that adds static typing for better code quality and developer experience. |
| libphonenumber-js | A library for parsing, formatting, and validating international phone numbers. |

| Nuxt Modules: | |
| ------------ |---------|
| [nuxt-security](https://nuxt.com/modules/security) | Provides security headers and best practices for Nuxt applications. |

---

## Getting Started

### Setup

1. Clone the repository:

```bash
git clone https://github.com/mrmovas/Nuxt-BetterAuth-Boilerplate.git
cd Nuxt-BetterAuth-Boilerplate
```

2. Install dependencies:

```bash
npm install
```

### Configuration

1. Change the `example.env` file to `.env` and update the environment variables as needed:


### Development Server

```bash
npm run dev
```

### Build for Production

Build for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## Contributing

Contributions are welcome! If you have any suggestions, improvements or bug reports, please feel free to open an issue or submit a pull request.

To create a pull request, follow these steps:
- Fork the repository and create a new branch (e.g., `feature/new-feature` or `fix/fix-reset-password`).
- Make your changes and commit them with clear and descriptive messages.
- Push your changes and open a pull request against the `main` branch of this repository.

Please keep changes focused, large pulled requests may be harder to review and merge. 

---

## License

[MIT](./LICENSE) — use it, fork it, ship it. Attribution appreciated but not required.