import  express  from "express";
import { Book } from "../models/bookModels.js"; 

const router = express.Router()

//Routes for save a new book
router.post("/", async (req, resp) => {
    try {
      if (!req.body.title || 
          !req.body.author ||
          !req.body.publishYear) {
        return resp.status(400).send({
          message: "Send all reuired fields: title, author, publishYear",
        });
      }
      const newBook = {
          title: req.body.title,
          author: req.body.author,
          publishYear: req.body.publishYear,
      };
  
      const book = await Book.create(newBook);
  
      return resp.status(201).send(book);
    } catch (error) {
      console.log(error.message);
      resp.status(500)({ message: error.message });
    }
  });
  
  //Route for get all books 
  router.get('/', async (req,resp)=> {
      try {
          const books = await Book.find({});
          return resp.status(200).json({
              count: books.length,
              data: books,
          });
      } catch (error) {
          console.log(error.message)
          resp.status(500).send({message :error.message})
          
      }
  })
  
  // Routes for get one book from DB by id 
  router.get('/:id', async (req,resp)=> {
      try {
          const {id} = req.params;
          const book = await Book.findById(id);
          return resp.status(200).json(book);
      } catch (error) {
          console.log(error.message)
          resp.status(500).send({message :error.message})
          
      }
  })
  
  //Route for update book 
  router.put('/:id', async (req,resp)=>{
      try {
          if (!req.body.title ||
             !req.body.author ||
             !req.body.publishYear) {
            return resp.status(400).send({
              message: "Send all reuired fields: title, author, publishYear",
            });
          }
          const {id} = req.params;
          const result = await Book.findByIdAndUpdate(id, req.body);
          
          if(!result){
              return resp.status(404).json({ message: 'Book Not Found..!'})
          }
          return resp.status(200).send({message: 'Book Update Succesfully'});
        } catch (error) {
          console.log(error.message);
          resp.status(500)({ message: error.message });
        }
      });
  
  //route for delete book 
      router.delete('/:id', async (req,resp) =>{
          try {
              const {id} = req.params;
              const result = await Book.findByIdAndDelete(id);
              if(!result){
                  return resp.status(400).send({message: 'Book Not Found'});
              }
              return resp.status(200).send({message: 'Book Deleted Successfully'})
          } catch (error) {
              console.log(error.message);
              resp.status(500)({ message: error.message });
              
          }
      })
  
      export default router;