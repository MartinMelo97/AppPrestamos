import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";
firebase.initializeApp(
    {
        apiKey: "AIzaSyDk6vp22tgyVqgJmPDB_vhxV1JaKw4fvqY",
        authDomain: "appprestamos-3d915.firebaseapp.com",
        databaseURL: "https://appprestamos-3d915.firebaseio.com",
        projectId: "appprestamos-3d915",
        storageBucket: "",
        messagingSenderId: "963326054228",
        appId: "1:963326054228:web:771d7d662322b1b66bc2c1"
    }
)
ReactDOM.render(
<BrowserRouter>
<App />
</BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
