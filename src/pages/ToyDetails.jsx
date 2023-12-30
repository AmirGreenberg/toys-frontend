// const { useEffect, useState } = React
// const { useParams, useNavigate, Link } = ReactRouterDOM

import { useState, useEffect } from 'react'
import { toyService } from '../services/toy.service.js'
import { showErrorMsg } from '../services/event-bus.service.js'
import { useNavigate, useParams } from 'react-router-dom'

export function ToyDetails(addToCart) {
    const [toy, setToy] = useState(null)
    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadToy()
    }, [toyId])

    async function loadToy() {
        try {
            const toy = await toyService.getById(toyId)
            setToy(toy)
        } catch (err) {
            console.log('Had issues in toy details', err)
            showErrorMsg('Cannot load toy')
            navigate('/toy')
        }
    }

    if (!toy) return <div>Loading...</div>
    return (
        <section className="toy-details">
            <h1>Toy name : {toy.name}</h1>
            <h5>Price: ${toy.price}</h5>
            <h5>Categories: {toy.labels.join(', ')}</h5>
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
            <p>🧸</p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi
                voluptas cumque tempore, aperiam sed dolorum rem! Nemo quidem,
                placeat perferendis tempora aspernatur sit, explicabo veritatis
                corrupti perspiciatis repellat, enim quibusdam!
            </p>
        </section>
    )
}
