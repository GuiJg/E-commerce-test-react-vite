import { useState } from 'react';
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import PropTypes from 'prop-types';  

const VITE_DATABASE_URL = import.meta.env.VITE_DATABASE_URL;

const Login = ({ setAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();    

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${VITE_DATABASE_URL}/api/auth/login`, { email, password });
            localStorage.setItem('token', response.data.token);
            setAuth(true);
            navigate('/');
            toast.success('Usuário logado com sucesso');
        } catch (error) {
            if (error.response) {
                // Se houver uma resposta do servidor, exiba a mensagem de erro fornecida pelo servidor
                toast.error('Erro ao logar: ' + error.response.data.msg);
            } else {
                // Caso contrário, exiba uma mensagem genérica de erro
                toast.error('Erro ao logar. Por favor, tente novamente.');
            }
        }
    };    

    return (
        <div className="form-auth">
            <form onSubmit={loginUser}>
                <h2>Login</h2>
                <label>E-mail </label>
                <input type="email" id='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email" required />
                <label>Senha </label>
                <input type="password" id='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" required />
                <Link to={'/registro'} className="link-register">Não tem conta? Crie uma aqui</Link>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

// Adicione a validação de tipo para setAuth
Login.propTypes = {
    setAuth: PropTypes.func.isRequired,
};

export default Login;
