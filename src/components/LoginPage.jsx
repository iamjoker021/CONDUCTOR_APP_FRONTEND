import { useState } from "react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault();
        await login(email, password);
    }

    return (
        <>
        <div className="centerForm">
        <h1>Login Form</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email: </label>
            <input 
                type="email" 
                name="email" 
                id="email" 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                required 
            />
            <label htmlFor="password">Password: </label>
            <input 
                type="password" 
                name="password" 
                id="password" 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                required 
            />
            {<button type="submit" disabled={isLoading}>Log In</button>}
            {isLoading && <p>Logging In User ....</p>}
            {error !==null && <p>{error}</p>}
        </form>
        <p>Didn't have account? <Link to="/auth/signin">Create Account</Link></p>
        </div>
        </>
    )
}

export default LoginPage;