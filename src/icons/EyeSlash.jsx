
import PropTypes from 'prop-types';

const EyeSlash = ({ onClick }) => (
    <button 
        type="button"
        className="w-2/12 absolute inset-y-0 right-5 px-3 flex flex-row items-center justify-end"

        onClick={onClick}
    >
        {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-5 w-5 text-gray-700"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
            />
        </svg> */}
            <img src="/See.png"  className="w-3/4" alt="Eye" />

    </button>
);

export default EyeSlash;

EyeSlash.propTypes = {
    onClick: PropTypes.func.isRequired,
};