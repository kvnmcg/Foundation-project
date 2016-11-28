# Foundation 6 Project
Basic template for a project that uses [Zurb Foundation 6](http://foundation.zurb.com/sites/docs/) framework.

# Development dependencies
This project uses [Yarn](https://yarnpkg.com) to manage dependencies. On macOS install via npm if you have it:

```
npm install yarn -g
```

Or install via Homebrew:

```
brew update
brew install yarn
```

[Other operating system installation intructions.](https://yarnpkg.com/en/docs/install)

Then run Yarn to install the dependencies:

```
yarn
```

# Gulp
Gulp is the chosen task runner for this project. To use Gulp simply run:

```
gulp
```

Configuration can be found in `Gulpfile.js`.

# Zurb Foundation
[Foundation 6](http://foundation.zurb.com/sites/docs/) is used for front end development. The SASS (SCSS) version is included in the dependencies and is compiled in to CSS via:

```
gulp sass
```

# jQuery
The Foundation framework depends on [jQuery](http://jquery.com) (v2.2) for some of its functionality and is included as a dependency of the framework.
