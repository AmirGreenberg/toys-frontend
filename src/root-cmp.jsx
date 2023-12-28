import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
// const Router = ReactRouterDOM.BrowserRouter
// const { Route, Routes } = ReactRouterDOM
// const { Provider } = ReactRedux

import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'

import { HomePage } from './pages/HomePage'
import { AboutUs } from './pages/AboutUs'
import { ToyIndex } from './pages/ToyIndex.jsx'
import { ToyEdit } from './pages/ToyEdit.jsx'
import { store } from './store/store'
import { ToyDetails } from './pages/ToyDetails.jsx'

export function App() {
    return (
        <Provider store={store}>
            <Router>
                <section className="main-layout">
                    <AppHeader />
                    <Routes>
                        <Route element={<HomePage />} path="/" />
                        <Route element={<AboutUs />} path="/about" />
                        <Route element={<ToyDetails />} path="/toy/:toyId" />
                        <Route element={<ToyIndex />} path="/toy" />
                        <Route element={<ToyEdit />} path="/toy/edit/:toyId?" />
                    </Routes>
                    <AppFooter />
                </section>
            </Router>
        </Provider>
    )
}
