import { ToyPreview } from "./ToyPreview.jsx";
import PropTypes from 'prop-types'

export function ToyList({ toys, onRemoveToy, onEditToy, addToCart, baba }) {

    return (
        <ul className="toy-list">
            {toys.map(toy =>
                <ToyPreview
                    key={toy._id}
                    toy={toy}
                    onRemoveToy={onRemoveToy}
                    onEditToy={onEditToy}
                    addToCart={addToCart}
                />
            )}
        </ul>
    )
}

ToyList.defaultProps = {
    baba: "BABABABAB"
}

ToyList.propTypes = {
    txt(props, propName, cmpName) {
        // console.log('props:', props)
        // console.log('propName:', propName)
        // console.log('cmpName:', cmpName)
        if (typeof props[propName] !== 'string') {
            return new Error('Not a string!')
        }
    },
    nums: PropTypes.arrayOf(PropTypes.number),
    baba: PropTypes.string.isRequired
}