import React, {Component} from "react";
import {Link, withRouter} from "react-router-dom";
import firebase from "../../firebase";

class Dashboard extends Component{
    constructor(props){
        super(props)
        this.state={
            nome:'',
        }
        this.deslogar = this.deslogar.bind(this)
    }
    componentDidMount(){

    }
    deslogar(){
        firebase.logout()
        .then(()=>{
            this.props.history.replace('/login')
        })
    }
    render(){
        return(
            <div id="dashboard">
                <div className="user-info">
                    <h1>Olá {this.state.nome},</h1>
                    <Link to="/dashboard/new">Novo Post</Link>
                    <button onClick={()=> this.deslogar()}>Sair</button>
                </div>
            </div>
        )
    }
}
export default withRouter(Dashboard);