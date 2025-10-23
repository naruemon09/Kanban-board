const prisma = require("../config/prisma");

exports.create = async (req, res) => {
  try {
    const { board_name } = req.body;

    const user = await prisma.user.findFirst({
      where: { id: Number(req.user.id) },
    });

    const board = await prisma.board.create({
      data: {
        boardName: board_name,
        createdBy: {
          connect: { id: user.id },
        },
      },
    });

    res.json(board);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.list = async (req, res) => {
  try {
    const board = await prisma.board.findMany({
      where: { createdById: Number(req.user.id) },
    });

    res.json(board);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.read = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await prisma.board.findFirst({
      where: {
        id: Number(id),
      },
    });
    res.json(board);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const board = await prisma.board.delete({
      where: {
        id: Number(id),
      },
    });
    res.send(board);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { boardName } = req.body;

    const board = await prisma.board.update({
      where: {
        id: Number(id),
      },
      data: {
        boardName: boardName,
      },
    });

    res.json(board);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
