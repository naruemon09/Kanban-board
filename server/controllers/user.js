const prisma = require("../config/prisma");

exports.create = async (req, res) => {
  try {
    const { email, board_id } = req.body;
    const io = req.app.get("io");

    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "Email not found" });
    }

    const existingMember = await prisma.board_Member.findFirst({
      where: { boardId: Number(board_id), userId: user.id },
    });

    if (existingMember) {
      return res.status(400).json({ message: "User already in this board" });
    }

    const member = await prisma.board_Member.create({
      data: { boardId: Number(board_id), userId: user.id },
    });

    io.to(`user_${user.id}`).emit("notification:new", {
      userId: user.id,
      message: `You were added to board #${board_id}`,
      type: "board",
    });

    res.json(member);
  } catch (err) {
    console.error("Error adding member:", err);
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

    const result = users.map((u) => {
      const member = members.find((m) => m.userId === u.id);
      return {
        ...u,
        memberId: member.id,
      };
    });

    res.json(result);
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

exports.searchUserByEmailInBoard = async (req, res) => {
  try {
    const { id } = req.params;
    const { email } = req.query;
    if (!email || email.trim() === "") {
      return res.status(400).json({ message: "Email is required" });
    }

    const users = await prisma.board_Member.findMany({
      where: {
        boardId: Number(id),
        user: {
          email: {
            startsWith: email,
          },
        },
      },
      select: {
        user: {
          select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
          },
        },
      },
      take: 10,
    });

    const userAll = users.map((member) => ({
      id: member.user.id,
      firstname: member.user.firstname,
      lastname: member.user.lastname,
      email: member.user.email,
    }));

    res.json({ userAll });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.notification = async (req, res) => {
  try {
    const boardMember = await prisma.board_Member.findMany({
      where: { userId: req.user.id },
      include: {
        board: true,
      },
    });

    const taskMember = await prisma.task_Member.findMany({
      where: { userId: req.user.id },
      include: {
        task: true,
      },
    });

    const allNotifications = [
      ...boardMember.map((item) => ({
        type: "board",
        id: item.id,
        createdAt: item.joinedAt,
        data: item.board,
      })),
      ...taskMember.map((item) => ({
        type: "task",
        id: item.id,
        createdAt: item.assignedAt,
        data: item.task,
      })),
    ];

    allNotifications.sort(
      (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
    );

    res.json(allNotifications);
  } catch (err) {
    console.log(err);
    res.status(500).json("Server Error");
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await prisma.board_Member.delete({
      where: {
        id: Number(id),
      },
    });
    res.send(member);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};
