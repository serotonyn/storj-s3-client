//@ts-check
import {
  S3Client,
  PutObjectCommand,
  ListObjectsCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; // Only needed if you want to get a shareable url

const s3 = new S3Client({
  region: process.env.REGION,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY,
    secretAccessKey: process.env.SECRET_KEY,
  },
  endpoint: process.env.ENDPOINT,
});

// get dom elements
const input = document.querySelector("input");
const listButton = document.querySelector("#list");
const getButton = document.querySelector("#get");
const deleteButton = document.querySelector("#delete");
const getUrlButton = document.querySelector("#get-url");
const display = document.querySelector("#display");

// register handlers
input.addEventListener("change", handleUpload, false);
getButton.addEventListener("click", handleGet, false);
listButton.addEventListener("click", handleList, false);
deleteButton.addEventListener("click", handleDelete, false);
getUrlButton.addEventListener("click", handleGetUrl, false);

// upload, list, and delete a file
function upload(file) {
  return new PutObjectCommand({
    Key: "image.jpeg",
    Body: file,
    Bucket: process.env.BUCKET_NAME,
  });
}

function list() {
  return new ListObjectsCommand({
    Bucket: process.env.BUCKET_NAME,
  });
}

function get() {
  return new GetObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: "{NAME_OF_FILE}",
  });
}

function remove() {
  return new DeleteObjectCommand({
    Bucket: process.env.BUCKET_NAME,
    Key: "{KEY_OF_FILE_TO_DELETE}",
  });
}

// handlers
function handleUpload() {
  const file = input.files[0];
  const command = upload(file);
  s3.send(command).then(updateDisplay);
}

function handleList() {
  const command = list();
  s3.send(command).then(updateDisplay);
}

function handleGet() {
  const command = get();
  s3.send(command).then(updateDisplay);
}

function handleDelete() {
  const command = remove();
  s3.send(command).then(updateDisplay);
}

// get url
function handleGetUrl() {
  getSignedUrl(s3, get(), {
    expiresIn: 3600,
  }).then(updateDisplay);
}

// update the results
function updateDisplay(result) {
  display.innerHTML = JSON.stringify(result, null, 4);
}
