
// Finally add the below code in controllers/message.js

const Message = require("./../models/msgModel.js");
const User = require("./../models/userModel.js");
const Chat = require("./../models/chatModel.js");

const sendMessage = async (req, res) => {
  const { messageContent, sender, chatId } = req.body;

  console.log(messageContent, sender, chatId)
  if (!messageContent || !chatId || !sender) {
    console.log("Invalid data passed into request");

    return res
      .status(400)
      .json({ error: "Please Provide All Fields To send Message" });
  }

  var newMessage = {
    messageContent,
    sender,
    chatId
  };

  console.log("new msg", newMessage);

  try {
    let m = await Message.create(newMessage);

    m = await m.populate("sender", "name");
    m = await m.populate("chatId");
    m = await User.populate(m, {
      path: "chatId.members",
      select: "name email _id",
    });

    m = await Chat.findByIdAndUpdate(chatId, { $push: { messages: m }, latestMsg: m }, { new: true });

    res.status(200).json(m);
  } catch (error) {
    res.status(400).json(error.message);
  }
};

const allMessages = async (req, res,next) => {
  try {
    const { chatId } = req.body;

    console.log("CHATID: ",chatId)
    const getMessage = await Message.find({ chatId: chatId })
      .populate("sender", "username email _id")
      .populate("chatId");

    console.log(getMessage)


    res.status(200).json(getMessage);
  } catch (err) {
    console.log(err)
    next(err)
  }
};

module.exports = { allMessages, sendMessage };


