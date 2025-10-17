const prisma = require('../config/prisma')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

exports.register = async (req,res) => {
    try {
        const { email, password, firstname, lastname } = req.body

        if (!email) {
            return res.status(400).json('Email is required!')
        }
        if (!password) {
            return res.status(400).json('Password is required!')
        }

        const user = await prisma.user.findFirst({
            where: {
                email: email
            }
        })
        if (user) {
            return res.status(400).json('Email already exits!')
        }
        const hashPassword = await bcrypt.hash(password, 10)

        await prisma.user.create({
            data: {
                email: email,
                password: hashPassword,
                firstname: firstname,
                lastname: lastname,
            }
        })

        res.status(200).json('Register Success')
    
    } catch (err) {
        console.log(err)
        res.status(500).json('Server Error')
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await prisma.user.findFirst({
            where: {
                email: email,
            }
        })
        if (!user) {
            return res.status(400).json('User Not found')
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json('Password Invalid!')
        }
        const payload = {
            id: user.id,
            email: user.email,
            firstname: user.firstname,
            lastname: user.lastname
        }
        jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' }, (err, token) => {
            if (err) {
                return res.status(500).json('Server Error')
            }
            res.status(200).json({ payload, token })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json('Server Error')
    }
}

exports.currentUser = async (req, res) => {
    try {
        const user = await prisma.user.findFirst({
            where: { email: req.user.email },
            select: {
                id: true,
                email: true,
                firstname: true,
                lastname: true,
            }
        })
        res.json({ user })
    } catch (err) {
        console.log(err)
        res.status(500).json('Server Error')
    }
}