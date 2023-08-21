import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function BasicButtonExample() {
    return (
        <button id="dropdown-Secondary-button" title="挑選種類">
            <li href="#/action-1">肩包</li>
            <li href="#/action-2">手提包</li>
            <li href="#/action-3">手拿包</li>
            <li href="#/action-4">其他</li>
        </button>
    );
}

export default BasicButtonExample;