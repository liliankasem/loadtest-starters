import http from 'k6/http';
import { group } from 'k6';

let duration = 500;
let rate = 0.1;

export let options = {
    thresholds: {
        'Health Check Duration': [`p(95)<${duration}`],
        'Health Check Rate': [`rate<${rate}`]
    }
};

/**
 * Test for the mdn info endpoint
 */
export default function() {
    group('health check', () => {
        let host = __ENV.TARGET_URL;
        let res = http.get(`${host}/health);
        check(res, { 'health check status was 200': r => r.status == 200 });
        sleep(1);
    });
}
