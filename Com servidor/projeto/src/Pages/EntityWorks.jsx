import { memo, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import WorkOptionEntity from "../Components/WorkOptionEntity.jsx";
import SearchBar from "../Components/SearchBar.jsx";

import "./css/EntityWorks.style.css";

function EntityWorks() {
    const [works, setWorks] = useState([]);
    const [ filteredWorks, setFilteredWorks ] = useState([]);
    const [workOptions, setWorkOptions] = useState([]);

    const { entityName } = useParams();

	useEffect(() => {
		async function getWorks() {
			const response = await fetch(`http://${process.env.REACT_APP_API_URL}/entities/${entityName}/works`);

			if (response.status !== 200) {
				const message = `An error occurred: ${response.statusText}`;
				alert(message);
				return;
			}

			const readWorks = await response.json();

			setWorks(readWorks);
            setFilteredWorks(readWorks);
		}

        getWorks();
	}, []);

    const filterWorks = (searchText) => {
        setFilteredWorks(works.filter(work => work.name.startsWith(searchText)));
    }

    const handleDelete = async (work) => {
        const response = await fetch(`http://${process.env.REACT_APP_API_URL}/entities/${entityName}/works/${work}`, {
            method: "DELETE"
        });

        if(response.status !== 200){
            const message = `An error occurred: ${response.statusText}`;
			alert(message);
			return;
        }

        setWorks(works.filter(curWork => curWork.name !== work));
    }

    useEffect(() => {
        setWorkOptions(filteredWorks? filteredWorks.map(work => {
            return <WorkOptionEntity work={work} deleteWork={() => {handleDelete(work)}}/>
        }) :<></>);
    }, [works, filteredWorks])

	return(
        <div className="entityWorksContainer">
            <div className="entityWorksWrap">
                <h1>Gerenciar vagas</h1>
                <div className="entityWorksMain">
                    <SearchBar setValue={value => {filterWorks(value)}} onChange >Busque vagas criadas</SearchBar>

                    {workOptions}
                </div>
            </div>
        </div>
    );
}

export default memo(EntityWorks);