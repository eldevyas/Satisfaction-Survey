import React, { useRef, useContext } from 'react';
import Button from '@mui/material/Button';
// Icons
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import VisibilityOn from '@mui/icons-material/Visibility';

import { pushSuccess, pushFailure, pushWarning } from './../../services/alert';
import AuthContext from '/contexts/authContext';
import { Redirect } from 'react-router'

import Loading from '/components/utils/Loader.jsx';

export default class LoginComponent extends React.Component {
    static contextType = AuthContext;

    constructor(props) {
        super(props);
        this.emailRef = React.createRef(null);
        this.passwordRef = React.createRef(null);
        this.rememberMeRef = React.createRef(null);

        this.state = {
            showPassword: false,
        };

        this.credentials = {
            username: '',
            password: '',
            rememberMe: false
        }

        // Hide & show password icon
    }




    handleClickShowPassword = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    handleLogin = () => {
        const username = this.emailRef.current.value;
        const password = this.passwordRef.current.value;
        const isRememberMe = this.rememberMeRef.current.checked;

        const Context = this.context;

        if (username && password) {
            this.credentials.email = username;
            this.credentials.password = password;
            this.credentials.rememberMe = isRememberMe;

            Context.login(this.credentials);
        } else {
            if (!username && !password) {
                pushWarning("Veuillez entrer votre nom d'utilisateur et votre mot de passe.");
            }
            else if (!username) {
                pushWarning("Veuillez entrer votre nom d'utilisateur.");
                return;
            } else if (!password) {
                pushWarning("Veuillez entrer votre mot de passe.");
                return;
            }
        }
    }
    
    render() {

        return (
            <div className="Form">
                <form className="Form-group">
                    <div className="Input Username">
                        <div className="Input-icon">
                            <AccountCircleIcon />
                        </div>
                        <input ref={this.emailRef} type="username" className="form-control" placeholder="Nom d'utilisateur" required></input>
                    </div>
                    <div className="Input Password">
                        <div className="Input-icon">
                            <LockIcon />
                        </div>
                        <input ref={this.passwordRef} type={this.state.showPassword ? 'text' : 'password'} className="form-control" placeholder="Mot de passe" required></input>
                        <div className="Visibility" onClick={this.handleClickShowPassword}>
                            {this.state.showPassword ? <VisibilityOff title='Cacher'/> : <VisibilityOn title='Montrer'/>}
                        </div>
                    </div>
                </form>

                <div className="RememberMe">
                    <label className="cont">
                        <input type="checkbox" ref={this.rememberMeRef}/>
                        <span></span>
                    </label>

                    Se souvenir de moi
                </div>

                <Button
                    variant="primary"
                    className= "btnPrimary"
                    onClick={this.handleLogin}
                >
                    Se Connecter
                </Button>
            </div>
        )
    }
}