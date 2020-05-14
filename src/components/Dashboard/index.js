import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";
import './dashboard.css';

class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            nome: localStorage.nome,
        }
        this.deslogar = this.deslogar.bind(this)
    }
    async componentDidMount() {
        if (!firebase.getCurrent()) {
            this.props.history.replace('/login')
            return null
        }
        firebase.getUserName((info) => {
            localStorage.nome = info.val().nome
            this.setState({ nome: localStorage.nome })
        })
    }
    deslogar = async () => {
        firebase.logout()
            .then(() => {
                this.props.history.replace('/login')
            })
            .catch((error) => {
                console.log(error)
            })
    }
    render() {
        return (
            <div id="dashboard">
                <div className="user-info">
                    <h1>Olá {this.state.nome},</h1>
                    <Link to="/dashboard/new">Novo Post</Link>
                </div>
                <p>Logado com: {firebase.getCurrent()}</p>
                <button onClick={() => this.deslogar()}>Sair</button>
            </div>
        )
    }
}
export default withRouter(Dashboard);