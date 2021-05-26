const express = require("express");
const router = express.Router();

const verifyToken = require("../helpers/verifyToken.js");

const chatController = require("../controllers/chatController");

router.get("/rooms", verifyToken, chatController.getRooms);
router.post("/rooms", verifyToken, chatController.addRoom);
router.delete("/rooms/:id", verifyToken, chatController.deleteRoom);
router.post("/rooms/:id/addMembers", verifyToken, chatController.addMembers);
router.delete("/rooms/:id/deleteMembers", verifyToken, chatController.deleteMembers);
router.post("/rooms/:id/sendMessage", verifyToken, chatController.sendMessage);
router.get("/rooms/:id/messages", verifyToken, chatController.getMessages);


module.exports = router;