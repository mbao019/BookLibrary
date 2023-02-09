import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import '../App.css';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";

// import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
// import { Toast } from 'primereact/toast';


export default function Create() {

  const [form, setForm] = useState({
      title: "",
      author: "",
      date: "",
      genre: "",
  });

  const categories = [
    { genre: 'Action & Adventure', key: 'AA' },
    { genre: 'Adult', key: 'AD' },
    { genre: 'Biography', key: 'BI' },
    { genre: 'Comedy', key: 'CO' },
    { genre: 'Drama', key: 'DR' },
    { genre: 'Dystopian', key: 'DY' },
    { genre: 'Fantasy', key: 'FA' },
    { genre: 'Horror', key: 'HO' },
    { genre: 'Mystery', key: 'MY' },
    { genre: 'Non-fiction', key: 'NF' },
    { genre: 'Psychological', key: 'PS' },
    { genre: 'Romance', key: 'RO' },
    { genre: 'Satire', key: 'SA' },
    { genre: 'Self Help', key: 'SH' },
    { genre: 'Thriller', key: 'TH' },
    { genre: 'True Crime', key: 'TC' },
    { genre: 'Young Adult', key: 'YA' },
  ];
  
  const [selectedCategories, setSelectedCategories] = useState([categories[0]]);

  const onCategoryChange = (e) => {
      let _selectedCategories = [...selectedCategories];
      if (e.checked)
          _selectedCategories.push(e.value);
      else 
          _selectedCategories = _selectedCategories.filter(category => category.key !== e.value.key);

      setSelectedCategories(_selectedCategories);
      updateForm({ genre: _selectedCategories.sort() });
  };

  const navigate = useNavigate();

  // const [date, setDate] = useState('');
  const dateInputRef = useRef(null);
  
  // These methods will update the state properties.
  function updateForm(value) {
    if (value.genre !== undefined) {
      let getGenre = value.genre.map(a => a.genre);
      getGenre.sort();
      value.genre = getGenre.join(', ');
      return setForm((prev) => {
        return { ...prev, ...value };
      });

    } else {
      return setForm((prev) => {
        return { ...prev, ...value };
      });
    }
}

// This function will handle the submission.
async function onSubmit(e) {
  e.preventDefault();
  var date = form.date;

  console.log(date)
    if (date === undefined || date === null || date === "Plan To Read" || date === "") {
      date = "Plan To Read";
    } else {
      date = JSON.stringify(date).slice(1, 11);
    }

  // When a post request is sent to the create url, we'll add a new book to the database.
  const newBook = {
    title: form.title,
    author: form.author,
    date: date,
    genre: form.genre,
  };

  console.log(newBook)

  //  const newBook = { ...form };

  await fetch("http://localhost:3000/book/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newBook),
  })
  .catch(error => {
    window.alert(error);
    return;
  });

  setForm({ title: "", author: "", date: "", genre: "" });
  navigate("/");
}
 
 // This following section will display the form that takes the input from the user.
return (
  
  <div>
    <i className="pi pi-fw pi-arrow-circle-left" onClick={() => navigate("/")} style={{'fontSize':'2em','cursor':'pointer','marginLeft':50}}></i>
    <div style={{ margin: 'auto', width: '50%', padding: 50}}>
      <h3>Add a New Book</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={form.title}
            onChange={(e) => updateForm({ title: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            type="text"
            className="form-control"
            id="author"
            value={form.author}
            onChange={(e) => updateForm({ author: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date</label>
          <div>
            <Calendar 
              type="date"
              //  className="form-control"
              id="date"
              value={form.date}
              onChange={(e) => updateForm({ date: e.target.value })}
              ref={dateInputRef}
              dateFormat="mm-dd-yy"
              showIcon 
              showButtonBar 
              touchUI 
              />
            </div>
        </div>
        <div className="form-group">
          <label htmlFor="genre">Genres</label>
          <div style ={{ 'columnCount' : 2}}>         
            {categories.map((category) => {
              return (
                <div>
                  <div key={category.key} className="flex align-items-center" style={{'marginTop': 10}}>
                      <Checkbox inputId={category.key} name="category" value={category} onChange={onCategoryChange} checked={selectedCategories.some((item) => item.key === category.key)} />
                      <label htmlFor={category.key} className="ml-2" style={{ 'marginLeft' : 10}}>
                          {category.genre}
                      </label>
                  </div>
                </div>
              );
            })}
          </div>
            
        <div className="form-group">
          <Button 
            label="Add Book" 
            className=" btn btn-primary p-button-raised p-button-info"
            type="submit"
            value="Add New Book"
          />
        </div>
      </div>
    </form>
  </div>
  </div>
);
}