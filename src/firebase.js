import app from "firebase/app";
import "firebase/database";
import "firebase/auth";

let config = {
    apiKey: "AIzaSyDDIGq3M8OtMiEKVIAU8y_xe5y7o9vKRHI",
    authDomain: "reactapp-464b5.firebaseapp.com",
    databaseURL: "https://reactapp-464b5.firebaseio.com",
    projectId: "reactapp-464b5",
    storageBucket: "reactapp-464b5.appspot.com",
    messagingSenderId: "199979224574",
    appId: "1:199979224574:web:eea106197216ee8071c4af",
    measurementId: "G-R2PTDYRVWW"
}
class Firebase {
    constructor() {
        app.initializeApp(config)

        this.app = app.database()
    }

    login(email, password) {
        return app.auth().signInWithEmailAndPassword(email, password)
    }
    async register(nome, email, password) {
        //Cadastra o email e senha do usuario
        await app.auth().createUserWithEmailAndPassword(email, password)
        //Pega o uid do usuario de auth
        const uid = app.auth().currentUser.uid
        //Registra o nome do usuario colocando o mesmo uid do login de acesso
        return app.database().ref('usuarios').child(uid).set({
            nome: nome,
        })
    }
    logout() {
        return app.auth().signOut()
    }
    isIniatialized() {
        return new Promise(resolve => {
            app.auth().onAuthStateChanged(resolve)
        })
    }
    getCurrent() {
        return app.auth().currentUser && app.auth().currentUser.email
    }
    async getUserName(callback){
        if(! app.auth().currentUser){
            return null
        }
        const uid = app.auth().currentUser.uid
        await app.database().ref('usuarios').child(uid)
        .once('value').then(callback)
    }
}
export default new Firebase;