import PropTypes from "prop-types";
import Button from "./Button";

const Header = ({ title }) => {

    const onClick = () => {
        alert('Click');
    }

    return (
        <header className="header">
            <h1>{title}</h1>
            <Button color="green" text="Add Task" onClick={onClick} />
        </header>
    )
}

Header.defaultProps = {
    title: 'Mero Task Tracker'
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header