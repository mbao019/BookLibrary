import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Dropdown from 'react-bootstrap/Dropdown'
import '../App.css';
import { Button } from 'primereact/button';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { InputText } from 'primereact/inputtext';
import Book from './book.js';

export default function BookList() {

  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [globalFilterValue, setGlobalFilterValue] = useState('');

  // const paginatorLeft = <Button type="button" icon="pi pi-refresh" className="p-button-text" />;
  // const paginatorRight = <Button type="button" icon="pi pi-cloud" className="p-button-text" />;

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
  });

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

const onGlobalFilterChange = (e) => {
  const value = e.target.value;
  let _filters = { ...filters };

  _filters['global'].value = value;

  setFilters(_filters);
  setGlobalFilterValue(value);
};


const renderHeader = () => {
  return (
      <div className="flex justify-content-end" style={{ marginLeft: "80%", }}>
          <span className="p-input-icon-left">
              <i className="pi pi-search" />
              <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
          </span>
      </div>
  );
};

// This method will map out the records on the table
const bookList = () => {

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

const completedBooks = () => {
  let num = 0;
  books.map((book) => {
    if (book.date !== "Plan To Read") {
      num++;
    }
  });
  return (
    num
  )
}

const planToReadBooks = () => {
  let num = 0;
  books.map((book) => {
    if (book.date == "Plan To Read") {
      num++;
    }
  });
  return (
    num
  )
}

const header = renderHeader();
 
 // This following section will display the table with the records of books.
return (
  <div class="mainLayout">
    <div className="bookList">
      {/* <h3 style={{ textAlign: "center", margin: 20}}>BOOK LIST</h3> */}
      <div className="card p-fluid datatable-editing-demo" style={{marginBottom:50}}>
          <DataTable 
            value={books} 
            header={header} 
            size="small" 
            stripedRows paginator 
            editMode="row" 
            dataKey="id" 
            onRowEditComplete={onRowEditComplete} 
            responsiveLayout="scroll" 
            paginatorTemplate="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
            currentPageReportTemplate="Showing {first} to {last} of {totalRecords}" 
            rows={25} rowsPerPageOptions={[20,50]}
            filters={filters} 
            // filterDisplay="row"
            globalFilterFields={['title', 'author', 'date', 'genre']}
            >

              {/* // paginatorLeft={paginatorLeft} paginatorRight={paginatorRight} */}
              <Column field="title" header="Title" headerStyle={{ width: '30%' }} sortable ></Column>
              <Column field="author" header="Author" headerStyle={{ width: '15%' }}sortable></Column>
              <Column field="date" header="Date"  headerStyle={{ width: '10%' }}sortable></Column>
              <Column field="genre" header="Genres" headerStyle={{ width: '30%' }}sortable></Column>
              <Column field="action" header="Action" rowEditor headerStyle={{ width: '5%'}}  body={toggleClass}></Column>
          </DataTable>
      </div>
    </div>
    
    <div class="bookStats">
      <table>
        <tr>
          <th>Total Books</th>
          <th>Completed</th>
          <th>Plan To Read</th>
        </tr>
        <tr>
          <td>{bookList().length}</td>
          <td>{completedBooks()}</td>
          <td>{planToReadBooks()}</td>
        </tr>
      </table>
    </div>

    <div class="graph">
      <h4>Graph</h4>
    </div>


  </div>
  
  );
}