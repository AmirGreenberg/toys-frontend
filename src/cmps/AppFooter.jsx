import { useDispatch, useSelector } from 'react-redux'
// const { useState, useEffect } = React
// const { useSelector, useDispatch } = ReactRedux

import { UserMsg } from './UserMsg.jsx'
import { ShoppingCart } from './ShoppingCart.jsx'
import { SET_CART_IS_SHOWN } from '../store/reducers/toy.reducer.js'

export function AppFooter() {
    const dispatch = useDispatch()
    // const [isCartShown, setIsCartShown] = useState(false)
    const isCartShown = useSelector(
        (storeState) => storeState.toyModule.isCartShown
    )
    const count = useSelector((storeState) => storeState.userModule.count)
    const toysCount = useSelector(
        (storeState) => storeState.toyModule.toys.length
    )

    const cart = []

    return (
        <footer className="flex">
            <div className="flex justify-between">
                <h5>Currently {toysCount} toys in the shop</h5>
                <p>Coffeerights to all - Count: {count}</p>
                <h5>
                    <span>{cart.length}</span> Products in your Cart
                    <a
                        href="#"
                        onClick={(ev) => {
                            ev.preventDefault()
                            dispatch({
                                type: SET_CART_IS_SHOWN,
                                isCartShown: !isCartShown,
                            })
                        }}
                    >
                        ({isCartShown ? 'hide' : 'show'})
                    </a>
                </h5>

                <ShoppingCart isCartShown={isCartShown} />
                <UserMsg />
            </div>
        </footer>
    )
}
