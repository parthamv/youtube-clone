import { Storage } from "@google-cloud/storage";
import fs from "fs";
import ffmpeg from "fluent-ffmpeg";
//  Create a local directory for raw and processed videos

const storage = new Storage();
const rawVideoBucketName = "nc-yt-raw-videos";
const processedVideoBucketName = "nc-yt-processed-videos";

const localRawVideoPath = "./raw-videos";
const localProcessedVideoPath = "./processed-videos";
export function setupDirectories() {
ensureDirectoryExistence(localRawVideoPath);
ensureDirectoryExistence(localProcessedVideoPath);

}


export function convertVideo(rawVideoName: string, processedVideoName: string){

}