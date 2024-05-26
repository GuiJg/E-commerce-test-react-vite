import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const Login = ({ setAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://e-commerce-test-nfi8.onrender.com/api/auth/login', { email, password });
            localStorage.setItem('token', response.data.token);
            setAuth(true);
            toast.success('Usuário logado com sucesso');
            toast.success(`Bem-vindo, ${response.data.name}`);
        } catch (error) {
            toast.error('Erro ao logar: ' + error.response.data.msg);
        }
    };

    return (
        <div className="form-auth">
            <form onSubmit={loginUser}>
                <h2>Login</h2>
                <label>E-mail </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Digite seu email" required />
                <label>Senha </label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Digite sua senha" required />
                <Link to={'/registro'} className="link-register">Não tem conta? Crie uma aqui</Link>
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
