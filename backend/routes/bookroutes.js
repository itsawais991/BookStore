import express from 'express';
import {Book} from '../models/bookModel.js';

const router = express.Router();

router.post('./', async (request, response)=> {
    try{
     if(
         !request.body.tittle || 
         !request.body.author ||
         !request.body.publishYear 
     ){
         return response.status(400).send({
             message:'send all request fields',
         });
     }
     const newBook = {
        tittle:  request.body.tittle,
        author:  request.body.author,
        publishYear: request.body.publishYear, 
     };
 
     const book = await Book.create(newBook);
 
     return response.status(201).send(book);
 }
   catch(error){
     console.log(error);
     response.status(500).send({ message: error.message, });
   }
     
    
  });     
  //           --------------routes to get all books from db -----------------//
router.get('./', async(request, response)=>{
      try{
     const books = await Book.find({});
     return response.status(200).json({
         count: books.length,
         data: books
     });
      }
      catch(error){
     console.log(error.message);
     response.status(500).send({message: error.message,  });
      }
  });
   //           --------------routes to get all books from db by ID -----------------//
router.get('./:id', async(request, response)=>{
     try{
 
     const { id } = request.params;
         
    const book = await Book.findbyid(id);
    return response.status(200).json(book);
     }
     catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message,  });
     }
 });
 
 
 // ------Route to update the book-------------//
router.put('./:id', async(request, response)=>{
     try{
         if(
             !request.body.tittle || 
             !request.body.author ||
             !request.body.publishYear 
         ){
             return response.status(400).send({
                 message:'send all request fields: tittle , author, publishYear',
             });
         }
         const { id } = request.params;
         
         const result = await Book.findIdandUpdate(id, request.body);
         if(!result){
             return response.status(404).json({message: 'Book not found'});
         }
         return response.status(200).json({message: 'Book updated successfully'});
     }
     catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message,  });
     }
 });
 
 //-----------------route to delete a book-----------------//
 
router.put('./:id', async(request, response)=>{
     try{
     const { id } = request.params;
 
     const result = await Book.findIdandDelete(id);
     if(!result){
         return response.status(404).json({message: 'Book not found'});
     }
 
     return response.status(200).send({message: 'Book deleted successfully'});
 
     }
     catch(error){
    console.log(error.message);
    response.status(500).send({message: error.message,  });
     }
 });

 export default router;