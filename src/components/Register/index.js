import React, { Component } from "react";
import firebase from "../../firebase";
import { Link, withRouter } from "react-router-dom";
import "./register.css";

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nome: '',
            email: '',
            password: '',
        }
        this.register = this.register.bind(this)
        this.onRegister = this.onRegister.bind(this)
    }
    register(e) {
        this.onRegister()
        e.preventDefault()
    }
    onRegister = async () => {
        const { nome, email, password } = this.state
        try {
            await firebase.register(nome, email, password)
                .then(() => {
                    this.props.history.replace("dashboard")
                })
                .catch((error) => {
                    alert("Código do error: " + error.code)
                })

        } catch (error) {
            alert(error.message)
        }

    }
    render() {
        return (
            <div>
                <h1 className="register-h1">Novo Usuário</h1>
                <form onSubmit={this.register} id="register">
                    <label>Nome: </label>
                    <input type="text" value={this.state.nome} autoComplete="off" autoFocus
                        onChange={(e) => this.setState({ nome: e.target.value })} placeholder="Informe o nome" />

                    <label>Email:</label>
                    <input type="email" value={this.state.email} autoComplete="off"
                        onChange={(e) => this.setState({ email: e.target.value })} placeholder="exemplo@exemplo.com" />

                    <label>Senha:</label>
                    <input type="password" value={this.state.password} autoComplete="off"
                        onChange={(e) => this.setState({ password: e.target.value })} placeholder="Nova senha" />

                    <button type="submit">Registrar</button>
                </form>
            </div>
        )
    }
}
export default withRouter(Register);