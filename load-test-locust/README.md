# Load Testing

## Setup

### Prerequisites

- Install python 3.8
  - Windows: <https://www.python.org/downloads/release/python-382/>
  - Mac: it is recommend to use `pyenv` to setup and manage python:
    - `brew install pyenv`
    - `pyenv install 3.8.2`
    - `pyenv global 3.8.2`
    - `echo -e 'if command -v pyenv 1>/dev/null 2>&1; then\n  eval "$(pyenv init -)"\nfi' >> ~/.zshrc`
    - Running `which python` should point to the .pyenv path e.g. `Users/USERNAME/.pyenv/shims/python`

- Setup virtual environment [optional]
  - `pip install virtualenv`
  - `cd load_test/` project
  - `virtualenv venv`
  - `source venv/bin/activate`

> Read more about [virtual environments](https://uoa-eresearch.github.io/eresearch-cookbook/recipe/2014/11/26/python-virtual-env/)

### Locust Installation

Read more about [locust setup](https://docs.locust.io/en/stable/installation.html)

#### Windows Setup

- Run `pip install locustio`

#### Mac Setup

- Run `brew install libev`
- Run `pip install locust`

## Running the project [standalone]

Read more about [how to start locust](https://docs.locust.io/en/stable/quickstart.html#start-locust)

Option 1:

- `locust -f tests/locustfile.py`
  - `locustfile.py` is the entry point and will run all of the load tests; you can run an individual test with `locust -f tests/<test_file>.py`

Option 2:

- Update the `TARGET_URL` environment variable in the docker-compose file
- `docker-compose -f docker-compose.standalone.yaml up`
  - Add `--build` at the end of the above command if you need to rebuild the image
- You can also uncomment the `LOCUST_OPTS` environment variable (line 14 of the dockerfile) if you would like to run locust without a web UI, and provide run parameters this way
  - Example: `--no-web -c 10 -r 600` == spawn 10 users every 600s
  - `-c` number of clients (number of users to spawn)
  - `-r` the hatch rate in seconds (number of users to spawn per second)
  - Other options:
    - `-t` run time (sets time limit on test)
    - `--stop-timeout` stop timeout (allow tasks to finish their iteration on shutdown, default is shutdown immediately)
    - `--csv=<FILE_PREFIX>` will periodically save two CSV files
      - CSV files will be named `FILE_PREFIX_response_times.csv` and `FILE_PREFIX_stats.csv`

> Locust web UI is available on `localhost:8089`

## Running the project [distributed]

- Update the `TARGET_URL` environment variable in the docker-compose file
- `docker-compose -f docker-compose.distributed.yaml up`

## Run linting

This project uses `pycodestyle` (previously known as pep8)

- Run `pycodestyle tests/`

## Contributing

When you create a new test:

1. Create the test inside the `tests/` directory
1. Update the `tests/locustfile.py` with an import for the new test
   - You don't need to import the task class, just the test class

Each test must contain a `Locust` "Test" class and a `TaskSet` class, see the [documentation on creating tests](https://docs.locust.io/en/stable/writing-a-locustfile.html)

The naming convention of these classes is:

- locust test class: `<TestBehaviour>Test`
- locust taskset class: `<TestBehaviour>Tasks`

> Example: SessionPanoramaTiles == **SessionPanoramaTiles**Test & **SessionPanoramaTiles**Tasks

## Useful Info

- [Writing locust tests](https://docs.locust.io/en/stable/writing-a-locustfile.html)
- [Locust API documentation](https://docs.locust.io/en/stable/api.html)

### Locust Order of events

Since many setup and cleanup operations are dependent on each other, here is the order which they are run:

- Locust setup (once)
- TaskSet setup (once)
- TaskSet on_start (once per locust)
- TaskSet tasks…
- TaskSet on_stop (once per locust)
- TaskSet teardown (once)
- Locust teardown (once)

In general, the setup and teardown methods should be complementary.
