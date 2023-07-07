import { memo, useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";

import { FilterContext } from "../App";

import SearchBar from "../Components/SearchBar";
import FiltersContainer from "../Components/FiltersContainer";
import Filter from "../Components/Filter.jsx";
import WorkOption from "../Components/WorkOption.jsx";

import './css/SearchPage.style.css';

function SearchPage() {
    const { filters } = useContext(FilterContext);

    const [filterOptions, setFilterOptions] = useState([]);

	const [works, setWorks] = useState([]);
    const [workOptions, setWorkOptions] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        setFilterOptions(Object.entries(filters).map(([, info]) => {
            return <Filter key={info.name} name={info.name} options={info.options} searchParams={searchParams} setSearchParams={value => {setSearchParams(value)}} search className="filtro-oportunidades">{}</Filter>;
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


    let work = {
        src: "https://img.freepik.com/free-vector/bird-colorful-logo-gradient-vector_343694-1365.jpg?q=10&h=200",
        name: "Ação voluntária",
        entity: "Ong 1234",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus sapien ligula, auctor eu nisl id, auctor fermentum tortor.",
        region: "São Carlos - SP",
        day: "12/07/2023"
    }

	return(
        


        <div className="container-att-voluntarias">
    

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
            className="busca-att-voluntarias">Buscar por atividade voluntárias</SearchBar>

            <div className="container-oportunidades">
                <div className="container-filtro-oportunidades">

                    <FiltersContainer searchParams={searchParams} setSearchParams={value => {setSearchParams(value)}}>
                        {filterOptions}
                        <Filter name="disponibilidade" options={["Recorrente", "Casual"]} searchParams={searchParams} setSearchParams={value => {setSearchParams(value)}} className="filtro-oportunidades">Disponibilidade</Filter>
                    </FiltersContainer> 
                
                    <div className="itens-oportunidades">
                        
                        <div className="lista-itens-oportunidades">
                            <h1 className="title-oportunidades">Oportunidades</h1>
                            <WorkOption className="work-option-search" work={work}/>
                            <WorkOption className="work-option-search" work={work}/>
                            <WorkOption className="work-option-search" work={work}/>
                            <WorkOption className="work-option-search" work={work}/>
                            <WorkOption className="work-option-search" work={work}/>
                            <WorkOption className="work-option-search" work={work}/>
                            <WorkOption className="work-option-search" work={work}/>
                            <WorkOption className="work-option-search" work={work}/>
                            <WorkOption className="work-option-search" work={work}/>
                            <WorkOption className="work-option-search" work={work}/>
                            <WorkOption className="work-option-search" work={work}/>
                            <WorkOption className="work-option-search" work={work}/>
                            <WorkOption className="work-option-search" work={work}/>
                            <WorkOption className="work-option-search" work={work}/>
                            <WorkOption className="work-option-search" work={work}/>
                            <WorkOption className="work-option-search" work={work}/>
                        </div>
                       
                    </div>

                </div>
                
            </div>
        </div>
    );
}

export default memo(SearchPage);