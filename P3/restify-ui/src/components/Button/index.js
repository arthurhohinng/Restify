// want to return an actual HTML button
// we take in the value, calculate its style
// from lec 11 code
import '../../App.css'

const Button = ({ value, update }) => {
    return <button
        onClick={() => update(value)} //update is a function we pass in
    >
        {value}
    </button>
}

export default Button;