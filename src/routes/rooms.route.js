const express = require("express");
const router = express.Router();

const verifyToken = require("../helpers/verifyToken.js");

const chatController = require("../controllers/chatController");

router.get("/rooms", verifyToken, chatController.getRooms);
router.post("/rooms", verifyToken, chatController.addRoom);
router.post("/rooms/:id/addMembers", verifyToken, chatController.addMembers);

module.exports = router;