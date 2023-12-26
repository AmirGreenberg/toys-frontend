import { Link } from 'react-router-dom'
import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'

export function ToyPreview({ toy, onRemoveToy, onEditToy, addToCart }) {
    const pexelsApiKey =
        'HplrBxATX1ZEUL2Di1m07ViAZLaGUTGfFwx3W14BYTmxApATW7x8Og4O'
    const [imageUrl, setImageUrl] = useState(null)

    const query = encodeURIComponent(toy.name)
    const pexelsUrl = `https://api.pexels.com/v1/search?query=${query}&per_page=1`

    const fetchImage = async () => {
        try {
            const response = await fetch(pexelsUrl, {
                headers: {
                    Authorization: pexelsApiKey,
                },
            })

            if (!response.ok) {
                throw new Error('Failed to fetch image from Pexels')
            }

            const data = await response.json()
            const newImageUrl =
                data.photos.length > 0 ? data.photos[0].src.medium : null
            setImageUrl(newImageUrl)
        } catch (error) {
            console.error('Error fetching image:', error)
        }
    }

    useEffect(() => {
        fetchImage()
    }, [toy.name])

    return (
        <li className="toy-preview" key={toy._id}>
            <Link to={`/toy/${toy._id}`}>
                {toy.name && <h4>{toy.name}</h4>}
                {imageUrl && <img src={imageUrl} alt={toy.name} />}
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
