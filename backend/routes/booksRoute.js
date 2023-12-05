import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router()

//creating HTTP Route for initial /


//POST (creating a new resource) route to save a new Book
router.post('/', async (request,response) => {
    try {
        if(
            !request.body.title || 
            !request.body.author ||  
            !request.body.publishYear
        )
        {
            return response.status(400).send({
                message: 'Send all required details'
            });
        }
        const newBook = {
            title: request.body.title,
            author: request.body.author,
            publishYear: request.body.publishYear,
          };

        const book = await Book.create(newBook);
        return response.status(201).send(book);
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
        
    }
});

// To get all the books from DB - GET
router.get('/', async (request,response) => {
    try {
        const allBooks = await Book.find( { } );
        //giving a more structured result
        return response.status(200).json(
            {
                count: allBooks.length,
                data: allBooks
            }
        );
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// To get books by ID from DB - GET
router.get('/:id', async (request,response) => {
    try {
        const {id} = request.params;

        const book_id = await Book.findById(id);
        //giving a more structured result
        return response.status(200).json(
            {
                data: book_id
            }
        );
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Updating the book - PUT
router.put('/:id', async (request,response) => {
    try {
        if(
            !request.body.title || 
            !request.body.author ||  
            !request.body.publishYear
        )
        {
            return response.status(400).send({
                message: 'Send all required details'
            });
        }

        const {id} = request.params;
        const result = await Book.findByIdAndUpdate(id, request.body);
        if(!result) {
            return response.status(404).send({
                message: 'Book Not Found'
            });
        }
        return response.status(200).send({
            message: 'Book Update Successful!'
        });
        
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

//Deleting from DB
router.delete('/:id',  async (request,response) => {
    try {
        const {id} = request.params;
        const result = await Book.findByIdAndDelete(id);

        if(!result) {
            return response.status(404).send({
                message: 'Book Not Found'
            });
        }
        return response.status(200).send({
            message: 'Book Delete Successful!'
        });
        
    } catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});


export default router;