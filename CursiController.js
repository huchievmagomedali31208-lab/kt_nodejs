import Course from "./models/Course.js";
import fileService from "./fileService.js";

class CourseController {
  async getCourses(req, res) {
    try {
      const courses = await Course.find();
      res.json(courses);
    } catch (error) {
      console.log("Ошибка при получении курсов: " + error);
      res.status(500).send("Ошибка при получении курсов");
    }
  }

  async getCourse(req, res) {
    try {
      const { id } = req.params;
      const course = await Course.findById(id);
      if (!course) {
        return res.status(404).send("Курс не найден");
      }
      res.json(course);
    } catch (error) {
      console.log("Ошибка при получении курса: " + error);
      res.status(500).send("Ошибка при получении курса");
    }
  }

  async addCourse(req, res) {
    try {
      let fileName = null;
      if (req.files && req.files.image) {
        fileName = await fileService.saveFile(req.files.image);
      }

      const { title, description, price, duration, level } = req.body;
      const newCourse = await Course.create({
        title,
        description,
        price,
        duration,
        level,
        image: fileName
      });

      res.status(201).json(newCourse);
    } catch (error) {
      console.log("Ошибка при создании курса: " + error);
      res.status(500).send("Ошибка при создании курса");
    }
  }

  async updateCourse(req, res) {
    try {
      const { id } = req.params;
      const updateData = req.body;

      if (req.files && req.files.image) {
        const fileName = await fileService.saveFile(req.files.image);
        updateData.image = fileName;
      }

      const updated = await Course.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true
      });

      if (!updated) {
        return res.status(404).send("Курс не найден");
      }
      res.json(updated);
    } catch (error) {
      console.log("Ошибка при обновлении курса: " + error);
      res.status(500).send("Ошибка при обновлении");
    }
  }

  async replaceCourse(req, res) {
    try {
      const { id } = req.params;
      let newData = req.body;

      if (req.files && req.files.image) {
        const fileName = await fileService.saveFile(req.files.image);
        newData.image = fileName;
      }

      const replaced = await Course.findByIdAndUpdate(id, newData, {
        new: true,
        overwrite: true,
        runValidators: true
      });

      if (!replaced) {
        return res.status(404).send("Курс не найден");
      }
      res.json(replaced);
    } catch (error) {
      console.log("Ошибка при полной замене курса: " + error);
      res.status(500).send("Ошибка при замене");
    }
  }

  async deleteCourse(req, res) {
    try {
      const { id } = req.params;
      const deleted = await Course.findByIdAndDelete(id);

      if (!deleted) {
        return res.status(404).send("Курс не найден");
      }
      res.send("Курс удалён");
    } catch (error) {
      console.log("Ошибка при удалении курса: " + error);
      res.status(500).send("Ошибка при удалении");
    }
  }
}

export default new CourseController();