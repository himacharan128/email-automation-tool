import { Queue, Worker, QueueScheduler } from 'bullmq';

const emailQueue = new Queue('emailQueue', {
  defaultJobOptions: {
    removeOnComplete: true,
    removeOnFail: true,
  },
  limiter: {
    max: 1000,
    duration: 1000 * 60,
  },
});

const queueScheduler = new QueueScheduler('emailQueue');

export const addToQueue = async (data: any) => {
  await emailQueue.add('processEmail', data);
};

const worker = new Worker('emailQueue', async job => {
  console.log(`Processing job ${job.id}`);
});

worker.on('completed', job => {
  console.log(`Job ${job.id} completed`);
});

export default emailQueue;
