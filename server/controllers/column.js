const prisma = require("../config/prisma");

exports.create = async (req, res) => {
  try {
    const { column_name , board_id} = req.body;

    const column = await prisma.column.create({
      data: {
        columnName: column_name,
        boardId: Number(board_id),
      },
    });

    res.json(column);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.list = async (req, res) => {
  try {
    const { id } = req.params;
    const column = await prisma.column.findMany({
      where: { 
        boardId: Number(id) 
      },
    });

    res.json(column);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.read = async (req, res) => {
  try {
    const { id } = req.params;
    const column = await prisma.column.findFirst({
      where: {
        boardId: Number(id),
      },
    });
    res.json(column);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const column = await prisma.column.delete({
      where: {
        id: Number(id),
      },
    });
    res.json(column);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { column_name } = req.body;

    const column = await prisma.column.update({
      where: {
        id: Number(id),
      },
      data: {
        columnName: column_name,
      },
    });

    res.json(column);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
