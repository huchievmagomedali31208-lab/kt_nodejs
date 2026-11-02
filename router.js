import { Router } from "express";
import CourseController from "./CourseController.js";

const router = new Router();

router.get("/courses", CourseController.getCourses);
router.get("/course/:id", CourseController.getCourse);
router.post("/addcourse", CourseController.addCourse);
router.patch("/course/:id", CourseController.updateCourse);
router.put("/course/:id", CourseController.replaceCourse);
router.delete("/course/:id", CourseController.deleteCourse);

export default router;