import { Queue } from "bullmq";

const nixpacksQueue = new Queue("nixpacks-builds");

interface dataProps {
  id: string;
  name: string;
  url: string;
}

export const addToNixpacksQueue = async (data: dataProps) => {
  await nixpacksQueue.add("build", data);
};
