import PropTypes from "prop-types";
import Button from "./Button";
import { useLocation, useNavigate } from "react-router-dom";

const Header = ({ title, onAdd, showAddButton }) => {

    const location = useLocation();
    const navigate = useNavigate();

    return (
        <header className="header">
            <h1>{title}</h1>
            {
                location.pathname === "/" ? (
                    <Button color={showAddButton ? 'brown' : 'green'} text={showAddButton ? "Close" : "Add Task"} onClick={onAdd} />
                ) : (
                    <Button color="orange" text="Go Back" onClick={() => navigate('/')} />
                )
            }
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