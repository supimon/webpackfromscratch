## Boilerplate for HTML development in AUKI

### Cloning and Setting up the project

- Clone the repository and run "npm install"

### Adding a new page

- New pages are to be created within the pages directory inside the src directory.
- A couple of pages are created already for quick reference.

- In order for webpack to pick up these new pages, include them in the following array

  `const pagesArr = ["component1Page", "component2Page"];` on line 3 in the pages.js in the config directory.

- make sure to name the pug, scss and js file the same as the page name (check the existing pages to learn more).

PENDING OPTIMISATIONS:

- to automatically detect pages in the pages directory and create build files.
- JS optimisations such as scope-hoisting, pre-evaluation and improving parsing.

### Understanding the dist directory

- Each page has 2 chunks of JS files, one within the corresponding page folder and one within the vendor directory.

  -- `dist`

  ---- `<page name>`

  ------ `<page name>.html`

  ------ `<page name>.css`

  ------ `<page name>.js`

  ---- `vendor`

  ------ `<page name>`

  -------- `<page name>.js`

* Unfortunately at this point in time, I could not figure out a reliable and automated way to have a common vendor chunk for all the pages. This would mean there could be repetitions in the vendor folder.

PENDING OPTIMISATIONS:

- to create common vendor chunks.
- to figure out a way to get the clean-webpack-plugin to work in multi-entry mode.
- install webpack-spritesmith without vulnerabilities.
- avoid double license entries in vendor chunks.
- image optimisations.
- code splitting.
- dynamic image loading.
