const { User, Room, Member } = require("../models");

const chatController = {};

chatController.getRooms = async (req, res, next) => {
  const userId = req.user.id;
  try{
    let rooms = await Room.findAll({
      attributes: ["id", "name", "screenname", "private", "avatar"],
      include: [
        {
          model: User,
          attributes: [],
          where: {
            id: userId,
          },
        },
      ],
    })
    return res.status(200).json(rooms);
  }catch(error){
    next(error);
  }
  
};

chatController.addRoom = async(req, res, next) => {
  const {name, screenname, private, avatar} = req.body;
  const owner = req.user.id;

  try{
    let room = await Room.create({name, screenname, owner, private, avatar});
    if(room){
      let roomObj = room.get();
      await Member.create({userId: owner, roomId: roomObj.id});
    }
    return res.status(201).json(room);
  }catch(error){
    next(error);
  }
};

chatController.addMembers = async(req, res, next) => {
  let {members} = req.body;
  let roomId = req.params.id;

  try{
    members = members.map( member => { return {userId: member, roomId}});
    const membersResult = await Member.bulkCreate(members,  { returning: true });
    return res.status(201).json(membersResult);
  }catch(error){
    next(error);
  }
};

chatController.sendMessage = async(req, res, next) => {

}

chatController.getMessages = async(req, res, next) => {

}

chatController.deleteRoom = async(req, res, next) => {

}

chatController.deleteMembers = async(req, res, next) => {

}

module.exports = chatController;
