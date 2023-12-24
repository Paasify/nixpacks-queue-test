import { Router } from "express";
import { createHash } from "crypto";
import { addToNixpacksQueue } from "./queue/nixpacks";

const routes = Router();

routes.get("/", (req, res) => {
  return res.json({ message: "Hello World" });
});

// Nixpacks Test Routes
routes.post("/add-to-build", async (req, res) => {
  const { name, url } = req.body;

  // Create a md5 hash of url and assign it to id
  const id = createHash("md5").update(url).digest("hex");

  const dataToAdd = {
    id,
    name,
    url,
  };

  const response = await addToNixpacksQueue(dataToAdd);

  console.log(response);

  return res.status(200).json({
    message: "Added to build queue",
    // jobId: jobId,
  });
});

routes.get("/build-status", (req, res) => {
  return res.json({ message: "Status" });
});

routes.get("/result", (req, res) => {
  return res.json({ message: "Result" });
});

export default routes;
