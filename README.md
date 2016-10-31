# React Redux Boilerplate
This is meant as a starter for React projects using tools, patterns and practices that represent the current state of the art in JavaScript development. In those areas where this project fails to achieve that standard, contributions are most welcome! If you'd like to get started using this project quickly, simply clone the repository and type:

`npm install`

To build the dev environment with hot reloading of JS and CSS, type:

`npm run browser`

To build for production w/ server rendering, type:

`npm run server`

By default, the site is available at http://localhost:3000

If you would like to contribute to this project, fork the repo and submit pull requests. JavaScript code should use the latest JS syntax (ES6 and/or ES7). React components that don't need access to either state or React lifecycle methods should be written as [stateless functional components](https://egghead.io/lessons/react-building-stateless-function-components-new-in-react-0-14).

If you are suggesting a major overhaul of some aspect of this project, please submit an issue with your idea and allow some discussion before commencing work.

## Tools Included in this Project

The intention is to provide a basic, but comprehensive, skeleton for React projects. The tools included are:

- React (of course)
- Redux (state management)
- React Router (routing)
- webpack (bundling assets)
- PostCSS (processing of CSS)
- Stylelint and eslint (modified AirBnB)
- Mocha and Chai (testing)
- Babel (latest JS)
- ghooks (run tasks using git hooks like commit, pre-push)

All of these are currently mainstream tools for building modern JavaScript applications, however, it may be useful to discuss the rationale for the inclusion of some of these tools.

#### Redux
Redux is both a library and an architecture. It is influenced by Flux, Immutable.js and other prior work. As Facebook are the authors of React and they have famously used Flux in their work, why would one choose instead to use Redux?

Dan Abramov, the creator of Redux, posted a response on [Stack Overflow](http://stackoverflow.com/questions/32461229/why-use-redux-over-facebook-flux) about how/why Redux may be preferred over Flux. It provides valuable insight into the major benefits of Redux.

#### PostCSS
If you're familiar with Sass, then writing CSS within this boilerplate project will come easily to you. Although Sass itself is not included, support for Sass syntax has been added due to its popularity. Why not just use Sass? PostCSS can do everything Sass can do, but more. Or less. It's up to the devs on the team to trick it out as they see fit. Also, you can do a lot with PostCSS that isn't possible with Sass.

If you really don't like PostCSS and want Sass, it's very easy to swap out PostCSS for node-sass.

## Other Things that May Come Up
There may also be questions about some things which are either missing (no task runners) or perhaps structured/configured in an unfamiliar way.

#### No Gulp or Grunt
This project uses npm scripts to run the few tasks needed to build and serve the app. The scripts are located in `package.json`. If you need to add some task to these scripts, look for documentation on either the CLI or Node API for the tool you are considering.

#### File structure
The file structure for this project uses a modular pattern that is common in JavaScript projects, but may be unfamiliar to some developers. Under `src/components`, find the `HomePage` directory.

The file structure there is the pattern used through this project. All of the JS and CSS pertaining to that particular component are grouped together in a single place. This has proven to be a very helpful way of organizing a React/JS project.

If you are worried about "separation of concerns", please see MPJ's [humorous rant](https://www.youtube.com/watch?v=0ZNIQOO2sfA) on the topic.

Another quick note, the components designated as "pages" - HomePage, PostPage - are [container components](http://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components).

#### ghooks
Note that linting is performed on each commit and tests are run on pre-push. These tasks are courtesy of [ghooks](https://www.npmjs.com/package/ghooks). For reference, the ghooks config for this project is near the bottom of `package.json`.

#### Import of CSS
Take a look at `src/components/HomePage.js`. Near the top of that file you will see a conditional import of the `HomePage.css` file. This is how CSS imports with webpack work.

In a dev environment (what you get when you type `npm run browser`), the CSS is injected into the `<HEAD>` of the document. A change to CSS will result in the style being quickly hotloaded into the browser - no lengthy rebuilds or refreshes needed.

In a production environment, the CSS files are bundled into a single file, `bundle.css` that is included in the page via the `<LINK>` tag. Take a look at  `src/middleware.js` to see this in action.

Other methods of building and loading CSS have proved slower/clunkier than webpack. However, there is a minor annoyance that comes with webpack.

#### Imports of CSS Variables
If the CSS file you are working in uses variables or mixins, it will have to import those files before they can be used. Webpack does not yet support global variables. This is true for Sass, Less and PostCSS.

## Credits
The biggest influence on this project is the Redux documentation. Redux is the rare library that is not only an outstanding work of code, but is accompanied by clear and thorough documentation. Reading the [Redux documentation](http://redux.js.org/) will help you understand most of the code in this project.
