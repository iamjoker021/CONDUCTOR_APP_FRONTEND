const LoginPage = () => {
    return (
        <>
        <h2>Login Form</h2>
        <form>
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" required />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" required />
            <button type="submit">Log In</button>
        </form>
        <p>Didn't have acount? Create Account</p>
        </>
    )
}

export default LoginPage;