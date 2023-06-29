import { memo, useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import { FilterContext } from "../App";

import SearchBar from "../Components/SearchBar";
import FiltersContainer from "../Components/FiltersContainer";
import Filter from "../Components/Filter.jsx";
import WorkOption from "../Components/WorkOption.jsx";

function SearchPage() {
    const { filters } = useContext(FilterContext);

    const [filterOptions, setFilterOptions] = useState([]);

	const [works, setWorks] = useState([]);
    const [workOptions, setWorkOptions] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setFilterOptions(Object.entries(filters).map(([, info]) => {
            return <Filter key="search" name={info.name} options={info.options} searchParams={searchParams} setSearchParams={value => {setSearchParams(value)}} search>{}</Filter>;
        }))
    }, [filters, searchParams, setSearchParams]);

	useEffect(() => {
		async function getWorks() {
			//const response = await fetch(`http://${process.env.REACT_APP_API_URL}/works${document.location.search}`);

			//if (response.status !== 200) {
			//	const message = `An error occurred: ${response.statusText}`;
			//	alert(message);
			//	return;
			//}

			//const readWorks = await response.json();

			//setWorks(readWorks);
            setWorks([]);
		}

		getWorks();
	}, [setSearchParams]);
    
    useEffect(() => {
        setWorkOptions(works? works.map(work => {
            return <WorkOption work={work} />
        }) :<></>)
    }, [works])

	return(
        <div>
            <SearchBar 
                setValue={value => {
                    if(value){
                        searchParams.set("search", value);
                    }
                    else{
                        searchParams.delete("search");
                    }
                    setSearchParams(searchParams);
                }}
            >Buscar por atividade voluntárias</SearchBar>

            <div>
                <FiltersContainer searchParams={searchParams} setSearchParams={value => {setSearchParams(value)}}>
                    {filterOptions}
                    <Filter name="disponibilidade" options={["Recorrente", "Casual"]} searchParams={searchParams} setSearchParams={value => {setSearchParams(value)}}>Disponibilidade</Filter>
                </FiltersContainer> 

                <div>
                    <h1>Oportunidades</h1>
                    {workOptions}
                </div>
            </div>
        </div>
    );
}

export default memo(SearchPage);