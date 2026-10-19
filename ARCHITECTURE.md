# Luis Orellana Portfolio: Architecture and Development Guide

This document is the working blueprint for continuing the portfolio. It describes what the site should become, how the code should be organized, the rules to follow, a practical delivery plan, and resources for learning the tools involved.

## 1. Product goal

The portfolio should quickly answer four questions for a recruiter, client, or fellow developer:

1. Who is Luis Orellana?
2. What kind of software does he build?
3. What evidence demonstrates his skills?
4. How can someone contact him?

The finished site should be fast, responsive, accessible, easy to update, and focused on real project outcomes rather than long descriptions.

## 2. Current state

The repository is a client-side React application built with Vite. It currently uses:

- React 19 for the interface.
- React Router for page navigation.
- CSS and CSS Modules for styling.
- ESLint for static analysis.
- Vite for local development and production builds.

Current routes are `/`, `/about`, `/projects`, and `/blog`. The home page also contains an About section. Project data is currently declared inside the Projects component, and the blog is a placeholder.

Before adding major features, fix these known issues:

- Replace all Lorem Ipsum with concise, authentic portfolio copy.
- Fix corrupted characters such as `Iâ€™m` and `ðŸ‘‹` by ensuring files are saved as UTF-8.
- Choose one About experience: a section on Home or a separate `/about` page. The recommended choice is a short Home preview linked to a detailed About page.
- Correct hash navigation and active-link behavior. Route navigation and section scrolling should not rely directly on `window.location` during rendering.
- Replace inline styles with reusable classes or CSS Modules.
- Add project descriptions, outcomes, screenshots, repository links, and live demo links.
- Replace the starter README with project-specific setup and deployment instructions.

## 3. Recommended application architecture

Keep the application as a static single-page portfolio until a real requirement needs a backend. Project and blog content can initially live in local data files. This keeps hosting simple, makes the site fast, and avoids unnecessary infrastructure.

```text
src/
|-- app/
|   |-- App.jsx                 # Routes and application shell
|   `-- routes.jsx              # Route definitions if routing grows
|-- assets/
|   |-- images/
|   `-- icons/
|-- components/
|   |-- common/                 # Button, Container, SectionHeading, Tag
|   |-- layout/                 # Header, Footer, MobileMenu
|   `-- project/                # ProjectCard, ProjectGrid
|-- data/
|   |-- projects.js             # Portfolio project records
|   `-- posts.js                # Blog metadata while posts are local
|-- hooks/                      # Reusable browser/UI behavior
|-- pages/
|   |-- Home/
|   |-- About/
|   |-- Projects/
|   |-- ProjectDetail/
|   |-- Blog/
|   |-- BlogPost/
|   `-- NotFound/
|-- styles/
|   |-- tokens.css              # Colors, typography, spacing, breakpoints
|   |-- globals.css             # Reset and global element styles
|   `-- utilities.css           # A small set of shared utility classes
|-- test/
|   `-- setup.js
`-- main.jsx
```

Do not reorganize every file at once. Move files as each related feature is improved, keeping the app runnable after every commit.

### Component responsibilities

- **Pages** assemble complete screens and own page-level metadata.
- **Layout components** define shared site structure such as the header, navigation, main container, and footer.
- **Common components** are small, reusable, and presentation-focused.
- **Feature components** represent domain concepts such as a project card.
- **Data files** hold content, not rendering logic.
- **Hooks** hold reusable stateful behavior; do not create a hook for logic used only once unless it materially improves clarity.

### Data model

Start with a project shape like this:

```js
{
  slug: "daypilot",
  title: "DayPilot Productivity App",
  summary: "A short explanation of the problem and solution.",
  problem: "The user problem this project addresses.",
  solution: "How the application solves it.",
  outcome: "A measurable result or what Luis learned.",
  technologies: ["Kotlin", "Firebase", "FastAPI"],
  image: "/images/projects/daypilot.webp",
  repositoryUrl: "https://github.com/...",
  demoUrl: "https://...",
  featured: true
}
```

Use a slug for stable detail-page URLs such as `/projects/daypilot`. Optional values should be omitted or set to `null`, and the UI should hide links that do not exist.

## 4. Engineering rules

### React and JavaScript

- Use functional components and hooks.
- Use PascalCase for component names, camelCase for variables/functions, and descriptive names instead of abbreviations.
- Keep components focused. Extract a component when it is reused or when a page becomes difficult to understand.
- Keep render functions free of side effects. Browser listeners and synchronization belong in effects with cleanup functions.
- Store the minimum state necessary. Derive filtered or formatted values instead of duplicating them in state.
- Put stable portfolio content in `src/data`; do not hard-code repeated content in JSX.
- Use array item IDs or slugs as keys, never array indexes for content that can change order.
- Prefer semantic HTML (`header`, `nav`, `main`, `section`, `article`, `footer`) over generic `div` elements.
- Do not introduce a state-management library unless shared state becomes genuinely complex. React state and context are sufficient for this site.

