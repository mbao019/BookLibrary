import React, { useState, useRef, useEffect } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import { useParams, useNavigate } from "react-router";
import '../App.css';


export default function DeclarativeDemo() {
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const [form, setForm] = useState({
        title: "",
        author: "",
        date: "",
        genre: "",
        books: [],
      });
  
    const params = useParams();
    const navigate = useNavigate();

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'Book deleted!', life: 2000 });
        setTimeout(() => {
            deletingBook();
        }, 1500);
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected!', life: 2000 });
    }

    useEffect(() => {
        async function fetchData() {
            const id = params.id.toString();
            const response = await fetch(`http://localhost:3000/book/${params.id.toString()}`);
        
            if (!response.ok) {
              const message = `An error has occurred: ${response.statusText}`;
              window.alert(message);
              return;
            }
        
            const book = await response.json();
            // if (!book) {
            //   window.alert(`book with id ${id} not found`);
            //   navigate("/");
            //   return;
            // }
        
            setForm(book);
          }
          fetchData()
      });
    
      async function deletingBook() {
         const id = params.id.toString();
          await fetch(`http://localhost:3000/${id}`, {
             method: "DELETE"
           });
            navigate("/");
    
         
        //    const newBooks = books.filter((el) => el._id !== id);
        //    setBooks(newBooks);
         }

    return (
        <div>
            <i className="pi pi-fw pi-arrow-circle-left" onClick={() => navigate("/")} style={{'fontSize': '2em', 'cursor' : 'pointer', 'marginLeft':50}}></i>            
            <div id="bookConfirmation"
                style={{
                    'text-align': 'center', 
                    'margin': 'auto', 
                    'padding':'50px',
                    'border-style': 'solid', 
                    'border-radius':'50px',
                    'width': '30%'
                }}>
                <h1>{form.title}</h1>
                <h3>By {form.author}</h3>   
            </div>
            <div style={{ marginTop: 20 }}>
                <Toast ref={toast} />
                <ConfirmDialog visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to delete this book?" 
                    header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
                <div className="card" style={{ margin: 'auto', width: 150 }}>
                    <Button className="p-button-raised p-button-warning" onClick={() => setVisible(true)} icon="pi pi-check" label="Delete" />
                </div>
            </div>
        </div>
    )
}
        