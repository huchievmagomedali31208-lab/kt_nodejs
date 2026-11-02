import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Название курса"],
    trim: true
  },
  description: {
    type: String,
    required: [true, "Описание курса"],
    trim: true
  },
  price: {
    type: Number,
    required: [true, "Цена курса"],
    min: 0
  },
  duration: {
    type: String,
    required: [true, "Длительность курса"]
  },
  level: {
    type: String,
    required: [true, "Уровень курса"],
    enum: ["beginner", "intermediate", "advanced"]
  },
  image: {
    type: String
  }
});

export default mongoose.model("Course", courseSchema);