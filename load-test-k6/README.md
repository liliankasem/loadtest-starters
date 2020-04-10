# Load Testing

## Setup

### Prerequisites

- Install the latest version of node.js
  - <https://nodejs.org/en/download/>

### K6 Installation

Read more about [k6 setup](https://k6.io/docs/getting-started/installation)

#### Windows Setup

- Download the installer:
  - <https://dl.bintray.com/loadimpact/windows/k6-v0.26.1-amd64.msi>

#### Mac Setup

- Run `brew install k6`

## Running the project

Read more about [how to run k6](https://k6.io/docs/getting-started/running-k6)

- `npm install`
- `export TARGET_URL=http://<YOUR_TARGET_URL>`

### Option 1: Bundle

Bundle the project and run all the tests together:

- `npm run bundle`
- `npm start`

> Currently, webpack is configured to also package each test individually so you can run them alone:
>
> For example: `k6 run dist/health.bundle.js`

### Option 2: Single Test File

Run a test file directly:

- `k6 run <PATH_TO_JS_FILE>`
- Example: `k6 run src/cases/health.js`

### Option 3: Docker

Run docker. This approach uses the Dockerfile which uses the bundle.

- `npm run bundle`
- Update the `TARGET_URL` in the docker-compose file
- `docker-compose up`
  - Add `--build` at the end of the above command if you need to rebuild the image

## Run linting

This project uses `eslint`

- To check for lint error, run `npm run check`
- To automatically fix lint errors, run `npm run fix`

## Contributing

When you create a new test:

1. Create the test inside the `src/cases/` directory
1. Update `src/index.js` with an import for the new test, for example:

    ``` js
    import HealthTest from "./cases/health";

    export default function() {
      HealthTest();
    }
    ```

1. Update `webpack.config.js` and add an `entry` for your new test, for example:
   - `entry: { health: './src/cases/health.js' }`

## Useful Info

- [Using k6 documentation](https://k6.io/docs/using-k6)
