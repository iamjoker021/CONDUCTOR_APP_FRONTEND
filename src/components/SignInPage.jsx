import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSignin } from "../hooks/useSignin";

const SignInPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneno, setPhoneno] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('passenger');

    const { signin, isLoading, error } = useSignin();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signin(name,email,phoneno,password,confirmPassword,role);
    }

    return (
        <>
        <div>
        <h1>SignIn Form</h1>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" value={name} onChange={e => setName(e.target.value)} required />
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required />
            <label htmlFor="phoneno">Phone: </label>
            <input type="tel" name="phoneno" id="phoneno" value={phoneno} onChange={e => setPhoneno(e.target.value)} required />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" value={password} onChange={e => setPassword(e.target.value)} required />
            <label htmlFor="confirmpassword">Confirm Password: </label>
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
        </div>
        </>
    )
}

export default SignInPage;