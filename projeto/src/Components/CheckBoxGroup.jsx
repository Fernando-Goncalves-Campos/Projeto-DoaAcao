import { memo, useEffect, useState } from "react";

import "./CheckBoxGroup.style.css";
import CheckBox from "./CheckBox";

function CheckBoxGroup({name, options, onChangeFirstFunction=(e)=>{}, checkFunction, unCheckFunction, onChangeLastFunction=(e)=>{}, testChecked=(option)=>{return false}, className="", style = {}, max = 0}) {
    const [checkBoxes, setCheckBoxes] = useState([]);
    const [count, setCount] = useState(max);

    //Cria as checkbox
    useEffect(() => {
        //Lida com as modificações de cada checkbox
        const handleCheck = (e) => {
            //Antes de verificar se foi marcada
            onChangeFirstFunction(e);

            //Quando a check box é marcada
            if(e.target.checked){
                if(max){
                    if(count){
                        setCount(count - 1);
                        console.log(count);
                        checkFunction(e);
                    }
                    else{
                        e.target.checked = false;
                    }
                }
                else{
                    setCount(count - 1);
                    checkFunction(e);
                }
            }

            //Quando a check box é desmarcada
            else{
                setCount(count + 1);
                unCheckFunction(e);
            }

            //Depois de verificar se foi marcado
            onChangeLastFunction(e);
        }
        
        //Cria as check box
        setCheckBoxes(options.map(option => {
            let boolChecked = testChecked(option);
            return <CheckBox key={option} name={name} checked={boolChecked} onChange={handleCheck}>{option}</CheckBox>
        }))
    }, [options]);

    return(
        <div className={`checkBoxGroup ${className}`} style={style}>
            {checkBoxes}
        </div>
    );
}

export default memo(CheckBoxGroup);