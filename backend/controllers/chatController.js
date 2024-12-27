const { default: mongoose } = require('mongoose');
const { getAllUsersByEmail } = require('../services/userServices');
const chatModel = require('./../models/chatModel');
const userModel = require('./../models/userModel');
const msgModel = require('../models/msgModel');

const getCurrChat = async (req, res, next) => {
  try {
    const { senderId, chatObj } = req.body;
    if (!senderId || !chatObj) {
      return res.send("No User Exists!");
    }

    // console.log(senderId,chatObj)

    const chat = await chatModel.findById(chatObj._id)
      .populate("members", "-password")
      .populate("chatAdmin", "-password")
      .populate("latestMsg")
      .populate("messages")
      .sort({ updatedAt: -1 })


      // const msgs=await msgModel.populate(chat,{
      //   path:"messages"
      // })


      // console.log(msgs);

    // const updatedChat = await chatModel.findByIdAndUpdate(chat._id, { members: chat.members, messages: chat.messages, chatAdmin: chat.chatAdmin, latestMsg: chat.latestMsg }, { new: true })
    // const updatedChat=await chatModel.findOneAndReplace(chat._id,{chat},{new:true})
    console.log( "CHAT: ", chat)
    //TODO: populate messages subdocument
    // .populate("messages")

    // console.log("CHAT: ", chat)

    // if (!chat) {
    //   console.log("Inside if statement: ")
    //   const mem = []
    //   const objId = `${senderId}`;
    //   mem.push(objId)
    //   const objId1 = `${receiver._id}`;
    //   mem.push(objId1)


    //   console.log(mem)

    //   const newChat = {
    //     chatname: receiver.chatname,
    //     isGroup: false,
    //     members: mem,
    //     messages: [],
    //     chatAdmin: mem
    //   }

    //   const isChatCreated = await chatModel.create(newChat);
    //   console.log('\n\n')

    //   res.status(200);
    //   res.json({ status: 'ok',message:"New Chat created", chat: [isChatCreated] })
    // } else {
    res.status(200);
    res.json({ status: 'ok', message: "Chat found", chat})
    // }
    //     .populate("members", "-password")
    // .populate("latestMsg");

    // chat = await User.populate(chat, {
    //   path: "latestMsg.sender",
    //   select: "username email _id",
    // });
    // if (chat.length > 0) {
    //   res.send(chat[0]);
    // } else {
    //   const createChat = await chatModel.create({
    //     chatName: "sender",
    //     isGroupChat: false,
    //     users: [req.user._id, userId],
    //   });

    //   const fullChat = await Chat.findOne({ _id: createChat._id }).populate(
    //     "users",
    //     "-password"
    //   );

    //   res.status(201).json(fullChat);
    // }
  }
  catch (err) {
    console.log(err);
    res.status(404);
    next(err);
  }
};

const createUserChat = async (req, res, next) => {
  try {

    const { senderId, receiver } = req.body;
    console.log("DATA: ",senderId, receiver);
    if (!senderId || !receiver.id) {
      return res.send("No User Exists!");
    }

    console.log(senderId, receiver.id);

    const chat = await chatModel.findOne({
      isGroup: false,
      $and: [
        { members: { $elemMatch: { $eq: receiver.id } } },
        { members: { $elemMatch: { $eq: senderId } } },
      ],
    })
      .populate("members", "-password")
      .populate("chatAdmin", "-password")
      .populate("latestMsg")
      .populate("messages")
      .sort({ updatedAt: -1 });

    console.log("CHAT: ", chat)



    if (!chat) {
      const mem = []
      const objId = `${senderId}`;
      mem.push(objId)
      const objId1 = `${receiver.id}`;
      mem.push(objId1)
      const newChat = {
        chatname: receiver.username,
        isGroup: false,
        members: mem,
        messages: [],
        chatAdmin: mem
      }

      console.log("newChat: ", newChat)

      const isChatCreated = await chatModel.create(newChat);
      console.log('\n\n')

      res.status(200);
      res.json({ status: 'ok', chat: [isChatCreated] })
    } else {

      const chatData = userModel.findByIdAndUpdate(chat.id, chat, { new: true })

      console.log("CHAT: ", JSON.stringify(chatData))
      res.status(200);
      res.json({ status: 'ok', chat: JSON.stringify(chatData) })
    }


  }
  catch (err) {
    console.log(err);
    res.status(404);
    next(err);
  }
}



const searchUser = async (req, res, next) => {
  try {
    // console.log(req.currUserId, req.query.data)
    const searchedQuery = req.query.data;
    const users = await getAllUsersByEmail(searchedQuery);

    const returnedUsers = [];

    users.forEach((item) => {
      returnedUsers.push({ email: item.email, username: item.username, id: item.id })
    })

    //TODO: add messages to the returned object or populate the usermodel by changing schema
    console.log(returnedUsers);

    if (users.length === 0) {
      res.status(404);
      throw new Error("No such User Exists");
    }
    res.status(200);
    res.json({ status: 'ok', users: returnedUsers })
  }
  catch (err) {
    console.log(err);
    res.status(404);
    next(err);
  }

  res.end();
}

const getChats = async (req, res, next) => {
  try {
    console.log(req.currUserId);
    const chat = await chatModel.find({
      isGroup: false,
      $or: [
        { members: { $elemMatch: { $eq: req.currUserId } } }
      ],
    }
    )
      .populate("members", "-password")
      .populate("chatAdmin", "-password")
      .populate("latestMsg")
      .populate("messages")
      .sort({ updatedAt: -1 });

    // console.log(JSON.stringify(chat))

    res.status(201).json({ status: 'ok', chats: chat });
  }
  catch (err) {
    console.log(err)
    res.status(404)
    next(err)
  }
};

const createGroup = async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the fields" });
  }

  var users = JSON.parse(req.body.users);

  if (users.length < 2) {
    return res
      .status(400)
      .send("More than 2 users are required to form a group chat");
  }

  users.push(req.user.id);

  const groupChat = await Chat.create({
    chatName: req.body.name,
    users: users,
    isGroupChat: true,
    groupAdmin: req.user.id,
  });

  const fullGroupChat = await Chat.findOne({ _id: groupChat._id })
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  res.status(200).json(fullGroupChat);
};

const renameGroup = async (req, res) => {
  const { chatId, chatName } = req.body;

  const updateChat = await Chat.findByIdAndUpdate(
    chatId,
    {
      chatName: chatName,
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!updateChat) {
    throw new BadRequestError("Chat Not Found");
  } else {
    res.json(updateChat);
  }
};

const addUserToGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const addUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $push: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!addUser) {
    throw new BadRequestError("Chat Not Found");
  } else {
    res.status(201).json(addUser);
  }
};

const removeFromGroup = async (req, res) => {
  const { chatId, userId } = req.body;

  const removeUser = await Chat.findByIdAndUpdate(
    chatId,
    {
      $pull: { users: userId },
    },
    {
      new: true,
    }
  )
    .populate("users", "-password")
    .populate("groupAdmin", "-password");

  if (!removeUser) {
    throw new BadRequestError("Chat Not Found");
  } else {
    res.status(201).json(removeUser);
  }
};

module.exports = {
  getCurrChat,
  getChats,
  createGroup,
  removeFromGroup,
  renameGroup,
  addUserToGroup,
  searchUser,
  createUserChat
};
