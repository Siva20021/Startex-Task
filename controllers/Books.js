import { PrismaClient } from '@prisma/client';
import { createReadStream } from 'fs';
import { parse } from 'fast-csv';
const prisma = new PrismaClient();
export const getBooks = async (req, res) => {
    try {
        const books = await prisma.books.findMany();
        res.status(200).json(books);
    } catch (err) {
        res.status(500).send(err.message);
    }
}
export const addBook = async (req, res) => {
    try {
        const id=req.params.id;
        const user = await prisma.user.findUnique({
            where: {
                id: id
            }
        });
        if (!user) return res.status(400).send("User not found!");
        if(user.isSeller){
            if (req.file == undefined) {
                res.status(400).send("Please upload a file");
            }
            let path = `./uploads/${req.file.filename}`;
            const data = [];
            let rowIndex=0;
            const result=await new Promise((resolve,reject)=>{
                createReadStream(path).pipe(parse()).on('error', error => {
                    res.status(500).send(error.message);
                }).on('data',(row)=>{
                    rowIndex++;
                    if(rowIndex===1){
                        return;
                    }
                    data.push({
                        title: row[0],
                        author: row[1],
                        price: parseFloat(row[2]),
                        userId: id,
                        description: row[3],
                        image: row[4]
                    });
                }).on('end',rowCount=>{
                    // console.log(`Parsed ${rowCount} rows`);
                    resolve('done');
                });
            });
            if(result==='done'){
                data.forEach(async (book)=>{
                    await prisma.books.create({
                        data:book
                    });
                });
                res.status(200).send("Books added successfully");
            }else{
                res.status(500).send("Error in adding books");
            }
        }else{
            res.status(400).send("You are not a seller");
        }
        
    } catch (err) {
        res.status(500).send(err.message);
    }
}