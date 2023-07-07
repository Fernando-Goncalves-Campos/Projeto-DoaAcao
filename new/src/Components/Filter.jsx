import { memo, useEffect, useState } from "react";

import "./Filter.style.css";
import SearchBar from "./SearchBar";
import CheckBoxGroup from "./CheckBoxGroup";

function Filter({name, options, searchParams, setSearchParams, className="", style = {}, search = false, max = 4, children}) {
    const [searchOptions, setSearchOptions] = useState(options);
    const [filterGroup, setFilterGroup] = useState();

    //Altera as check box sempre que a query da página muda ou o texto de pesquisa muda
    useEffect(() => {
        //Quando o filtro é marcado
        const checkFunction = (e) => {
            searchParams.append(name, e.target.value.toLowerCase());
        }
        
        //Quando o filtro é desmarcado
        const unCheckFunction = (e) => {
            //Salva os parâmetros selecionados da categoria, que são diferentes do que será removido
            let newSelectedOptions = searchParams.getAll(name).filter(option => option !== e.target.value.toLowerCase());
                    
            //Remove todos os parâmetros da categoria
            searchParams.delete(name);

            //Retorna os parâmetros para a query
            newSelectedOptions.forEach(selectedOption => {
                searchParams.append(name, selectedOption);
            })
        }

        //Sempre que alguma check box é marcada
        const onChangeLastFunction = (e) => {
            setSearchParams(searchParams);
        }

        setFilterGroup(
            <CheckBoxGroup
                name={name}
                options={searchOptions.filter((searchOption, index) => index < max)}
                checkFunction={checkFunction}
                unCheckFunction={unCheckFunction}
                onChangeLastFunction={onChangeLastFunction}
                testChecked={(option) => searchParams.getAll(name).includes(option.toLowerCase())}
                className={`${className}`}
            />
        )
    }, [max, name, searchOptions, searchParams, setSearchParams])

    return(
        <div className={`filterClass ${className}`} style={style}>
            <h1>{children}</h1>
            {
                search
                    ? <SearchBar className={`${className}`} setValue={(value) => {setSearchOptions(options.filter(option => option.normalize('NFD').replace(/\p{Diacritic}/gu, '').toLowerCase().startsWith(value)))}} onChange/>
                    : ""
            }
            {filterGroup}
        </div>
    );
}

export default memo(Filter);