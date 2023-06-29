import React, { memo, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import { UserContext } from "../App";

import "./UserMenu.style.css";

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
                    <>
                        <MenuItem onClick={() => {handleClose(); navigate(`/entities/${user.CNPJ}`)}}>Editar entidade</MenuItem>
                        <MenuItem onClick={() => {handleClose(); navigate(`/entities/${user.CNPJ}/createWork`)}}>Criar vaga</MenuItem>
                        <MenuItem onClick={() => {handleClose(); navigate(`/entities/${user.CNPJ}/works`)}}>Gerenciar vagas</MenuItem>
                        <MenuItem onClick={() => {handleClose(); handleLogout()}}>Sair</MenuItem>
                    </>
                :
                    <>
                        <MenuItem onClick={() => {handleClose(); navigate(`/Volunteers/${user.CPF}`)}}>Editar perfil</MenuItem>
                        <MenuItem>Meus trabalhos</MenuItem>
                        <MenuItem onClick={() => {handleClose(); handleLogout()}}>Sair</MenuItem>
                    </>
                }
            </Menu>
        </div>
    );
}

export default memo(UserMenu);