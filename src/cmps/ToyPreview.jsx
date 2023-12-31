import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function ToyPreview({ toy, onRemoveToy, onEditToy, addToCart }) {
    return (
        <li className="toy-preview" key={toy._id}>
            <Link to={`/toy/${toy._id}`}>
                {toy.name && <h4>{toy.name}</h4>}
                <img src={`https://robohash.org/${toy.name}?set=set2`} alt="" />
            </Link>
            {toy.price && (
                <p>
                    Price: <span>${toy.price.toLocaleString()}</span>
                </p>
            )}
            {toy.labels && (
                <p>
                    Labels: <span>{toy.labels.join(', ')}</span>
                </p>
            )}
            {toy.createdAt && (
                <p>
                    Created at:{' '}
                    <span>
                        {new Date(toy.createdAt).toString().substring(0, 25)}
                    </span>
                </p>
            )}
            <p>
                Inventory:{' '}
                <span>
                    {toy.inStock === true ? 'In stock' : 'Out of stock'}
                </span>
            </p>
            <div className="flex">
                <a
                    className="btn"
                    onClick={() => {
                        onRemoveToy(toy._id)
                    }}
                >
                    Remove
                </a>
                <a
                    className="buy btn"
                    onClick={() => {
                        addToCart(toy)
                    }}
                >
                    Add to Cart
                </a>
                <NavLink to={`/toy/edit/${toy._id}`}>
                    {' '}
                    <a className="btn"> Edit </a>{' '}
                </NavLink>
                <NavLink to={`/toy/${toy._id}`}>
                    <a className="btn"> Details </a>
                </NavLink>
            </div>
        </li>
    )
}
