import HealthTest from './cases/health';

export let options = {
    stages: [
        { duration: '30s', target: 20 },
        { duration: '1m30s', target: 10 },
        { duration: '20s', target: 0 }
    ]
};

/**
 * Entry point for all load tests
 */
export default function() {
    HealthTest();
}
