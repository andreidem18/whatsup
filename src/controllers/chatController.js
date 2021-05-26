const { User, Room, Member, Message } = require("../models");
const Sequelize = require("sequelize");
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
          through: { attributes: [] },
          where: {
            id: userId,
          },
        },
      ]
    });
    return res.status(200).json(rooms);
  }catch(error){
    next(error);
  }
  
};

chatController.getRoom = async(req, res, next) => {
  const user_id = req.user.id;
  const room_id = req.params.id;
  try{
    let room = await Member.findOne({where: {[Sequelize.Op.and] : [ {user_id}, {room_id} ]}});
    if(room){
      room = await Room.findOne({
        where: {id: room_id},
        include: [
          {
            model: User,
            attibuter: ["id", "username", "screenname", "email", "avatar"],
            through: { attributes: [] }
          }
        ]
      });
      res.status(200).json(room);
    } else {
      res.status(403).json({message: "You don't have access to this room"});
    }
  }catch(error){
    next(error);
  }
}

chatController.addRoom = async(req, res, next) => {
  const {name, screenname, isPrivate, avatar} = req.body;
  const owner = req.user.id;

  try{
    let room = await Room.create({name, screenname, owner, private: isPrivate, avatar});
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
  let userId = req.user.id;
  let roomId = req.params.id;
  let {text} = req.body;

  try{
    const access = await Member.findOne({
      where: {
        [Sequelize.Op.and] : [
          { user_id: userId }, {room_id: roomId}
        ]
      }
    });
    if(access){
      const message = await Message.create({userId, roomId, text});
      res.status(201).json(message);
    } else {
      res.status(403).json({message: "El usuario no tiene accesso a la sala"});
    }
  }catch(error){
    next(error)
  }
}

chatController.getMessages = async(req, res, next) => {
  let roomId = req.params.id;
  try{
    const access = await Member.findOne({
      where: {
        [Sequelize.Op.and] : [
          { user_id: userId }, {room_id: roomId}
        ]
      }
    });
    if(access){
      let rooms = await Room.findAll({
        attributes: ["id", "name", "screenname"],
        include: [
          {
            model: Message,
            attributes: [
              "id",
              "text",
              "user_id"
            ],
            where: {
              roomId
            },
          },
        ],
      });
    } else {
      res.status(403).json({message: "El usuario no tiene accesso a la sala"});
    }
    res.json(rooms);
  }catch(error){
    next(error);
  }
}

chatController.deleteRoom = async(req, res, next) => {
  let roomId = req.params.id;
  try{
    let results = await Room.destroy({where: { id: roomId }});
    if(results){
      res.json({message: "The room has been removed"});
    }
    res.status(400).json({message: "The room has not been deleted"});
  }catch(error){
    next(error);
  }
}

chatController.deleteMembers = async(req, res, next) => {
  let roomId = req.params.id;
  let userId = req.user.id;
  let {members} = req.body;
  try{
    let results = await Member.destroy({
      where: {
        [Sequelize.Op.and] : [

          { user_id: members }, {room_id: roomId}
          
        ], 
        [Sequelize.Op.not]: [
          { user_id: userId}
        ]
      }
    });
    if(results){
      return res.json({message: "The members have been removed"});
    }
    return res.status(400).json({message: "The members have not been removed"});
  }catch(error){
    next(error);
  }
}

module.exports = chatController;
