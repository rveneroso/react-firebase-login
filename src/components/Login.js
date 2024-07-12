import React, { Component } from 'react';
import "./login.css";
import { auth } from '../firebase/firebase'; // Adjust the path if necessary
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';

export default class Login extends Component {
    state = {
        email: "",
        password: "",
        error: ""
    };

    handleLogin = (e) => {
        e.preventDefault();
        const { email, password } = this.state;
        console.log('Attempting to sign in with', email, password, auth);
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in
                const user = userCredential.user;
                console.log('User successfully logged in:', user);
                this.setState({ error: "" }); // Clear any previous error
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('Login error:', errorCode, errorMessage);
                this.setState({ error: errorMessage });
            });
    };

    handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('Logged out');
            })
            .catch((error) => {
                console.error('Logout error:', error);
            });
    };

    render() {
        return (
            <div>
                <form className="container" name="login" onSubmit={this.handleLogin}>
                    <p>
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            onChange={(e) => this.setState({ email: e.target.value })}
                        />
                    </p>
                    <p>
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => this.setState({ password: e.target.value })}
                        />
                    </p>
                    <p>
                        <button
                            type="submit"
                            disabled={!this.state.email || !this.state.password }
                        >
                        Login
                        </button>
                    </p>
                    {this.state.error && <p>{this.state.error}</p>}
                </form>
                <button onClick={this.handleLogout}>Logout</button>
            </div>
        );
    }
}
