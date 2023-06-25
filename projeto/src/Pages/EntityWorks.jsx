import { memo, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import WorkOptionEntity from "../Components/WorkOptionEntity.jsx";
import SearchBar from "../Components/SearchBar.jsx";

function EntityWorks() {
    const [works, setWorks] = useState([]);
    const [workOptions, setWorkOptions] = useState([]);

    const [searchParams, setSearchParams] = useSearchParams();

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
            setWorks([
                {
                    name: "nome",
                    img: "",
                    address: "Address",
                    frequency: "Pontual",
                    volunteers: [
                        {
                            name: "Fernando",
                            email: "Fernando@Fernando.com",
                            phone: "Fernando"
                        },
                        {
                            name: "Eduardo",
                            email: "Eduardo@Eduardo.com",
                            phone: "Eduardo"
                        }
                    ]
                }
            ]);
		}

		getWorks();
	}, [setSearchParams]);

    const handleDelete = (work) => {
        /*const response = await fetch(`http://${process.env.REACT_APP_API_URL}/entities/${entityCNPJ}/works/${work}`, {
            method: "DELETE"
        });

        if(response.status !== 200){
            const message = `An error occurred: ${response.statusText}`;
			alert(message);
			return;
        }

        setWorks(works.filter(curWork => curWork.name !== work));
        */
    }

    useEffect(() => {
        setWorkOptions(works? works.map(work => {
            return <WorkOptionEntity work={work} deleteWork={() => {handleDelete(work)}}/>
        }) :<></>);
    }, [works])

	return(
        <div>
            <h1>Gerenciar vagas</h1>
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
                >Busque vagas criadas</SearchBar>

                {workOptions}
            </div>
        </div>
    );
}

export default memo(EntityWorks);