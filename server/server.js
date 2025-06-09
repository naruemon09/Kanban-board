import express from 'express';
const app = express();
const port = 3000;
import cors from 'cors'
import connection from './config/db.js';

app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended : true}))


app.post('/register', async (req, res) => {
  const { firstname, lastname, email, password, confirmPassword } = req.body;
  try {
    const { rows: checkUser } = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );

    if (checkUser.length > 0) {
      return res.json({ errorMessage: 'email already exists' });
    }

    if (password !== confirmPassword) {
      return res.json({ errorMessage: 'Password not match' });
    }

    await connection.query(
      `INSERT INTO "user" (firstname, lastname, email, password, create_at, role) VALUES ($1, $2, $3, $4, $5, $6)`,
      [firstname, lastname, email, password, new Date(), 'Assignee']
    );

    res.json({
        res: 0,
        val: {msg:"Register success"},
    });
  } catch (error) {
    res.send('Server Error');
  }
});


app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const { rows: checkUser } = await connection.query(
      'SELECT * FROM "user" WHERE email = $1 and password = $2',
      [email, password]
    );

    if (checkUser.length === 0) {
      return res.json({ errorMessage: 'email or password is incorrect.' });
    }

    res.json({
        res: 0,
        val: {msg:"Login success"},
        user: checkUser
    });
    
  } catch (error) {
    res.send('Server Error');
  }
});


app.get('/profile', async (req, res) => {
  const { email } = req.query;
  try {
    const { rows: user } =await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );

    res.json({
        res: 0,
        user: user[0]
    });
    
  } catch (error) {
    res.send('Server Error');
  }
});


app.get('/user', async (req, res) => {
  const { email } = req.query;
  try {
    const { rows: checkUser } = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );

    if (checkUser.length > 0) {
      const { rows: user } =await connection.query('SELECT * FROM "user"');
      
      res.json({
        res: 0,
        user: user
      });
    } else {
      return res.json({ errorMessage: 'Account not found' });
    }
  } catch (error) {
    res.send('Server Error');
  }
});


app.post('/createBoard', async (req, res) => {
  const { email } = req.query;
  const { board_name , assigneeEmails } = req.body;
  try {
    const { rows: checkUser } = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    )

    if (checkUser.length > 0) {
      await connection.query('INSERT INTO "board" (board_name, create_at, email) VALUES ($1, $2, $3)',
        [board_name, new Date(), email]
      );
      for (const inemail of assigneeEmails) {
        await connection.query('INSERT INTO "assignee_board" (board_name, invite_at, email) VALUES ($1, $2, $3)',
          [board_name, new Date(), inemail]
        )
      }
      res.json({
        res: 0
      });

    } else {
      return res.json({ errorMessage: 'Account not found' });
    }
  } catch (error) {
    res.send('Server Error');
  }
});


app.get('/board', async (req, res) => {
  const { email } = req.query;
  try {
    const { rows: checkUser } = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );

    if (checkUser.length > 0) {
      const { rows: board } =await connection.query('SELECT * FROM "board"');
      
      res.json({
        res: 0,
        board: board
      });
    } else {
      return res.json({ errorMessage: 'Account not found' });
    }
  } catch (error) {
    res.send('Server Error');
  }
});


app.put('/board/:board_name', async (req, res) => {
  const { email } = req.query;
  const { board_name } = req.params;
  const { new_board_name } = req.body;
  try {
    const { rows: checkUser } = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    )

    if (checkUser.length > 0) {
      await connection.query('UPDATE "board" SET board_name = $1 , edit_at = $2 WHERE board_name = $3',
        [new_board_name, new Date(),board_name]
      )
      await connection.query('UPDATE "assignee_board" SET board_name = $1 WHERE board_name = $2',
        [new_board_name, board_name]
      )
      
      res.json({
        res: 0
      });

    } else {
      return res.json({ errorMessage: 'Account not found' });
    }
  } catch (error) {
    res.send('Server Error');
  }
});


app.delete('/board/:board_name', async (req, res) => {
  const { email } = req.query;
  const { board_name } = req.params;
  try {
    const { rows: checkUser } = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    )

    if (checkUser.length > 0) {
      await connection.query('DELETE FROM "board" WHERE board_name = $1',
        [board_name]
      )
      
      res.json({
        res: 0
      });

    } else {
      return res.json({ errorMessage: 'Account not found' });
    }
  } catch (error) {
    res.send('Server Error');
  }
});


