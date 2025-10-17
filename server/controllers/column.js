const prisma = require("../config/prisma");

exports.create = async (req, res) => {
  try {
    const { column_name } = req.body;

    const user = await prisma.user.findFirst({
      where: { id: Number(req.user.id) },
    });

    const column = await prisma.column.create({
      data: {
        columnName: column_name,
        createdBy: {
          connect: { id: user.id },
        },
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
    const column = await prisma.column.findMany({
      where: { createdById: Number(req.user.id) },
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
    res.send(column);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { columnName } = req.body;

    const column = await prisma.column.update({
      data: {
        columnName: columnName,
      },
    });

    res.json(column);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
