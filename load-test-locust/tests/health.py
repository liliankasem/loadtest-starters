from locust import HttpLocust, TaskSet, between, task

# A TaskSet is a collection of tasks. These tasks are normal
# python callables. When a load test is started, each instance
# of the spawned Locust classes will start executing their TaskSet.


class HealthTasks(TaskSet):
    @task
    def info(self):
        response = self.client.get('/health')
        print('Response status code: ', response.status_code)

# A Locust class represents one user. Locust will spawn (hatch) one
# instance of the locust class for each user that is being simulated.
# HttpLocust will create a client attribute of instantiation.


class HealthTest(HttpLocust):
    task_set = HealthTasks
    wait_time = between(5.0, 9.0)
