import { Routes, Route, Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import headerLogo from "/src/assets/oxente-icon-white.png"
import Main from './components/Main';
import Edit from "./pages/Edit";
import 'react-toastify/dist/ReactToastify.css'
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
    return (
        <>
            <header>
                <Link to={'/'} className='header-logo'>
                    <img src={headerLogo} alt="" />
                </Link>
                <nav className="header-menu">
                    <a href="#" className="header-link">Sobre nós</a>
                    <a href="#" className="header-link">Cafés</a>
                    <a href="#" className="header-link">Fale conosco</a>
                    <a href="#" className="header-link">Contato</a>
                </nav>
                <form className="search-products">
                    <label htmlFor="search">
                        <input type="text" autoComplete="off" placeholder="O que você procura?" id="search" required="" />
                        <div className="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#000" d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5A6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5S14 7.01 14 9.5S11.99 14 9.5 14" /></svg>
                        </div>
                        <button type="reset" className="close-btn">
                            <svg viewBox="0 0 20 20" className="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                                <path clipRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fillRule="evenodd"></path>
                            </svg>
                        </button>
                    </label>
                </form>
            </header>
            <Routes>
                <Route index element={<Main />}></Route>
                <Route path="/editar/" element={<Edit />}></Route>
                <Route path="/registro/" element={<Register />}></Route>
                <Route path="/login/" element={<Login />}></Route>
            </Routes>
            <footer>
                <p>
                    Desenvolvido por
                    <strong>
                        <a href="https://www.linkedin.com/in/j-gui/">José Guilherme</a>
                    </strong>
                </p>
            </footer>
            <ToastContainer />
        </>
    )
}

export default App
