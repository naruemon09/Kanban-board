const prisma = require('../config/prisma')

exports.create = async (req,res) => {
    try{
        const { boardName } = req.body
        const board = await prisma.category.create({
            data:{
                boardName: boardName
            }
        })
        res.send(board)
    }catch(err){
        console.log(err)
        res.status(500).json({ message : "Server error" })
    }
}

exports.list = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.read = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.remove = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}

exports.update = async (req,res) => {
    try {
        
    } catch (error) {
        
    }
}