import { memo, useEffect, useState } from "react";

import "./Filter.style.css";
import SearchBar from "./SearchBar";

function Filter({name, options, searchParams, setSearchParams, className="", style = {}, search = false, children}) {
    const [searchOptions, setSearchOptions] = useState(options);
    const [filterOptions, setFilterOptions] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState(searchParams.getAll(name));

    useEffect(() => {
        const handleCheck = (e) => {
            if(e.target.checked){
                setSelectedOptions(prevSelected => [...prevSelected, e.target.value.toLowerCase()])
                searchParams.append(name, e.target.value.toLowerCase());
            }
            else{
                searchParams.delete(name);
                
                let newSelectedOptions = selectedOptions.filter(option => option !== e.target.value.toLowerCase())
                setSelectedOptions(newSelectedOptions);

                newSelectedOptions.forEach(selectedOption => {
                    searchParams.append(name, selectedOption);
                })

            }
            setSearchParams(searchParams);
        }
        
        setFilterOptions(searchOptions.map(option => {
            let boolChecked = searchParams.getAll(name).includes(option.toLowerCase());
            return(
                <div key={option}>
                    <input  type="checkbox" name={name} value={option} checked={boolChecked} onChange={handleCheck}/>
                    {option}
                </div>
            )
        }))
    }, [searchOptions, name, options, selectedOptions, searchParams, setSearchParams])

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