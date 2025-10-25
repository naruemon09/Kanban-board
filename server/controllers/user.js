const prisma = require("../config/prisma");

exports.create = async (req, res) => {
  try {
    const { email, board_id } = req.body;

    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const existingMember = await prisma.board_Member.findFirst({
      where: {
        boardId: Number(board_id),
        userId: user.id,
      },
    });

    if (existingMember) {
      return res.status(400).json({ message: "User is already a member of this board" });
    }

    const member = await prisma.board_Member.create({
      data: {
        boardId: Number(board_id),
        userId: user.id,
      },
    });

    res.json(member);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.list = async (req, res) => {
  try {
    const { id } = req.params;

    const members = await prisma.board_Member.findMany({
      where: { boardId: Number(id) },
    });

    if (members.length === 0) {
      return res.json([]);
    }

    const userIds = members.map((m) => m.userId);

    const users = await prisma.user.findMany({
      where: { id: { in: userIds } },
      select: { id: true, email: true, firstname: true, lastname: true },
    });

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.searchUserByEmail = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Email is required" });
    }

    const users = await prisma.user.findMany({
      where: {
        email: {
          startsWith: email,
        },
      },
      select: {
        id: true,
        firstname: true,
        lastname: true,
        email: true,
      },
      take: 10,
    });

    res.json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

