import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const SignInPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('passenger');

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true);
        try {
            if (name && email && phoneno && password && confirmPassword && role) {
                const SERVER_URL = 'http://localhost:3000/api';
                const SEND_USER_REG = '/auth/register';
                const response = await fetch(SERVER_URL+SEND_USER_REG, 
                    { 
                        method: 'POST', 
                        headers: { 'Content-type': 'application/json' },
                        body: JSON.stringify({
                            name: name,
                            email: email,
                            phoneno: phoneno,
                            password: password,
                            confirm_password: confirmPassword,
                            role: role,
                        })
                    })
                if (!response.ok) {
                    const data = await response.json();
                    setError(data.msg);
                }
                else {
                    navigate('/auth');
                }
            }
        }
        catch (error) {
            setError(error);
        }
        finally {
            setIsLoading(false);
        }
    }

    return (
        <>
        <h2>SignIn Form</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} required />
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <label htmlFor="phoneno">Phone: </label>
            <input type="tel" name="phoneno" id="phoneno" value={phoneno} onChange={e => setPhoneno(e.target.value)} required />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <label htmlFor="confirmpassword">Password: </label>
            <input type="password" name="confirmpassword" id="confirmpassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
            <label htmlFor="role">Role: </label>
            <select name="role" id="role" value={role} onChange={(e) => setRole(e.target.value)} disabled>
                <option value="passenger">passenger</option>
            </select>
            <button type="submit" disabled={isLoading}>Create Account</button>
            {isLoading && <p>Creating User ....</p>}
            {error !==null && <p>{error}</p>}
        </form>
        <p>Already have account? <Link to="/auth">Log In</Link></p>
        </>
    )
}

export default SignInPage;