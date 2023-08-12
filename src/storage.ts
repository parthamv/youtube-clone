import { Storage } from "@google-cloud/storage";
// importing File System module
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
//  Create a local directory for raw and processed videos

const storage = new Storage();
//bucket names
const rawVideoBucketName = "pmv-yt-raw-videos";
const processedVideoBucketName = "pmv-yt-processed-videos";
//local paths
const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";

// Create local directories for raw and processed videos
export function setupDirectories() {
ensureDirectoryExistence(localRawVideoPath);
ensureDirectoryExistence(localProcessedVideoPath);

}

//Convert videos resoloution to 360p
export function convertVideo(rawVideoName: string, processedVideoName: string){
return new Promise<void>((resolve, reject) => {
    ffmpeg(`${localRawVideoPath}/${rawVideoName}`)
    .outputOptions(["-vf","scale=-1:360"])
    .on("end", () => {
        console.log("Video conversion ended");
        resolve();
    }).on("error", (err) => {
        console.log("Video conversion error", err);
        reject(err);
    }).save(`${localProcessedVideoPath}/${processedVideoName}`);
});
}


export async function downloadRawVideo(fileName: string) {
await storage.bucket(rawVideoBucketName)
.file(fileName)
.download({destination:`${localRawVideoPath}/${fileName}`});

console.log(`gs://${rawVideoBucketName}/${fileName} downloaded to ${localRawVideoPath}/${fileName}`);   
}

export async function uploadProcessedVideo(fileName: string) {

    const Bucket = storage.bucket(processedVideoBucketName);
    await storage.bucket(processedVideoBucketName)
    .upload(`${localProcessedVideoPath}/${fileName}`, 
    { destination: fileName });

    console.log(`${fileName} uploaded to gs://${processedVideoBucketName}/${fileName}.`);

    await Bucket.file(fileName).makePublic();

}
