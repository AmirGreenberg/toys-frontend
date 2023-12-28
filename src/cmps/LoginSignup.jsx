import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { userService } from '../services/user.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { LoginForm } from './LoginForm.jsx'

// const { useState } = React

export function LoginSignup({ onSetUser }) {
    const [isSignup, setIsSignUp] = useState(false)

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function _login(credentials) {
        login(credentials)
            .then(onSetUser)
            .then(() => {
                showSuccessMsg('Logged in successfully')
            })
            .catch((err) => {
                showErrorMsg('Oops try again')
            })
    }

    function _signup(credentials) {
        signup(credentials)
            .then(onSetUser)
            .then(() => {
                showSuccessMsg('Signed in successfully')
            })
            .catch((err) => {
                showErrorMsg('Oops try again')
            })
    }

    return (
        <div className="main-header-nav">
            <LoginForm
                className="main-nav clean-list flex"
                onLogin={onLogin}
                isSignup={isSignup}
                setIsSignUp={setIsSignUp}
            />
        </div>
    )
}
