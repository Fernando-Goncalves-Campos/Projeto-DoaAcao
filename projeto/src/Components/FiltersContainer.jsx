import { memo, useState, useEffect  } from "react";

import "./FiltersContainer.style.css";

function FiltersContainer({searchParams, setSearchParams, className = '', style = {}, children}) {
    const [removeParamsBtns, setRemoveParamsBtns] = useState();
    const [selectedOptions, setSelectedOptions] = useState([]);
    
    useEffect(() => {
        let buffer = [];
        for(let entry of searchParams.entries()){
            buffer.push(entry);
        }
        setSelectedOptions(buffer);
    }, [searchParams])

    const removeAllParams = () => {
        setSelectedOptions([]);
        setSearchParams({});
    }

    const createRemoveBtns = () => {
        const removeParams = (param) => {
            searchParams.delete(param[0]);
            selectedOptions.forEach(selectedOption => {
                if(selectedOption[1] !== param[1] && selectedOption[0] === param[0]){
                    searchParams.append(selectedOption[0], selectedOption[1]);
                }
            })
            setSearchParams(searchParams);
        };


        let params = []
        for(let entry of searchParams.entries()){
            params.push(entry);
        }

        setRemoveParamsBtns(params.map(param => {
            return <span key={param} onClick={() => {removeParams(param)}}>{`${param[0]}: ${param[1]}  X`}<br /></span>
        }));
    };
    
    useEffect(createRemoveBtns, [searchParams, selectedOptions, setSearchParams]);
    return(
        <div>
            <h1>Filtros selecionados</h1>
            {removeParamsBtns}
            <span onClick={removeAllParams}>Limpar todos</span>
            {children}
        </div>
    );
}

export default memo(FiltersContainer);