import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown'
import '../App.css';
// import { Route, Routes } from "react-router-dom";
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
// import 'primereact/resources/primereact.css';                       // core css
// import 'primeicons/primeicons.css';    


const Book = (props) => (
  
 <tr>
   <td>{props.book.title}</td>
   <td>{props.book.author}</td>
   <td>{props.book.date}</td>
   <td>{props.book.genre}</td>
   <td>
   <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ background:"none", color:"black", border:"none"}}>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>
        <Link className="btn btn-link" to={`/edit/${props.book._id}`} style={{ textDecoration:"none"}} >Edit</Link>
        </Dropdown.Item>
        
        <Dropdown.Item>
          
          <Link className="btn btn-link" to={`/confirmation/${props.book._id}`} style={{ textDecoration:"none"}}
      // //  onClick={() => {
      // //    props.deleteBook(props.book._id);
      //       }}
          >
            Delete
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
   </td>
 </tr>
);

export default function BookList() {
  const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Book deleted!', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected!', life: 3000 });
    }

  const [books, setBooks] = useState([]);

  
  // This method fetches the records from the database.
  useEffect(() => {
    async function getBooks() {
      const response = await fetch(`http://localhost:3000/book`);
  
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }
      
      const books = await response.json();

      // order the books by date of completion
      const orderedBook = [...books].sort((a, b) => new Date(a.date) - new Date(b.date)).reverse();
      //  const orderedBook = [...books].sort((a, b) => a.title > b.title ? 1 : -1);

      setBooks(orderedBook);
    }
 
    getBooks();
 
    return;
 }, [books.length]);
 
 // This method will delete a record
  function deleteBook(id) {
    return(
      <>
        <Toast ref={toast} />
        <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to delete this book?" 
            header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
        <div className="card" style={{ padding: 200 }}>
            <Button onClick={() => setVisible(true)} icon="pi pi-check" label="Confirm" />
        </div>
      </>
      );
  }

//  async function deletingBook(id) {
//   await fetch(`http://localhost:3000/${id}`, {
//      method: "DELETE"
//    });
 
//    const newBooks = books.filter((el) => el._id !== id);
//    setBooks(newBooks);
//  }
 
 // This method will map out the records on the table
 function bookList() {

   return books.map((book) => {
     return (
       <Book
         book={book}
         deleteBook={() => deleteBook(book._id)}
         key={book._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
   <div  style={{ margin: 'auto', width: '80%' }}>
     <h4> Total Books: {bookList().length}</h4>
     <h3 style={{ textAlign: "center", margin: 20}}>BOOK LIST</h3>
     <table className="table table-striped">
       <thead>
         <tr>
           <th>Title</th>
           <th>Author</th>
           <th>Date</th>
           <th>Genre</th>
           <th>Action</th>
         </tr>
       </thead>
       <tbody>{bookList()}</tbody>
     </table>
   </div>
   
   
 );
}