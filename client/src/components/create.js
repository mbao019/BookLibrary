import React, { useRef, useState } from "react";
import { useNavigate } from "react-router";
import '../App.css';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { Checkbox } from "primereact/checkbox";


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

  const [date, setDate] = useState('');
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
          {/* </div>
          <div className="">
          <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genreOptions"
                id="genreAction&Adventure"
                value="Action & Adventure"
                checked={form.genre === "Action & Adventure"}
                onChange={(e) => updateForm({ genre: e.target.value })}
              />
              <label htmlFor="genreAction&Adventure" className="form-check-label">Action & Adventure</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genreOptions"
                id="genreAdult"
                value="Adult"
                checked={form.genre === "Adult"}
                onChange={(e) => updateForm({ genre: e.target.value })}
              />
              <label htmlFor="genreAdult" className="form-check-label">Adult</label>
          </div>
          <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genreOptions"
                id="genreBibliography"
                value="Bibliography"
                checked={form.genre === "Bibliography"}
                onChange={(e) => updateForm({ genre: e.target.value })}
              />
              <label htmlFor="genreBibliography" className="form-check-label">Bibliography</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genreOptions"
                id="genreComedy"
                value="Comedy"
                checked={form.genre === "Comedy"}
                onChange={(e) => updateForm({ genre: e.target.value })}
              />
              <label htmlFor="genreComedy" className="form-check-label">Comedy</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genreOptions"
                id="genreDrama"
                value="Drama"
                checked={form.genre === "Drama"}
                onChange={(e) => updateForm({ genre: e.target.value })}
              />
              <label htmlFor="genreDrama" className="form-check-label">Drama</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genreOptions"
                id="genreDystopian"
                value="Dystopian"
                checked={form.genre === "Dystopian"}
                onChange={(e) => updateForm({ genre: e.target.value })}
              />
              <label htmlFor="genreDystopian" className="form-check-label">Dystopian</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genreOptions"
                id="genreFantasy"
                value="Fantasy"
                checked={form.genre === "Fantasy"}
                onChange={(e) => updateForm({ genre: e.target.value })}
              />
              <label htmlFor="genreFantasy" className="form-check-label">Fantasy</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genreOptions"
                id="genreMystery"
                value="Mystery"
                checked={form.genre === "Mystery"}
                onChange={(e) => updateForm({ genre: e.target.value })}
              />
              <label htmlFor="genreMystery" className="form-check-label">Mystery</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genreOptions"
                id="genreRomance"
                value="Romance"
                checked={form.genre === "Romance"}
                onChange={(e) => updateForm({ genre: e.target.value })}
              />
              <label htmlFor="genreRomance" className="form-check-label">Romance</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genreOptions"
                id="genreSatire"
                value="Satire"
                checked={form.genre === "Satire"}
                onChange={(e) => updateForm({ genre: e.target.value })}
              />
              <label htmlFor="genreSatire" className="form-check-label">Satire</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genreOptions"
                id="genreSelfHelp"
                value="Self Help"
                checked={form.genre === "Self Help"}
                onChange={(e) => updateForm({ genre: e.target.value })}
              />
              <label htmlFor="genreSelfHelp" className="form-check-label">Self Help</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genreOptions"
                id="genreThriller"
                value="Thriller"
                checked={form.genre === "Thriller"}
                onChange={(e) => updateForm({ genre: e.target.value })}
              />
              <label htmlFor="genreThriller" className="form-check-label">Thriller</label>
            </div>
            <div className="form-check form-check-inline">
              <input
                className="form-check-input"
                type="radio"
                name="genreOptions"
                id="genreYoungAdult"
                value="Young Adult"
                checked={form.genre === "Young Adult"}
                onChange={(e) => updateForm({ genre: e.target.value })}
              />
              <label htmlFor="genreYoungAdult" className="form-check-label">Young Adult</label>
          </div> */}
        </div>
      </form>
    </div>
   </div>
 );
}