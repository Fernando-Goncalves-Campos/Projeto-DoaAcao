import { memo, useState } from "react";

import "./SearchBar.style.css";

import { FaSearch } from 'react-icons/fa';



//Barra de pesquisas
function SearchBar({setValue, defaultValue="", type="text", className="", style={}, onChange=false, children}) {
    const [bufferSearch, setBufferSearch] = useState('');

    const handleChange = (e) => {
        setBufferSearch(e.target.value.normalize('NFD').replace(/\p{Diacritic}/gu, ''));
        if(onChange){
            setValue(e.target.value.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase());
        }
    }

    const handleConfirm = () => {
        setValue(bufferSearch.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase());
    }

    const testEnterKey = (e) => {
        if(e.keyCode === 13){
            handleConfirm();
        }
    }

    
    return(
        <div className={`inputClass filterButtonClass ${className}`} style={style}>
            <input type={type} className={`searchField ${className}`} defaultValue={defaultValue} placeholder={children} onChange={handleChange} onKeyDown={testEnterKey}/>
            <button className="magnifyingGlass" onClick={handleConfirm}><FaSearch className="icone-pesquisa"/></button>
        </div>
    );
}

export default memo(SearchBar);