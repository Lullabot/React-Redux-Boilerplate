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

Below is an abridged response from Dan Abramov, the creator of Redux, on [Stack Overflow](http://stackoverflow.com/questions/32461229/why-use-redux-over-facebook-flux) about how/why Redux may be preferred over Flux. It's a lengthy quote, but provides valuable insight into the major benefits of Redux.

> Redux is not that different from Flux. Overall it's the same architecture, but Redux is able to cut some complexity corners by using functional composition where Flux uses callback registration.

> It's not fundamentally different, but I find it that Redux makes certain abstractions easier, or at least possible to implement, that would be hard or impossible to implement in Flux.

> #### Reducer Composition

> Take, for example, pagination. My Flux + React Router example handles pagination, but the code for that is awful. One of the reasons it's awful is that Flux makes it unnatural to reuse functionality across stores. If two stores need to handle pagination in response to different actions, they either need to inherit from a common base store (bad! you're locking yourself into a particular design when you use inheritance), or call a function from the handler, which will need to somehow operate on the Flux store's private state. The whole thing is messy (although definitely in the realm of possible).

> On the other hand, with Redux pagination is natural thanks to reducer composition. It's reducers all the way down, so you can write a reducer factory that generates pagination reducers and then use it in your reducer tree. The key to why it's so easy is because in Flux, stores are flat, but in Redux, reducers can be nested via functional composition, just like React components can be nested.

> #### Server Rendering

> People have been rendering on the server fine with Flux, but seeing that we have 20 Flux libraries each attempting to make server rendering “easier”, perhaps Flux has some rough edges on the server. The truth is Facebook doesn't do much server rendering, so they haven't been very concerned about it, and rely on the ecosystem to make it easier...

>Redux...goes further: since there is just a single store (managed by many reducers), you don't need any special API to manage the (re)hydration. You don't need to “flush” or “hydrate” stores—there's just a single store, and you can read its current state, or create a new store with a new state. Each request gets a separate store instance.

>Again, this is a case of something possible both in Flux and Redux, but Flux libraries solve this problem by introducing a ton of API and conventions, and Redux doesn't even have to solve it because it doesn't have that problem in the first place thanks to conceptual simplicity.

>#### Developer Experience

>I didn't actually intend Redux to become a popular Flux library—I wrote it as I was working on my ReactEurope talk on hot reloading with time travel. I had one main objective: make it possible to change reducer code on the fly or even “change the past” by crossing out actions, and see the state being recalculated.

>I haven't seen a single Flux library that is able to do this. React Hot Loader also doesn't let you do this—in fact it breaks if you edit Flux stores because it doesn't know what to do with them.

>When Redux needs to reload the reducer code, it calls replaceReducer(), and the app runs with the new code. In Flux, data and functions are entangled in Flux stores, so you can't “just replace the functions”. Moreover, you'd have to somehow re-register the new versions with the Dispatcher—something Redux doesn't even have.

>#### Ecosystem

>Redux has a rich and fast-growing ecosystem. This is because it provides a few extension points such as middleware. It was designed with use cases such as logging, support for Promises, Observables, routing, immutability dev checks, persistence, etc, in mind. Not all of these will turn out to be useful, but it's nice to have access to a set of tools that can be easily combined to work together.

> #### Simplicity

>Redux preserves all the benefits of Flux (recording and replaying of actions, unidirectional data flow, dependent mutations) and adds new benefits (easy undo-redo, hot reloading) without introducing Dispatcher and store registration.

>Keeping it simple is important because it keeps you sane while you implement higher-level abstractions.

>Unlike most Flux libraries, Redux API surface is tiny. If you remove the developer warnings, comments, and sanity checks, it's 99 lines. There is no tricky async code to debug.

>You can actually read it and understand all of Redux.

#### PostCSS
If you're familiar with Sass, then writing CSS within this boilerplate project will come easily to you. Although Sass itself is not included, support for Sass syntax has been added due to its popularity. Why not just use Sass? PostCSS can do everything Sass can do, but more. Or less. It's up to the devs on the team to trick it out as they see fit. Also, you can do a lot with PostCSS that isn't possible with Sass.

If you really don't like PostCSS and want Sass, it's very easy to swap out PostCSS for node-sass.

## Other Things that May Come Up
There may also be questions about some things which are either missing (no task runners) or perhaps structured/configured in an unfamiliar way.

#### No Gulp or Grunt
This project uses npm scripts to run the few tasks needed to build and serve the app. The scripts are located in `package.json`. If you need to add some task to these scripts, look for documentation on either the CLI or Node API for the tool you are considering.

#### File structure
The file structure for this project uses a modular pattern that is common in JavaScript projects, but may be unfamiliar to some developers. Under `src/containers`, find the `Home` directory.

The file structure there is the pattern used through this project. All of the JS and CSS pertaining to that particular component are grouped together in a single place. This has proven to be a very helpful way of organizing a React/JS project.

If you are worried about "separation of concerns", please see MPJ's [humorous video](https://www.youtube.com/watch?v=0ZNIQOO2sfA) on the topic.

#### Import of CSS
Take a look at `src/containers/Home.js`. Near the top of that file you will see a conditional import of the `Home.css` file. This is how CSS imports with webpack work.

In a dev environment (what you get when you type `npm run browser`), the CSS is injected into the `<HEAD>` of the document. A change to CSS will result in the style being quickly hotloaded into the browser - no lengthy rebuilds or refreshes needed.

In a production environment, the CSS files are bundled into a single file, `bundle.css` that is included in the page via the `<LINK>` tag. Take a look at  `src/middleware.js`.

Other methods of building and loading CSS have proved slower/clunkier than webpack. However, there is a minor annoyance that comes with webpack.

#### Imports of CSS Variables
If the CSS file you are working in uses variables or mixins, it will have to import those files before they can be used. Webpack does not yet support global variables. This is true for Sass, Less and PostCSS.

## Credits
The biggest influence on this project is the Redux documentation. Redux is the rare library that is not only an outstanding work of code, but is accompanied by clear and thorough documentation. Reading the [Redux documentation](http://redux.js.org/) will help you understand most of the code in this project.

Another major influence is work on the NBC.com project. This is evident primarily in the testing set up, file structure and build process.

Finally, there is a guy named Justin Jung who helped point the way to a good solution for server side rendering with webpack.
