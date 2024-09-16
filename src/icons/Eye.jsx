import PropTypes from 'prop-types';

const Eye = ({ onClick }) => (
    <button
        type="button"
        className="w-2/12 absolute inset-y-0 right-5 px-3 flex flex-row items-center justify-end"
        onClick={onClick}
    >
        <img src="/noSee.jpg" className="w-3/4" alt="EyeSlash" />
    </button>
);
export default Eye;

Eye.propTypes = {
    onClick: PropTypes.func.isRequired,
};