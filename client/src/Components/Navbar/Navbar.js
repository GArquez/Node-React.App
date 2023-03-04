import './Navbar.css';
import { Link } from 'react-router-dom';
import CartWidget from '../CartWidget/CartWidget';
import {useContext} from 'react';
import {UserContext} from '../../Context/Context'

const Navbar = () => {
  const {userState} = useContext(UserContext); 

    return (
        <nav className="navbar navbar-expand-lg bg-light">
  <div className="container-fluid">
    <Link to={'/'} > <img className="navbar-logo" src='/images/logo.jpg' alt='Punto verde logo.' /> </Link> 
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mb-2 mb-lg-0">
        <li className="nav-item">
          <Link to={'/productos'} className="nav-link active" aria-current="page" >Productos</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" >Combos</Link>
        </li>
        <li className="nav-item dropdown">
          <Link className="nav-link dropdown-toggle"  role="button" data-bs-toggle="dropdown" aria-expanded="false">
          Acerca de nosotros
          </Link>
          <ul className="dropdown-menu">
            <li><Link className="dropdown-item" >Action</Link></li>
            <li><Link className="dropdown-item" >Another action</Link></li>
            <li><hr className="dropdown-divider"/></li>
            <li><Link className="dropdown-item" >Something else here</Link></li>
          </ul>
        </li>
      </ul>
      { !userState.token ?
      <ul style={{ "padding":"0", "margin":"0"}}>
        <Link to={'/ingresar'} className="btn btn-outline-success">Iniciar sesión</Link>
        <Link to={'/registrarme'} className="btn btn-outline-success">Registrarme</Link>
      </ul> :
      <ul style={{ "padding":"0", "margin":"0"}}>    
      <Link to={'/portal'} className="btn btn-outline-success">Portal</Link>
      </ul>
      }
      <CartWidget />
    </div>
  </div>
</nav>
    )
};

export default Navbar;