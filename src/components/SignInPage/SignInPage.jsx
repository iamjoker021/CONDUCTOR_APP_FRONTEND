const SignInPage = () => {
    return (
        <>
        <h2>SignIn Form</h2>
        <form>
            <label htmlFor="name">Name: </label>
            <input type="text" name="name" id="name" required />
            <label htmlFor="email">Email: </label>
            <input type="email" name="email" id="email" required />
            <label htmlFor="phoneno">Email: </label>
            <input type="tel" name="phoneno" id="phoneno" required />
            <label htmlFor="password">Password: </label>
            <input type="password" name="password" id="password" required />
            <label htmlFor="confirmpassword">Password: </label>
            <input type="password" name="confirmpassword" id="confirmpassword" required />
            <label htmlFor="role">Role: </label>
            <select name="role" id="role" defaultValue={'passenger'} disabled>
                <option value="passenger">passenger</option>
            </select>
            <button type="submit">Log In</button>
        </form>
        <p>Already have account? Log In</p>
        </>
    )
}

export default SignInPage;