import { memo, useState, useEffect  } from "react";

import "./FiltersContainer.style.css";

function FiltersContainer({searchParams, setSearchParams, className = '', style = {}, children}) {
    const [removeParamsBtns, setRemoveParamsBtns] = useState();
    const [selectedOptions, setSelectedOptions] = useState([]);
    
    //Lê os parâmetros da query
    useEffect(() => {
        let buffer = [];
        for(let entry of searchParams.entries()){
            buffer.push(entry);
        }
        setSelectedOptions(buffer);
    }, [searchParams])

    //Função de limpar os parâmetros
    const removeAllParams = () => {
        setSelectedOptions([]);
        setSearchParams({});
    }

    //Função que gera os "botões" para selecionar os parâmetros que se deseja remover
    const createRemoveBtns = () => {
        //Função que remove o parâmetro
        const removeParams = (param) => {
            searchParams.delete(param[0]);
            selectedOptions.forEach(selectedOption => {
                if(selectedOption[1] !== param[1] && selectedOption[0] === param[0]){
                    searchParams.append(selectedOption[0], selectedOption[1]);
                }
            })
            setSearchParams(searchParams);
        };

        //Lê os parâmetros
        let params = []
        for(let entry of searchParams.entries()){
            params.push(entry);
        }

        //Cria os "botões"
        setRemoveParamsBtns(params.sort().map(param => {
            return <span key={param} onClick={() => {removeParams(param)}}>{`${param[0]}: ${param[1]}  X`}<br /></span>
        }));
    };
    
    //Cria os "botões" quando query da página muda
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