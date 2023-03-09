import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import Dropdown from 'react-bootstrap/Dropdown'
import '../App.css';

const Book = (props) => {
    return (
    <tr>
      <td>{props.book.title}</td>
      <td>{props.book.author}</td>
      <td>{props.book.date}</td>
      <td>{props.book.genre}</td>
      <td>
  
      {/* action button */}

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
}

export default Book;
