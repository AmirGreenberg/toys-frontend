// const { useState } = React
// const { useSelector, useDispatch } = ReactRedux
import wow from '../assets/img/wow.jpg'
import { useDispatch, useSelector } from 'react-redux'

export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector((storeState) => storeState.userModule.count)

    function changeCount(diff) {
        console.log('Changing count by:', diff)
        dispatch({ type: 'CHANGE_BY', diff })
    }

    return (
        <section>
            <img className="wow" src={wow} />
        </section>
    )
}
