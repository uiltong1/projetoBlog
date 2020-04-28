import React, { Component } from "react";
import firebase from "../../firebase"
import "./home.css"
class Home extends Component {

    state = {
        posts: [],
    }

    componentDidMount() {
        firebase.app.ref('posts').once('value', snapshot => {
            let state = this.state
            state.posts = []

            snapshot.forEach((item) => {
                state.posts.push({
                    key: item.key,
                    titulo: item.val().titulo,
                    descricao: item.val().descricao,
                    autor: item.val().autor,
                    image: item.val().image
                })
            })
            this.setState(state)
            console.log(this.state.posts)
        })
    }

    render() {
        return (
            <section id="post">
                {this.state.posts.map((post) => {
                    return (
                        <article key={post.key}>
                            <header>
                                <div className="title">
                                    <strong>{post.titulo}</strong>
                                    <span>Autor: {post.autor}</span>
                                </div>
                            </header>
                            <img src={post.image} alt={post.titulo}/>
                            <footer>
                                <p>{post.descricao}</p>
                            </footer>
                        </article>
                    )
                })}
            </section>
        )
    }
}
export default Home;