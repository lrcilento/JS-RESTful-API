import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import * as express from "express";
import * as cors from 'cors';

admin.initializeApp(functions.config().firebase);

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

const db = admin.firestore();
const bookCollection = "books";

export const webApi = functions.https.onRequest(app);

interface Book {
  title: string;
  author: string;
  year: string;
  price: string;
}

app.listen(4000, function() {
  console.log("Listening on port 4000");
})

app.post("/books", async (req, res) => {
  try {
    const book: Book = {
      title: req.body["title"],
      author: req.body["author"],
      year: req.body["year"],
      price: req.body["price"],
    };
    const newDoc = await db.collection(bookCollection).add(book);
    res.status(201).send("Created a new book: " + newDoc.id);
  } catch (error) {
    res.status(400).send("Books should contain title, author, year and price!");
  }
});

app.get("/books", async (req, res) => {
  try {
    const bookQuerySnapshot = await db.collection(bookCollection).get();
    const books: any[] = [];
    bookQuerySnapshot.forEach((doc) => {
      books.push({
        id: doc.id,
        data: doc.data(),
      });
    });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).send(error);
  }
});

app.get("/books/:bookId", (req, res) => {
  const bookId = req.params.bookId;
  db.collection(bookCollection)
      .doc(bookId)
      .get()
      .then((book) => {
        if (!book.exists) throw new Error("book not found");
        res.status(200).json({id: book.id, data: book.data()});
      })
      .catch((error) => res.status(500).send(error));
});

app.delete("/books/:bookId", (req, res) => {
  db.collection(bookCollection)
      .doc(req.params.bookId)
      .delete()
      .then(() => res.status(204).send("Document successfully deleted!"))
      .catch(function(error) {
        res.status(500).send(error);
      });
});

app.put("/books/:bookId", async (req, res) => {
  await db
      .collection(bookCollection)
      .doc(req.params.bookId)
      .set(req.body, {merge: true})
      .then(() => res.json({id: req.params.bookId}))
      .catch((error) => res.status(500).send(error));
});
