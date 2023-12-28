import { ToyPreview } from './ToyPreview.jsx'
import PropTypes from 'prop-types'

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart }) {
    return (
        <div>
            <ul className="toy-list">
                {toys.map((toy) => (
                    <ToyPreview
                        key={toy._id}
                        toy={toy}
                        onRemoveToy={onRemoveToy}
                        onEditToy={onEditToy}
                        addToCart={addToCart}
                    />
                ))}
            </ul>
        </div>
    )
}

ToyList.propTypes = {
    txt(props, propName, cmpName) {
        if (typeof props[propName] !== 'string') {
            return new Error('Not a string!')
        }
    },
    nums: PropTypes.arrayOf(PropTypes.number),
}
