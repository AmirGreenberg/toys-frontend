import { useState } from 'react'
import { userService } from '../services/user.service.js'

// const { useState } = React

export function LoginForm({ onLogin, isSignup, setIsSignUp }) {
    const [credentials, setCredentials] = useState(
        userService.getEmptyCredentials()
    )

    function handleChange({ target }) {
        const { name: field, value } = target
        setCredentials((prevCreds) => ({ ...prevCreds, [field]: value }))
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onLogin(credentials)
    }

    return (
        <form className="flex-column" onSubmit={handleSubmit}>
            <div>
                <input
                    type="text"
                    name="username"
                    value={credentials.username}
                    placeholder="Username"
                    onChange={handleChange}
                    required
                    autoFocus
                />
            </div>
            <div>
                <input
                    type="password"
                    name="password"
                    value={credentials.password}
                    placeholder="Password"
                    onChange={handleChange}
                    required
                    autoComplete="off"
                />
            </div>
            {isSignup && (
                <div>
                    <input
                        type="text"
                        name="fullname"
                        value={credentials.fullname}
                        placeholder="Full name"
                        onChange={handleChange}
                        required
                    />
                </div>
            )}
            <div
                className="cursor-pointer"
                href="#"
                onClick={() => setIsSignUp(!isSignup)}
            >
                {isSignup ? 'Already a member? Login' : 'New user? Signup here'}
                <button className="btn margin-10">
                    {isSignup ? 'Signup' : 'Login'}
                </button>
            </div>
        </form>
    )
}
