import React, { useState, useEffect } from 'react'
import GoogleMapReact from 'google-map-react'
import { Card, CardContent, Typography, Rating } from '@mui/material'

const API_KEY_GOOGLE_MAPS = 'AIzaSyA4OIsfj_s1qbXNYqr7ulXd_VtdvTQZako'

const ToyMarker = ({
    data,
    onHover,
    onUnhover,
    onAddressUpdate,
    onMarkerClick,
}) => {
    const [address, setAddress] = useState(null)
    const [showInfo, setShowInfo] = useState(false)

    useEffect(() => {
        // Fetch real address using reverse geocoding
        async function fetchAddress() {
            try {
                const response = await fetch(
                    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${data.lat},${data.lng}&key=${API_KEY_GOOGLE_MAPS}`
                )
                const result = await response.json()
                if (result.status === 'OK') {
                    setAddress(result.results[0].formatted_address)
                    onAddressUpdate(
                        data.id,
                        result.results[0].formatted_address
                    ) // Pass address to parent
                }
            } catch (error) {
                console.error('Error fetching address:', error)
            }
        }

        fetchAddress()
    }, [data.lat, data.lng, data.id, onAddressUpdate])

    const handleHover = () => {
        setShowInfo(true)
        onHover() // Propagate the hover event to the parent component if needed
    }

    const handleUnhover = () => {
        setShowInfo(false)
        onUnhover() // Propagate the unhover event to the parent component if needed
    }

    const handleClick = () => {
        onMarkerClick({ lat: data.lat, lng: data.lng })
    }

    return (
        <div
            style={{
                position: 'relative',
                fontSize: '2em',
                color: 'pink', // Make the marker color pink for a feminine touch
                cursor: 'pointer',
            }}
            onMouseEnter={handleHover}
            onMouseLeave={handleUnhover}
            onClick={handleClick}
        >
            <i className="fas fa-store-alt"></i>
            {showInfo && (
                <div
                    style={{
                        position: 'absolute',
                        top: '-60px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        whiteSpace: 'nowrap',
                        padding: '12px',
                        backgroundColor: 'rgba(255, 182, 193, 0.9)', // Light pink background
                        borderRadius: '8px',
                        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)', // Soft shadow
                        textAlign: 'center',
                    }}
                >
                    <Typography
                        variant="subtitle2"
                        style={{ color: 'black', fontWeight: 'bold' }}
                    >
                        {data.name}
                    </Typography>
                    {address && (
                        <Typography
                            variant="body2"
                            style={{ color: 'black', marginTop: '8px' }}
                        >
                            Address: {address}
                        </Typography>
                    )}
                    <Typography
                        variant="body2"
                        style={{ color: 'black', marginTop: '8px' }}
                    >
                        Star Reviews:
                    </Typography>
                    <Rating value={data.starReviews} readOnly />
                </div>
            )}
        </div>
    )
}

export function GoogleMap() {
    const [center, setCenter] = useState({ lat: 32.0853, lng: 34.7818 })
    const zoom = 14

    const [locations, setLocations] = useState([
        {
            id: 1,
            lat: 32.0853,
            lng: 34.7818,
            name: 'Amir Toys Store 1',
            starReviews: 4,
            address: null,
        },
        {
            id: 2,
            lat: 32.075,
            lng: 34.77,
            name: 'Amir Toys Store 2',
            starReviews: 5,
            address: null,
        },
        // Add more locations as needed
    ])

    function handleHover() {
        // Handle hover event if needed
    }

    function handleUnhover() {
        // Handle unhover event if needed
    }

    function handleListClick(marker) {
        setCenter({ lat: marker.lat, lng: marker.lng })
    }

    function handleAddressUpdate(id, updatedAddress) {
        setLocations((prevLocations) =>
            prevLocations.map((location) =>
                location.id === id
                    ? { ...location, address: updatedAddress }
                    : location
            )
        )
    }

    function handleMarkerClick(coords) {
        setCenter(coords)
    }

    return (
        <div>
            <div style={{ height: '50vh', width: '70%', float: 'left' }}>
                {/* Map */}
                <GoogleMapReact
                    bootstrapURLKeys={{
                        key: API_KEY_GOOGLE_MAPS,
                    }}
                    center={center}
                    defaultZoom={zoom}
                >
                    {/* Render markers */}
                    {locations.map((location) => (
                        <ToyMarker
                            key={location.id}
                            lat={location.lat}
                            lng={location.lng}
                            data={location}
                            onHover={handleHover}
                            onUnhover={handleUnhover}
                            onAddressUpdate={handleAddressUpdate}
                            onMarkerClick={handleMarkerClick}
                        />
                    ))}
                </GoogleMapReact>
            </div>
            <div style={{ width: '30%', float: 'right', padding: '20px' }}>
                {/* List of locations */}
                <Typography variant="h5" gutterBottom>
                    Toy Store Locations
                </Typography>
                {locations.map((location) => (
                    <Card
                        key={location.id}
                        style={{
                            marginBottom: '10px',
                            cursor: 'pointer',
                            transition: 'transform 0.3s', // Add transition effect
                        }}
                        onClick={() => handleListClick(location)}
                        onMouseEnter={() => handleHover()}
                        onMouseLeave={() => handleUnhover()}
                    >
                        <CardContent>
                            <Typography
                                variant="h6"
                                style={{ transition: 'color 0.3s' }}
                            >
                                {location.name}
                            </Typography>
                            {location.address && (
                                <Typography
                                    variant="body2"
                                    color="textSecondary"
                                >
                                    Address: {location.address}
                                </Typography>
                            )}
                            <Typography variant="body2" color="textSecondary">
                                Star Reviews: {location.starReviews}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