### Styling and responsive design

- Define design tokens for color, spacing, font sizes, radii, shadows, and content widths.
- Use CSS Modules for component-specific styles and global CSS only for tokens, resets, typography, and shared utilities.
- Avoid inline styles except for values that are truly calculated at runtime.
- Build mobile-first, then add breakpoints based on layout needs rather than device brands.
- Keep text lines readable (roughly 60–75 characters for long-form text).
- Provide visible hover and keyboard-focus states.
- Respect `prefers-reduced-motion` and never make animation necessary to understand content.

### Accessibility

- The entire site must work with a keyboard.
- Use one descriptive `h1` per page and preserve heading order.
- Every meaningful image needs useful alternative text; decorative images should use an empty `alt` value.
- Links must describe their destination. Avoid vague text such as "click here."
- Form inputs require labels, helpful validation messages, and clear success/error states.
- Maintain sufficient color contrast and never use color as the only signal.
- Include a skip link that moves focus to the main content.
- Test at 200% browser zoom and with reduced motion enabled.

### Content and assets

- Write in first person and use short, direct sentences.
- Explain the problem, contribution, technical decisions, and result for every project.
- Never publish private credentials, private client information, or personal contact details beyond those intentionally shared.
- Resize images to their displayed dimensions, prefer WebP/AVIF where practical, and provide width/height to reduce layout shift.
- Keep downloadable files, such as a resume, in `public/` and use clear version-independent filenames.

### Git workflow

- Branch from `main` for meaningful features: `feature/project-details` or `fix/mobile-navigation`.
- Make small commits that leave the project in a working state.
- Use imperative commit messages, for example: `Add responsive project grid`.
- Do not mix formatting, refactoring, and new functionality in one commit.
- Before opening or merging a pull request, run `npm run lint` and `npm run build`, plus tests once they are configured.
- Never commit `.env` files, API keys, build output, or editor-specific files.

## 5. Quality strategy

Add Vitest, React Testing Library, `@testing-library/jest-dom`, and `@testing-library/user-event` when interactive components are introduced.

Test behavior that visitors depend on:

- Navigation opens the correct page and the mobile menu is keyboard accessible.
- Project cards show content from the data model and omit unavailable links.
- Project filters return the expected items, if filters are added.
- The contact form validates input and reports submission states, if a form is added.
- Unknown URLs render a useful Not Found page.

Also perform these manual checks before releases:

- Test current Chrome, Firefox, and Edge, plus a narrow mobile viewport.
- Navigate every interactive element using only Tab, Shift+Tab, Enter, Escape, and arrow keys where appropriate.
- Run Lighthouse and investigate accessibility, performance, SEO, and best-practice regressions.
- Check every external link and verify the production build locally.

Suggested package scripts after tests are configured:

```json
{
  "test": "vitest",
  "test:run": "vitest run",
  "test:coverage": "vitest run --coverage"
}
```

## 6. Delivery roadmap

### Phase 1: Foundation and content

1. Replace placeholder and corrupted text.
2. Define the site message, target audience, short biography, resume link, social links, and preferred contact method.
3. Create design tokens and establish mobile typography and spacing.
4. Build a shared page container, header, navigation, skip link, and footer.
5. Resolve the Home/About duplication and add a Not Found route.
6. Replace the template README with repository-specific instructions.

**Done when:** all routes contain real content, navigation works at mobile and desktop sizes, lint/build pass, and the site can be understood in under a minute.

### Phase 2: Project case studies

1. Move project records into `src/data/projects.js`.
2. Create reusable `ProjectCard` and `ProjectGrid` components.
3. Add project screenshots with optimized formats and meaningful alt text.
4. Create `/projects/:slug` detail pages.
5. Write a case study for each serious project: context, problem, role, decisions, challenges, result, and lessons.
6. Add repository and demo links only when they are public and working.

**Done when:** at least three projects have evidence-rich case studies and every project link behaves correctly.

### Phase 3: Confidence and polish

1. Add Vitest and React Testing Library.
2. Test navigation and the primary project components.
3. Add document titles and descriptions per route. Consider `react-helmet-async` only if simple route-level handling becomes repetitive.
4. Add Open Graph metadata, a favicon, a social preview image, `robots.txt`, and `sitemap.xml`.
5. Audit keyboard behavior, focus, contrast, reduced motion, responsive layouts, and image sizes.
6. Add a CI workflow that runs lint, tests, and build for pull requests.

**Done when:** automated checks pass, accessibility checks find no critical issues, and a production build has no console errors.