app.post('/createColumn', async (req, res) => {
  const { email } = req.query;
  const { column_name , board_name } = req.body;
  try {
    const { rows: checkUser } = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    )

    if (checkUser.length > 0) {
      await connection.query('INSERT INTO "column" (column_name, create_at, board_name, email) VALUES ($1, $2, $3, $4)',
        [column_name, new Date(), board_name, email]
      );
      res.json({
        res: 0
      });

    } else {
      return res.json({ errorMessage: 'Account not found' });
    }
  } catch (error) {
    res.send('Server Error');
  }
});


app.get('/column', async (req, res) => {
  const { email } = req.query;
  try {
    const { rows: checkUser } = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );

    if (checkUser.length > 0) {
      const { rows: column } =await connection.query('SELECT * FROM "column"');
      
      res.json({
        res: 0,
        column: column
      });
    } else {
      return res.json({ errorMessage: 'Account not found' });
    }
  } catch (error) {
    res.send('Server Error');
  }
});


app.put('/column/:column_name', async (req, res) => {
  const { email } = req.query;
  const { column_name } = req.params;
   const { new_column_name } = req.body;
  try {
    const { rows: checkUser } = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    )

    if (checkUser.length > 0) {
      await connection.query('UPDATE "column" SET column_name = $1 , edit_at = $2 WHERE column_name = $3',
        [new_column_name, new Date(), column_name]
      )
      res.json({
        res: 0
      });

    } else {
      return res.json({ errorMessage: 'Account not found' });
    }
  } catch (error) {
    res.send('Server Error');
  }
});


app.delete('/column/:column_name', async (req, res) => {
  const { email , board_name } = req.query;
  const { column_name } = req.params;
  try {
    const { rows: checkUser } = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    )

    if (checkUser.length > 0) {
      await connection.query('DELETE FROM "column" WHERE column_name = $1 and board_name = $2',
        [column_name, board_name]
      )
      
      res.json({
        res: 0
      });

    } else {
      return res.json({ errorMessage: 'Account not found' });
    }
  } catch (error) {
    res.send('Server Error');
  }
});


app.post('/createTask', async (req, res) => {
  const { email } = req.query;
  const { task_name , column_name , ownerEmails } = req.body;
  try {
    const { rows: checkUser } = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    )

    if (checkUser.length > 0) {
      await connection.query('INSERT INTO "task" (task_name, column_name, create_at, email) VALUES ($1, $2, $3, $4)',
        [task_name, column_name, new Date(), email]
      );
      for (const inemail of ownerEmails) {
        await connection.query('INSERT INTO "owner_task" (task_name, invite_at, email) VALUES ($1, $2, $3)',
          [task_name, new Date(), inemail]
        )
      }
      res.json({
        res: 0
      });

    } else {
      return res.json({ errorMessage: 'Account not found' });
    }
  } catch (error) {
    res.send('Server Error');
  }
});


app.get('/task', async (req, res) => {
  const { email } = req.query;
  try {
    const { rows: checkUser } = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    );

    if (checkUser.length > 0) {
      const { rows: task } =await connection.query('SELECT * FROM "task"');
      
      res.json({
        res: 0,
        task: task
      });
    } else {
      return res.json({ errorMessage: 'Account not found' });
    }
  } catch (error) {
    res.send('Server Error');
  }
});


app.put('/task/:task_name', async (req, res) => {
  const { email } = req.query;
  const { task_name } = req.params;
  const { new_task_name } = req.body;
  try {
    const { rows: checkUser } = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    )

    if (checkUser.length > 0) {
      await connection.query('UPDATE "task" SET task_name = $1 , edit_at = $2 WHERE task_name = $3',
        [new_task_name, new Date(), task_name]
      )
      await connection.query('UPDATE "owner_task" SET task_name = $1 WHERE task_name = $2',
        [new_task_name, task_name]
      )
      
      res.json({
        res: 0
      });

    } else {
      return res.json({ errorMessage: 'Account not found' });
    }
  } catch (error) {
    res.send('Server Error');
  }
});


app.delete('/task/:task_name', async (req, res) => {
  const { email , column_name } = req.query;
  const { task_name } = req.params;
  try {
    const { rows: checkUser } = await connection.query(
      'SELECT * FROM "user" WHERE email = $1',
      [email]
    )

    if (checkUser.length > 0) {
      await connection.query('DELETE FROM "task" WHERE task_name = $1 and column_name = $2',
        [task_name, column_name]
      )
      
      res.json({
        res: 0
      });

    } else {
      return res.json({ errorMessage: 'Account not found' });
    }
  } catch (error) {
    res.send('Server Error');
  }
});


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});