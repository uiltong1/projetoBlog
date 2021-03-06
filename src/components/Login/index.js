import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";
import "./login.css"

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
        }
        this.entrar = this.entrar.bind(this)
        this.login = this.login.bind(this)
    }
    componentDidMount() {
        //Verifica se o usuário está logado
        if (firebase.getCurrent()) {
            return this.props.history.replace('/dashboard')
        }
        // firebase.logout()
    }
    entrar(e) {
        this.login()
        e.preventDefault()
    }
    login = async () => {
        const { email, password } = this.state
        try {
            await firebase.login(email, password)
                .then(() => {
                    this.props.history.replace('/dashboard')
                })
                .catch((error) => {
                    if (error.code === 'auth/user-not-found') {
                        alert('Usuário não encontrado!')
                    } else {
                        alert("Código do erro: " + error.code)
                        return null
                    }
                })
        } catch (error) {
            alert(error.message)
        }
    }
    render() {
        return (
            <div>
                <form onSubmit={this.entrar} id="login">
                    <label>Email:</label>
                    <input type="email" autoComplete="off" autoFocus value={this.state.email}
                        onChange={(e) => this.setState({ email: e.target.value })} placeholder="exemplo@exemplo.com" />
                    <br />
                    <label>Senha</label>
                    <input type="password" autoComplete="off" value={this.state.password}
                        onChange={(e) => this.setState({ password: e.target.value })} placeholder="Informe a senha" />
                    <br />
                    <button type="submit">Entrar</button>
                    <br />
                    <Link to="/register">Ainda não possui uma conta?</Link>
                </form>
            </div>
        )
    }
}
export default withRouter(Login);