import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Dropdown from 'react-bootstrap/Dropdown'
import '../App.css';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

const Book = (props) => (
  
 <tr>
   <td>{props.book.title}</td>
   <td>{props.book.author}</td>
   <td>{props.book.date}</td>
   <td>{props.book.genre}</td>
   <td>
   <Dropdown >
      <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ background:"none", color:"black", border:"none"}}>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item>
        <Link className="btn btn-link" to={`/edit/${props.book._id}`} style={{ textDecoration:"none"}} >Edit</Link>
        </Dropdown.Item>
        
        <Dropdown.Item>
          <Link className="btn btn-link" to={`/confirmation/${props.book._id}`} style={{ textDecoration:"none"}}>
            Delete
          </Link>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
   </td>
 </tr>
);

export default function BookList() {

  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
  const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

  const onRowEditComplete = (e) => {
    let bookId = e.data._id
    navigate("edit/" + bookId);
  };

  const toggleClass = (e) => {
    return (
      <Dropdown >
        <Dropdown.Toggle variant="success" id="dropdown-basic" style={{ background:"none", color:"black", border:"none"}}></Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
          <Link className="btn btn-link" to={`/edit/${e._id}`} style={{ textDecoration:"none"}} >Edit</Link>
          </Dropdown.Item>
          
          <Dropdown.Item>
            <Link className="btn btn-link" to={`/confirmation/${e._id}`} style={{ textDecoration:"none"}}>
              Delete
            </Link>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  };

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
  
// This method will map out the records on the table
function bookList() {

  return books.map((book) => {
    return (
      <Book
        book={book}
        // deleteBook={() => deleteBook(book._id)}
        key={book._id}
      />
    );
  });
}

function totalBookList() {
  return (
    <h4>Total Books: {bookList().length}</h4>
  )
}
 
 // This following section will display the table with the records of individuals.
return (
  <div className="bookList">
    <h3 style={{ textAlign: "center", margin: 20}}>BOOK LIST</h3>
    <div className="card p-fluid datatable-editing-demo" style={{marginBottom:50}}>
        <DataTable value={books} header={totalBookList} size="small" stripedRows paginator editMode="row" dataKey="id" onRowEditComplete={onRowEditComplete} responsiveLayout="scroll"
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" rows={10} rowsPerPageOptions={[10,20,50]}
            paginatorLeft={paginatorLeft} paginatorRight={paginatorRight}>
            <Column field="title" header="Title" headerStyle={{ width: '30%' }} sortable ></Column>
            <Column field="author" header="Author" headerStyle={{ width: '15%' }}sortable></Column>
            <Column field="date" header="Date"  headerStyle={{ width: '15%' }}sortable></Column>
            <Column field="genre" header="Genres" headerStyle={{ width: '30%' }}sortable></Column>
            <Column field="action" header="Action" rowEditor headerStyle={{ width: '5%'}}  body={toggleClass}></Column>
        </DataTable>
    </div>

    {/* <table className="table table-striped" style={{ marginTop: 100 }}>
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
    </table> */}

  </div>
);
}