const { Router } = require("express");
const authMiddleware = require("../middlewares/auth");
const UserController = require("../user.controller/auth.controller");
const grillController = require("../grill.controller/grill.actions");
const _grillRequestController = require("../grill.controller/request.grill");
const UserActionController = require("../user.controller/action.controller");
const validator = require("../validator");
const router = Router();

router.post("/register", validator.create, UserController.create);
router.post("/login", UserController.authenticate);
router.post("/forgot_password", UserActionController.forgot);
router.post("/recover", UserActionController.resetPassword);

// router.use(authMiddleware);
router.post("/addGrill", grillController.create);
router.put("/updateGrill/:id?", grillController.updateGrill);
router.put("/request/:id", _grillRequestController.request);
router.put("/accept/:grillId/:userId", _grillRequestController.accept);

module.exports = router;
