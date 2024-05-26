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
                    <Link href="#" className="header-link">Sobre nós</Link>
                    <Link href="#" className="header-link">Cafés</Link>
                    <Link href="#" className="header-link">Fale conosco</Link>
                    <Link href="#" className="header-link">Contato</Link>
                    <Link to={'/login'} className="header-login" onClick={() => localStorage.clear()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><path fill="#fff" fillRule="evenodd" d="M12 1.25a4.75 4.75 0 1 0 0 9.5a4.75 4.75 0 0 0 0-9.5M8.75 6a3.25 3.25 0 1 1 6.5 0a3.25 3.25 0 0 1-6.5 0M12 12.25c-2.313 0-4.445.526-6.024 1.414C4.42 14.54 3.25 15.866 3.25 17.5v.102c-.001 1.162-.002 2.62 1.277 3.662c.629.512 1.51.877 2.7 1.117c1.192.242 2.747.369 4.773.369s3.58-.127 4.774-.369c1.19-.24 2.07-.605 2.7-1.117c1.279-1.042 1.277-2.5 1.276-3.662V17.5c0-1.634-1.17-2.96-2.725-3.836c-1.58-.888-3.711-1.414-6.025-1.414M4.75 17.5c0-.851.622-1.775 1.961-2.528c1.316-.74 3.184-1.222 5.29-1.222c2.104 0 3.972.482 5.288 1.222c1.34.753 1.961 1.677 1.961 2.528c0 1.308-.04 2.044-.724 2.6c-.37.302-.99.597-2.05.811c-1.057.214-2.502.339-4.476.339c-1.974 0-3.42-.125-4.476-.339c-1.06-.214-1.68-.509-2.05-.81c-.684-.557-.724-1.293-.724-2.601" clipRule="evenodd"></path></svg>
                    </Link>
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
                <label className="hamburger">
                    <input type="checkbox" />
                    <svg viewBox="0 0 32 32">
                        <path className="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
                        <path className="line" d="M7 16 27 16"></path>
                    </svg>
                </label>
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
