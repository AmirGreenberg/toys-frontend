import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'

// const { Link } = ReactRouterDOM
export function ToyPreview({ toy, onRemoveToy, onEditToy, addToCart }) {
    return (
        <li className="toy-preview" key={toy._id}>
            <Link to={`/toy/${toy._id}`}>
                {toy.name && <h4>{toy.name}</h4>}
                <h1>🧸</h1>
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
                <span>{toy.inStock ? 'In stock' : 'Out of stock'}</span>
            </p>
            <div>
                <button
                    onClick={() => {
                        onRemoveToy(toy._id)
                    }}
                >
                    Remove
                </button>
            </div>
            <button
                className="buy"
                onClick={() => {
                    addToCart(toy)
                }}
            >
                Add to Cart
            </button>
            <section className="toy-prev-btns">
                <NavLink to={`/toy/edit/${toy._id}`}>
                    {' '}
                    <button> Edit </button>{' '}
                </NavLink>
                <NavLink to={`/toy/${toy._id}`}>
                    <button> Details </button>
                </NavLink>
            </section>
        </li>
    )
}
