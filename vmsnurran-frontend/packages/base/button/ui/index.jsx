import './index.css';

export const Button = ({ text, type, onClick }) => {
    return (
        <button 
            onClick={ onClick } 
            className={`button button--${type}`}
        >
            { text }
        </button>
    )
}