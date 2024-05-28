import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const age = 1000 * 60 * 60 * 24 * 7;
export const register = async (req, res) => {
    try {
        const hash = bcrypt.hashSync(req.body.password, 5);
        const email = req.body.email;
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { email }
                ]
            }
        });
        if (user) return res.status(400).send("User already exists!");
        const newUser = await prisma.user.create({
            data: {
                ...req.body,
                password: hash
            }
        });
        res.status(201).send("User has been created.");
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export const login = async (req, res, next) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: req.body.email
            },
            include: {
                books: true,
            }
        });
        if (!user) return res.status(400).send("User not found!");
        const match = bcrypt.compareSync(req.body.password, user.password);
        if (!match) return res.status(400).send("Invalid credentials!");
        const token = jwt.sign({ id: user.id }, "secretkey");
        res
            .cookie("access_token", token, {
                httpOnly: true,
            })
            .status(200)
            .json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
};
export const getUser = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                books: true,
            }
        });
        res.status(200).json(user);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export const toggleBuyer = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await prisma.user.update({
            where: {
                id: id
            },
            data: {
                isBuyer: req.body.isBuyer
            }
        });
        if (user.isBuyer) {
            res.status(200).send("User is now a Buyer");
        }
        else {
            res.status(200).send("User is now a Seller");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
}