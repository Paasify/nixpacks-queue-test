import { Router } from "express";
import { createHash } from "crypto";
import { addToNixpacksQueue, getNixpacksJobStatus } from "./queue/nixpacks";
import { isValidGitUrl } from "./utils/gitUtils";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

// Nixpacks Test Routes
routes.post("/add-to-build", async (req, res) => {
  const { name, url } = req.body;

  // Valid Git Repo URL or not
  const isValidUrl = await isValidGitUrl(url);
  if (!isValidUrl) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  // Create a md5 hash of url and assign it to id
  const id = createHash("md5").update(url).digest("hex");

  const dataToAdd = {
    id,
    name,
    url,
  };

  const response = await addToNixpacksQueue(dataToAdd);

  return res.status(200).json({
    message: "Added to build queue",
    jobId: response.id,
  });
});

routes.get("/build-status", async (req, res) => {
  const { jobId } = req.query;

  const job = await getNixpacksJobStatus(jobId as string);

  if (job == null) {
    return res.status(404).json({ message: "Job not found" });
  } else {
    const state = await job.getState();
    return res.status(200).json({ state, job });
  }
});

routes.get("/result", (req, res) => {
  return res.json({ message: "Result" });
});

export default routes;
