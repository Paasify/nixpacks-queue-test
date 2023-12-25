import { Worker, Job } from "bullmq";
import { buildDockerImage, cloneRepository } from "./builderUtils";

console.log("Worker running!");

const worker = new Worker(
    "nixpacks-builds",
    async (job: Job) => {
        try {
            console.log("Processing job:", job.id);

            const { id, name, url } = job.data;

            // Cloning the repository
            const repoDir = `/tmp/repo-${id}`
            const res = await cloneRepository(url, repoDir);
            console.log("Res", res);

            // Building the docker image using Nixpacks
            const result = await buildDockerImage(id, name, repoDir as string);

            console.log("Job completed:", result);

            await job.updateProgress(100);
            await job.moveToCompleted("done", job.id, true);
        } catch (error) {
            console.log("Error processing job:", error);
            await job.moveToFailed(
                {
                    name: error.name,
                    message: error.message,
                },
                job.id,
                true
            );
        }
    },
    {
        connection: {
            host: "localhost",
            port: 6379,
        },
    }
);

worker.on("error", (err) => {
    console.error(err)
})