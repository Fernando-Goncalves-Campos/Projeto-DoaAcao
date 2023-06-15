import { memo, useEffect, useState } from "react";

import "./Filter.style.css";
import SearchBar from "./SearchBar";
import CheckBox from "./CheckBox";

function Filter({name, options, searchParams, setSearchParams, className="", style = {}, search = false, children}) {
    const [searchOptions, setSearchOptions] = useState(options);
    const [filterOptions, setFilterOptions] = useState([]);

    useEffect(() => {
        const handleCheck = (e) => {
            if(e.target.checked){
                searchParams.append(name, e.target.value.toLowerCase());
            }
            else{
                
                
                let newSelectedOptions = searchParams.getAll(name).filter(option => option !== e.target.value.toLowerCase());
                searchParams.delete(name);

                newSelectedOptions.forEach(selectedOption => {
                    searchParams.append(name, selectedOption);
                })

            }
            setSearchParams(searchParams);
        }
        
        setFilterOptions(searchOptions.map(option => {
            let boolChecked = searchParams.getAll(name).includes(option.toLowerCase());
            return <CheckBox key={option} name={name} checked={boolChecked} onChange={handleCheck}>{option}</CheckBox>
        }))
    }, [searchOptions, name, options, searchParams, setSearchParams])

    return(
        <div className={`filterClass ${className}`} style={style}>
            <h1>{children}</h1>
            {
                search
                    ? <SearchBar setValue={(value) => {setSearchOptions(options.filter(option => option.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().startsWith(value)))}} onChange/>
                    : ""
            }
            {filterOptions}
        </div>
    );
}

export default memo(Filter);