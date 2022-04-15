// want to return an actual HTML button
// we take in the value, calculate its style
// from lec 11 code
import '../../App.css'

const Button = ({ value, update, isOperator }) => {
    const style = !isOperator ? {backgroundColor: 'lightgray', color: 'black'} : {backgroundColor: 'orange', color: 'white'}
    return <button
        style={{...style, fontSize: '2em'}} // ... is special syntax to use the style dict defined above
        onClick={() => update(value)} //update is a function we pass in
    >
        {value}
    </button>
}

export default Button;