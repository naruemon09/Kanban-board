const prisma = require('../config/prisma')

exports.create = async (req, res) => {
  try {
    const { task_name, description, column_id, tagName, email } = req.body;

    const task = await prisma.task.create({
      data: {
        taskName: task_name,
        description: description,
        columnId: column_id,
      },
    });

    if (Array.isArray(tagName) && tagName.length > 0) {
      for (const name of tags) {
        if (!name.trim()) continue;

        await prisma.task_Tag.create({
          data: {
            Task: { connect: { id: task.id } }, 
            Tag: {
              connectOrCreate: {
                where: { tagName: name.trim() }, 
                create: { tagName: name.trim() }, 
              },
            },
          },
        });
      }
    }

    if (Array.isArray(email) && email.length > 0) {
      for (const mail of email) {
        const user = await prisma.user.findUnique({
          where: { email: mail },
        });

        if (user) {
          await prisma.task_Member.create({
            data: {
              taskId: task.id,
              userId: user.id,
            },
          });
        }
      }
    }

    res.json({
      message: "Task created successfully",
      task,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};


exports.list = async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      include: {
        taskTag: {        
          include: {
            Tag: true,    
          },
        },
        taskMember: {  
          include: {
            user: true,
          },
        },
        column: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formatted = tasks.map((t) => ({
      id: t.id,
      taskName: t.taskName,
      description: t.description,
      columnId: t.columnId,
      createdAt: t.createdAt,
      tags: t.taskTag.map((tt) => tt.Tag.tagName),
      members: t.taskMember.map((tm) => ({
        firstname: tm.user.firstname,
        lastname: tm.user.lastname,
        email: tm.user.email,
      })),
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.read = async (req, res) => {
  try {
    const { id } = req.params

    const tasks = await prisma.task.findFirst({
      where: { id: Number(id) },
      include: {
        taskTag: {        
          include: {
            Tag: true,    
          },
        },
        taskMember: {  
          include: {
            user: true,
          },
        },
        column: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const formatted = tasks.map((t) => ({
      id: t.id,
      taskName: t.taskName,
      description: t.description,
      columnId: t.columnId,
      createdAt: t.createdAt,
      tags: t.taskTag.map((tt) => tt.Tag.tagName),
      members: t.taskMember.map((tm) => ({
        firstname: tm.user.firstname,
        lastname: tm.user.lastname,
        email: tm.user.email,
      })),
    }));

    res.json(formatted);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.remove = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.task_Tag.deleteMany({ 
      where: { taskId: Number(id) } 
    });
    await prisma.task_Member.deleteMany({ 
      where: { taskId: Number(id) } 
    });

    const task = await prisma.task.delete({
      where: { id: Number(id) },
    });

    res.json({
      message: "🗑️ Task deleted successfully",
      task,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { taskName, description, columnId, tags, members } = req.body;

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        taskName: taskName,
        description: description,
        columnId: columnId,
      },
    });

    await prisma.task_Tag.deleteMany({ where: { taskId: task.id } });

    if (Array.isArray(tags) && tags.length > 0) {
      for (const name of tags) {
        if (!name.trim()) continue;

        await prisma.task_Tag.create({
          data: {
            Task: { connect: { id: task.id } }, 
            Tag: {
              connectOrCreate: {
                where: { tagName: name.trim() }, 
                create: { tagName: name.trim() }, 
              },
            },
          },
        });
      }
    }

    await prisma.task_Member.deleteMany({ where: { taskId: task.id } });

    if (Array.isArray(members) && members.length > 0) {
      for (const mail of members) {
        const user = await prisma.user.findUnique({
          where: { email: mail },
        });

        if (user) {
          await prisma.task_Member.create({
            data: {
              taskId: task.id,
              userId: user.id,
            },
          });
        }
      }
    }

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.moveTask = async (req, res) => {
  try {
    const { id } = req.params;
    const { columnId } = req.body;

    const task = await prisma.task.update({
      where: { id: Number(id) },
      data: {
        columnId: columnId,
      },
    });

    res.json(task);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
