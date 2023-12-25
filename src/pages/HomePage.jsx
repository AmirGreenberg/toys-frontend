// const { useState } = React
// const { useSelector, useDispatch } = ReactRedux
import logoPng from '../assets/img/logo.png'
import { useDispatch, useSelector } from "react-redux"


export function HomePage() {
    const dispatch = useDispatch()
    const count = useSelector(storeState => storeState.userModule.count)
    
    function changeCount(diff) {
        console.log('Changing count by:', diff)
        dispatch({ type: 'CHANGE_BY', diff })
    }

    return (
        <section>
            <h2>
                Count {count}
                <button onClick={() => {
                    changeCount(1)
                }}>+</button>
                <button onClick={() => {
                    changeCount(10)
                }}>+10</button>
            </h2 >
            <img src={logoPng} />
        </section >
    )
}