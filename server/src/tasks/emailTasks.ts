import { addToQueue } from '../config/bullmqConfig';

export const scheduleEmailProcessing = async (data: any) => {
  await addToQueue(data);
};
