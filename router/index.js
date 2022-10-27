const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  userController.registration
);
router.post("/login", userController.login);
router.post("/logout", userController.logout);
router.post("/editFairSave", authMiddleware, userController.editFairSave);
router.post("/newForm", authMiddleware, userController.newFormSave);
router.post("/editForm/deleteEditFair/:id", authMiddleware, userController.deleteFair);
router.get("/activate/:link", userController.activate);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.get("/fairs/", authMiddleware, userController.getFairs);
router.get("/editForm/:id", authMiddleware, userController.getFair);
router.get("/allDataExport", userController.getAllData)

module.exports = router;
