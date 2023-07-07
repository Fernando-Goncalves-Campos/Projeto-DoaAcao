import { memo } from "react";

import Collapsible from "./Collapsible";
import CheckBoxGroup from "./CheckBoxGroup";

import "./ChoosePreferences.style.css";

//Container que colapsa com checkboxes
function ChoosePreferences({filter, preferences, setPreferences, className="", max=0, children}) {
    const checkPreferences = (e) => {
        let newPreferences = [...preferences, e.target.value.toLowerCase()];
        setPreferences(newPreferences);
    }

    const unCheckPreferences = (e) => {
        let newPreferences = preferences.filter(preference => preference.toLowerCase() !== e.target.value.toLowerCase());
        setPreferences(newPreferences);
    }

    const testCheckedPreferences = (preference) => {
        return preferences.includes(preference.toLowerCase());
    }

    return(
        <Collapsible buttonValue={children} className={`${className}`}>
            <CheckBoxGroup name={filter.name} options={filter.options} max={max} checkFunction={checkPreferences} unCheckFunction={unCheckPreferences} testChecked={testCheckedPreferences} startingCount={preferences.length}/>
        </Collapsible>
    );
}

export default memo(ChoosePreferences);