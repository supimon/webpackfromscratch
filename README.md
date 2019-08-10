## Boiler plate for HTML development in AUKI

### Adding a new page

- New pages are to be created within the pages directory inside the src directory.
- A couple of pages are created already for quick reference.

- In order for webpack to pick up these new pages, include them in the following array
  `const pagesArr = ["component1Page", "component2Page"];` on line 3 in the pages.js in the config directory.

- make sure to name the pug, scss and js file the same as the page name (check the existing pages to learn more).
