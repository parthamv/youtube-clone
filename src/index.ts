import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());


app.post("/process-video", (req, res) => {
  //Get path of the input video file from the request body
  const inputFilePath = req.body.inputFilePath;
  //Get path of the output video file from the request body
  const outputFilePath = req.body.outputFilePath;

  if(!inputFilePath || !outputFilePath) {
    res.status(400).send("Bad Request");
  }

  ffmpeg(inputFilePath)
    .outputOptions("-vf", "scale=-1:360")
    .on("end", () => {
      console.log("Video processing finished");
      res.status(200).send("Video processing finished");
    })
    .on ("error", (err) => {
      console.log(`An Error has occured: ${err.message}`);
      res.status(500).send("Internal Server Error");
    })
    .save(outputFilePath);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Video processing service listening at http://localhost:${port}`);
});

