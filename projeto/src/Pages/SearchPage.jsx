import { memo, useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import SearchBar from "../Components/SearchBar";
import FiltersContainer from "../Components/FiltersContainer";
import Filter from "../Components/Filter.jsx";
import WorkOption from "../Components/WorkOption.jsx";

function SearchPage() {
	const [works, setWorks] = useState([]);
    const [workOptions, setWorkOptions] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

	useEffect(() => {
		async function getWorks() {
			const response = await fetch(`http://${process.env.REACT_APP_API_URL}/works${document.location.search}`);

			if (response.status !== 200) {
				const message = `An error occurred: ${response.statusText}`;
				console.log(message);
				return;
			}

			const readWorks = await response.json();

			setWorks(readWorks);
		}

		getWorks();
	}, [setSearchParams]);

    
    useEffect(() => {
        setWorkOptions(works.map(work => {
            return <WorkOption work={work} />
        }))
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
                    <Filter name="causa" options={["Causa 1", "Causa 2", "Causa 3", "Causa 4", "Causa 5"]} searchParams={searchParams} setSearchParams={value => {setSearchParams(value)}} search>Causas</Filter>
                    <Filter name="habilidade" options={["Habilidade 1", "Habilidade 2", "Habilidade 3", "Habilidade 4", "Habilidade 5"]} searchParams={searchParams} setSearchParams={value => {setSearchParams(value)}} search>Habilidades</Filter>
                    <Filter name="localidade" options={["São Carlos", "Araraquara", "Ribeirão Preto", "Rio Claro"]} searchParams={searchParams} setSearchParams={value => {setSearchParams(value)}} search>Localidades</Filter>
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