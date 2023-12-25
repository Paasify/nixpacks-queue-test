import { Queue } from "bullmq";

const nixpacksQueue = new Queue("nixpacks-builds");

interface dataProps {
  id: string;
  name: string;
  url: string;
}

export const addToNixpacksQueue = async (data: dataProps) => {
  return await nixpacksQueue.add("build", data);
};

export const getNixpacksJobStatus = async (jobId: string) => {
  return await nixpacksQueue.getJob(jobId);
}