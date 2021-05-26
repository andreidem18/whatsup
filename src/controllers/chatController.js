const { User, Room, Member, Message } = require("../models");

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
  console.log(req);

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
  const text = req.body.text;
  const user_id = req.user.id;
  const room_id = req.params.id;

  try{
    const message = await Message.create({user_id, room_id, text});
    return res.status(201).json(message);
  }catch(error){
    next(error);
  }
}

chatController.getMessages = async(req, res, next) => {
  const room_id = req.params.id;
  try{
    const messages = await Message.getAll({where: {room_id}});
    return res.status(200).json(messages);
  } catch(error){
    next(error);
  }
}

chatController.deleteRoom = async(req, res, next) => {
  let id = req.params.id;

  try{
    const room = await Room.findOne({id});
    await Room.destroy({where: {id}});
    return res.status(200).json(room);
  }catch(error){
    next(error);
  }
}

chatController.deleteMembers = async(req, res, next) => {
  let user_id = req.body.member_id;
  let room_id = req.params.id;
  try{
    await members.destroy({where: {
      [Op.and]: [
        {room_id},
        {user_id}
      ]
    }});
    return res.status(200).json({message: 'user deleted'});
  }catch(error){
    next(error);
  }

}

module.exports = chatController;
