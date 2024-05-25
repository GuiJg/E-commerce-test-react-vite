import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const registerUser = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://e-commerce-test-nfi8.onrender.com/api/auth/register', { name, email, password });
            toast.success('Usário registrado com sucesso');
            toast.success(`Bem-vindo, ${response.name}`);
        } catch (error) {
            toast.error('Erro ao registrar: ' + error.response.data.msg);
        }
    };

    return (
        <form onSubmit={registerUser}>
            <h2>Registrar</h2>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nome" required />
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Senha" required />
            <button type="submit">Registrar</button>
        </form>
    );
};

export default Register;
