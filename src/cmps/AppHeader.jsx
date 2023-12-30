import { useDispatch, useSelector } from 'react-redux'
import { NavLink, useNavigate } from 'react-router-dom'
import logoPng from '../assets/img/logo.png'

import { UserMsg } from './UserMsg.jsx'
import { LoginSignup } from './LoginSignup.jsx'
import { userService } from '../services/user.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { SET_USER } from '../store/reducers/user.reducer.js'
import { SET_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'

// const { useSelector, useDispatch } = ReactRedux
// const { Link, NavLink } = ReactRouterDOM
// const { useNavigate } = ReactRouter

export function AppHeader() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // TODO: move to storeState
    // const [user, setUser] = useState(userService.getLoggedinUser())
    const user = useSelector((storeState) => storeState.userModule.loggedinUser)
    const isCartShown = useSelector(
        (storeState) => storeState.toyModule.isCartShown
    )

    async function onLogout() {
        try {
            await userService.logout()
            onSetUser(null)
        } catch (err) {
            showErrorMsg('OOPs try again')
        }
    }

    function onSetUser(user) {
        // DONE: use dispatch
        // setUser(user)
        dispatch({ type: SET_USER, user })
        navigate('/')
    }

    function onToggleCart(ev) {
        ev.preventDefault()
        dispatch({ type: SET_CART_IS_SHOWN, isCartShown: !isCartShown })
    }

    return (
        <header className="main-header full justify-between flex">
            <div className="flex">
                <div className="main-header-logo">
                    <img src={logoPng} />
                </div>
                <div>
                    {user ? (
                        <section>
                            <span to={`/user/${user._id}`}>
                                Hello {user.fullname}{' '}
                                <span>${user.score.toLocaleString()}</span>
                            </span>
                            <button onClick={onLogout}>Logout</button>
                        </section>
                    ) : (
                        <section>
                            <LoginSignup onSetUser={onSetUser} />
                        </section>
                    )}
                </div>
            </div>
            <nav className="main-header-nav flex">
                <ul className="main-nav clean-list flex">
                    <li className="btn">
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li className="btn">
                        <NavLink to="/toy">Store</NavLink>
                    </li>
                    <li className="btn">
                        <NavLink to="/about">About</NavLink>
                    </li>
                </ul>
            </nav>
            <UserMsg />
        </header>
    )
}
