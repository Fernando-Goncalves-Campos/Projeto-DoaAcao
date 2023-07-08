import React, { memo, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { UserContext } from "../App";

import "./UserMenu.style.css";

//Menu dos usuários
function UserMenu() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    
    const { user, entity, setLogged, setEntity, setUser } = useContext(UserContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        setLogged(false);
        setEntity(false);
        setUser({});
        navigate("/home")
    }
    
    return(
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <Avatar src={user.img} alt={user.name} />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                'aria-labelledby': 'basic-button',
                }}
            >
                {entity?
                    [
                        <MenuItem key="profile" onClick={() => {handleClose(); navigate(`/entities/${user.name}`)}}>Editar entidade</MenuItem>,
                        <MenuItem key="createWork" onClick={() => {handleClose(); navigate(`/entities/${user.name}/createWork`)}}>Criar vaga</MenuItem>,
                        <MenuItem key="works" onClick={() => {handleClose(); navigate(`/entities/${user.name}/works`)}}>Gerenciar vagas</MenuItem>,
                        <MenuItem key="logout" onClick={() => {handleClose(); handleLogout()}}>Sair</MenuItem>
                    ]
                :
                    [
                        <MenuItem key="profile" onClick={() => {handleClose(); navigate(`/Volunteers/${user.CPF}`)}}>Editar perfil</MenuItem>,
                        <MenuItem key="works">Meus trabalhos</MenuItem>,
                        <MenuItem key="logout" onClick={() => {handleClose(); handleLogout()}}>Sair</MenuItem>
                    ]
                    
                }
            </Menu>
        </div>
    );
}

export default memo(UserMenu);