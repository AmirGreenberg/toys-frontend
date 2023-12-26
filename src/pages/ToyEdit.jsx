import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { toyService } from '../services/toy.service'
import { saveToy } from '../store/actions/toy.actions'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service'
const toyLabel = toyService.getLabels()

export function ToyEdit() {
    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())

    const { toyId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (!toyId) return
        toyService.getById(toyId).then((toy) => {
            setToyToEdit(toy)
        })
    }, [])

    function handleChange(ev) {
        const field = ev.target.name
        let value =
            ev.target.type === 'number' ? +ev.target.value : ev.target.value
        if (ev.target.type === 'select-multiple')
            value = Array.from(
                ev.target.selectedOptions,
                (option) => option.value
            )
        setToyToEdit((prevToy) => ({ ...prevToy, [field]: value }))
    }

    function onSave(ev) {
        ev.preventDefault()

        const newToy = {
            ...toyToEdit,
            inStock: toyToEdit.inStock === 'true' ? true : false,
        }

        console.log('🚀  newToy:', newToy)
        saveToy(newToy)
            .then(() => {
                showSuccessMsg('Toy saved successfully')
                navigate('/toy')
            })
            .catch((err) => {
                showErrorMsg('Can not save toy, please try again')
            })
    }

    function getYesNo() {
        return toyToEdit.inStock
    }

    if (!toyToEdit) return <div>Loading...</div>
    return (
        <form onSubmit={onSave} className="container edit-form" action="">
            <div>
                <label>
                    <span>Name</span>
                    <input
                        className="edit-input name-input"
                        value={toyToEdit.name}
                        onChange={handleChange}
                        type="text"
                        name="name"
                    />
                </label>
            </div>
            <div>
                <label>
                    <span>Price</span>
                    <input
                        className="edit-input price-input"
                        value={toyToEdit.price}
                        onChange={handleChange}
                        type="number"
                        name="price"
                    />
                </label>
            </div>
            <div>
                <select
                    multiple
                    value={toyToEdit.labels || []}
                    onChange={handleChange}
                    name="labels"
                    className="edit-input"
                >
                    <option value={'all'}>All</option>
                    <>
                        {toyLabel.map((label) => (
                            <option key={label} value={label}>
                                {label}
                            </option>
                        ))}
                    </>
                </select>
            </div>
            <div>
                <select
                    value={getYesNo() || '1'}
                    onChange={handleChange}
                    name="inStock"
                    className="edit-input"
                >
                    <option value={'1'} disabled>
                        In Stock
                    </option>
                    <option value="true">Yes</option>
                    <option value="false">No</option>
                </select>
            </div>
            <button onClick={onSave} className="save-toy-btn">
                Save
            </button>
        </form>
    )
}
