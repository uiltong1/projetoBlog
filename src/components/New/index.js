import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import firebase from "../../firebase";
import "./new.css";
class New extends Component {
    constructor(props) {
        super(props)
        this.state = {
            titulo: '',
            imagem: '',
            descricao: '',
            alerta: ''
        }
        this.cadastrar = this.cadastrar.bind(this)
    }
    cadastrar= async(e)=> {
        e.preventDefault()

        if (this.state.titulo !== '' && this.state.imagem !== '' && this.state.descricao !== '') {
            let posts = firebase.app.ref('posts')
            let chave = posts.push().key
            await posts.child(chave).set({
                titulo: this.state.titulo,
                image: this.state.imagem,
                descricao: this.state.descricao,
                autor: localStorage.nome
            })
            this.props.history.push('/')
        } else {
            this.setState({ alerta: 'Dados enviados inválido!' })
        }
    }
    render() {
        return (
            <div>
                <header id="new">
                    <Link to="/dashboard">Voltar</Link>
                </header>
                <form onSubmit={this.cadastrar} id="new-post">
                    <span>{this.state.alerta}</span>
                    <label>Titulo:</label>
                    <input type="text" placeholder="Nome do Post" value={this.state.titulo}
                        autoFocus onChange={(e) => { this.setState({ titulo: e.target.value }) }} />
                    <label>Url da imagem:</label>
                    <input type="text" placeholder="URL" value={this.state.imagem}
                        onChange={(e) => { this.setState({ imagem: e.target.value }) }} />
                    <label>Descrição:</label>
                    <textarea placeholder="Escreva o texto..." value={this.state.descricao}
                        onChange={(e) => { this.setState({ descricao: e.target.value }) }} />
                    <button type="submit">Enviar</button>
                </form>
            </div>
        )
    }
}
export default withRouter(New);
