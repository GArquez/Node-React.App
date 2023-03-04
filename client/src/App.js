import Navbar from './Components/Navbar/Navbar';
import Main from './Components/Main/Main';
import Footer from './Components/Footer/Footer';
import SignIn from './Components/Forms/SignIn';
import SignUp from './Components/Forms/SignUp';
import ItemsContainer from './Components/ItemsContainer/ItemsContainer';
import ItemDetailList from './Components/ItemDetailList/ItemDetailList';
import CartModal from './Components/CartModal/CartModal';
import Checkout from './Components/Checkout/Checkout';
import Portal from './Components/Portal/Portal';
import { CartProvider, UserContext } from './Context/Context';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import './App.css';


function App() {
  const {userState, verifyUser, syncLogout} = useContext(UserContext);

  useEffect( () => {
    verifyUser();
  }, [verifyUser])
  useEffect( () => {
    window.addEventListener('storage', syncLogout);
    return () => { window.removeEventListener('storage', syncLogout) }
  }, [syncLogout])

  return userState.token === null ? (
      <CartProvider>
        <BrowserRouter>
          <Navbar />
          <CartModal />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/ingresar' element={<SignIn />} />
            <Route path='/registrarme' element={<SignUp />} />
            <Route path='/productos' element={<ItemsContainer />} />
            <Route path='/categoria/:category' element={<ItemsContainer />} />
            <Route path='/detalle/:productForId' element={<ItemDetailList /> } />
            {/*<Route path='/checkout' element={<Checkout />} />*/}
            <Route path='*' element={<h1 style={{display: "flex", alignItems: "center", justifyContent: "center", height: "500px"}}>Error 404 Not Found</h1>} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider> 
  ) : userState.token ?
  (
    <CartProvider>
    <BrowserRouter>
      <Navbar />
      <CartModal />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/portal' element={<Portal />} />
        <Route path='/productos' element={<ItemsContainer />} />
        <Route path='/categoria/:category' element={<ItemsContainer />} />
        <Route path='/detalle/:productForId' element={<ItemDetailList /> } />
        <Route path='/checkout' element={<Checkout />} />
        <Route path='*' element={<h1 style={{display: "flex", alignItems: "center", justifyContent: "center", height: "500px"}}>Error 404 Not Found</h1>} />
      </Routes>
      <Footer />
    </BrowserRouter>
    </CartProvider> 
  ) :
  (
    <div className="d-flex justify-content-center align-items-center" style={{ "height": "100vh" }}>
        <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}

export default App;