import Queue from "bull";
import redisConfig from "../../config/redis";

import * as jobs from "../index";

const queues = Object.values(jobs).map(job => ({
  bull: new Queue(job.key, {
    redis: {
      host: redisConfig.host,
      port: parseInt(redisConfig.port)
    }
  }),
  name: job.key,
  handle: job.handle,
  options: job.options,
}));

export default {
  queues,
  add(name, data) {
    const queue = this.queues.find(queue => queue.name === name);
    
    console.log("H: ", redisConfig.host);
    console.log("P: ", parseInt(redisConfig.port));

    return queue.bull.add(data, queue.options);
  },
  process() {
    return this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on('failed', (job, err) => {
        console.log('Job failed', queue.key, job.data);
        console.log(err);
      });
    })
  }
};