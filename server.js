import express from "express";
import router from "./router.js";
import mongoose from "mongoose";
import fileUpload from "express-fileupload";
import { fileURLToPath } from "url";
import path from "path";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

const PORT = 5000;

const app = express();
app.use(express.json());
app.use(fileUpload({}));
app.use("/files", express.static(path.resolve(__dirname, "files")));

app.use(router);

mongoose
  .connect("mongodb://localhost:27017/courses") 
  .then(() => {
    console.log("Успешное подключение к БД");
  })
  .catch((error) => {
    console.log("Ошибка при подключении к БД: " + error);
  });

app.listen(PORT, () => {
  console.log("Сервер успешно запущен на порту: " + PORT);
});