### Phase 4: Blog and contact features

1. Decide whether the blog provides enough ongoing value to maintain.
2. If yes, begin with local Markdown/MDX content and front matter; add a CMS only when editing without Git becomes a requirement.
3. Add tags, published dates, readable article URLs, and code-block styling.
4. Prefer direct email and professional-profile links initially. Add a contact service or backend only if a real form is required.
5. If a form is added, include spam protection, server-side validation, privacy messaging, and accessible status feedback.

**Done when:** publishing is documented and repeatable, or the unused Blog route has been removed instead of remaining as a placeholder.

### Phase 5: Deployment and maintenance

1. Choose a static host such as GitHub Pages, Cloudflare Pages, Netlify, or Vercel.
2. Configure SPA fallback so direct visits to routes do not return 404 errors.
3. Connect a custom domain and enforce HTTPS if a domain is available.
4. Add privacy-friendly analytics only if there is a specific question to answer.
5. Review dependencies monthly, verify links quarterly, and refresh projects/resume whenever experience changes.

**Done when:** deployment is reproducible from `main`, routes work when opened directly, and the maintenance routine is documented.

## 7. Definition of done for every change

A change is complete only when:

- The requirement and visitor value are clear.
- Loading, empty, error, and missing-data states are considered where relevant.
- The layout works from small mobile screens through desktop.
- Keyboard navigation and visible focus are verified.
- New images are optimized and accessible.
- Repeated content is data-driven rather than copied across components.
- `npm run lint` and `npm run build` pass.
- Relevant tests pass or are added for new interactive behavior.
- Documentation is updated when setup, architecture, or behavior changes.
- No secrets, debug output, or placeholder content are committed.

## 8. Recommended research resources

Prefer primary documentation over tutorials because it is more likely to match the installed versions.

### Core stack

- [React Learn](https://react.dev/learn) — components, state, effects, and React mental models.
- [Thinking in React](https://react.dev/learn/thinking-in-react) — breaking interfaces into components and defining state.
- [Vite Guide](https://vite.dev/guide/) — development, assets, configuration, and builds.
- [Vite static deployment guide](https://vite.dev/guide/static-deploy.html) — host-specific deployment instructions.
- [React Router declarative routing](https://reactrouter.com/start/declarative/routing) — routes, links, nested layouts, and URL parameters.
- [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn_web_development) — HTML, CSS, JavaScript, responsive design, and browser APIs.

### Testing and quality

- [Vitest Guide](https://vitest.dev/guide/) — Vite-native test configuration and commands.
- [React Testing Library introduction](https://testing-library.com/docs/react-testing-library/intro/) — user-focused component testing.
- [Testing Library query guidance](https://testing-library.com/docs/queries/about/#priority) — accessible test queries in recommended order.
- [ESLint documentation](https://eslint.org/docs/latest/) — lint configuration and rule reference.
- [web.dev Lighthouse documentation](https://developer.chrome.com/docs/lighthouse/overview/) — interpreting automated audits.

### Accessibility, performance, and SEO

- [WCAG 2.2 Quick Reference](https://www.w3.org/WAI/WCAG22/quickref/) — filterable accessibility requirements and techniques.
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/) — patterns for accessible interactive widgets. Prefer native HTML before ARIA.
- [web.dev accessibility course](https://web.dev/learn/accessibility/) — practical accessibility fundamentals.
- [web.dev performance course](https://web.dev/learn/performance/) — images, loading, Core Web Vitals, and performance measurement.
- [Google Search SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) — crawlable content, page titles, descriptions, and site organization.

### Deployment

- [GitHub Pages documentation](https://docs.github.com/en/pages) — repository-based static hosting.
- [Cloudflare Pages documentation](https://developers.cloudflare.com/pages/) — Git-connected static deployment.
- [Netlify Vite guide](https://docs.netlify.com/frameworks/vite/) — Vite builds and SPA deployment.
- [Vercel Vite documentation](https://vercel.com/docs/frameworks/frontend/vite) — Vite configuration and rewrites.

## 9. Decision log

Record important architectural decisions here so future changes remain intentional.

| Date | Decision | Reason |
| --- | --- | --- |
| 2026-10-19 | Keep the portfolio as a static React/Vite application initially. | The current content does not require a server, and static hosting minimizes cost and maintenance. |
| 2026-10-19 | Store projects in local structured data before adopting a CMS. | Local data is simple, versioned, and sufficient for a small portfolio. |
| 2026-10-19 | Prefer CSS Modules plus shared design tokens. | This matches the existing stack while keeping component styles scoped and the visual system consistent. |

Add a row whenever the team adopts a major dependency, backend, CMS, analytics tool, hosting model, or content strategy.
