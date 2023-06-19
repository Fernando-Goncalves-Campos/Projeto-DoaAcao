import { memo, useEffect, useState } from "react";

import "./Filter.style.css";
import SearchBar from "./SearchBar";
import CheckBox from "./CheckBox";

function Filter({name, options, searchParams, setSearchParams, className="", style = {}, search = false, children}) {
    const [searchOptions, setSearchOptions] = useState(options);
    const [filterOptions, setFilterOptions] = useState([]);

    //Altera as check box sempre que a query da página muda ou o texto de pesquisa muda
    useEffect(() => {
        //Função que lida com as interações com as check box
        const handleCheck = (e) => {
            //Quando a check box é marcada, adiciona o parâmetro na query
            if(e.target.checked){
                searchParams.append(name, e.target.value.toLowerCase());
            }

            //Quando a check box é desmarcada, remove o parâmetro da query
            else{
                //Salva os parâmetros selecionados da categoria, que são diferentes do que será removido
                let newSelectedOptions = searchParams.getAll(name).filter(option => option !== e.target.value.toLowerCase());
                
                //Remove todos os parâmetros da categoria
                searchParams.delete(name);

                //Retorna os parâmetros para a query
                newSelectedOptions.forEach(selectedOption => {
                    searchParams.append(name, selectedOption);
                })

            }
            setSearchParams(searchParams);
        }
        
        //Cria as check box
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