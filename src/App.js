import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Header from "./components/Header";
import TabelaLivros from "./components/TabelaLivros";
import TabelaHome from "./components/TabelaHome";
import CadastrarLivros from "./components/CadastrarLivros";
import Login from "./components/Login";
import NotFound from "./components/NotFound";
import SimpleStorage from "react-simple-storage";
import { auth } from './firebase/firebase'; 
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';


class App extends Component {
  state = {
    livros: [],
    isAuthenticated: false,
  };

  inserirLivro = (livro) => {
    livro.id = this.state.livros.length + 1;
    this.setState({
      livros: [...this.state.livros, livro],
    });
  };

  editarLivro = (livro) => {
    const index = this.state.livros.findIndex((p) => p.id === livro.id);
    const livros = this.state.livros
      .slice(0, index)
      .concat(this.state.livros.slice(index + 1));
    const newLivros = [...livros, livro].sort((a, b) => a.id - b.id);
    this.setState({
      livros: newLivros,
    });
  };

  removerLivro = (livro) => {
    if (window.confirm("Remover esse livro?")) {
      const livros = this.state.livros.filter((p) => p.isbn !== livro.isbn);
      this.setState({ livros });
    }
  };

  onLogin = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            this.setState({ isAuthenticated: true });
            console.log('User logged in:', userCredential.user);
        })
        .catch((error) => {
            console.error('Login error:', error);
        });
};

onLogout = () => {
    signOut(auth)
        .then(() => {
            this.setState({ isAuthenticated: false });
            console.log('User logged out');
        })
        .catch((error) => {
            console.error('Logout error:', error);
        });
};


  render() {
    return (
      <Router>
        <SimpleStorage parent={this} />
        <Header 
          isAuthenticated={this.state.isAuthenticated}
          onLogout={this.onLogout}
          />
        <Switch>
          <Route
            exact
            path="/"
            render={() =>
              ! this.state.isAuthenticated ? (
                <TabelaHome livros={this.state.livros} />
              ) : (
                <TabelaLivros
                  livros={this.state.livros}
                  removerLivro={this.removerLivro}
                />
              )
            }
          />
          <Route
            exact
            path="/cadastrar"
            render={() => (
              <CadastrarLivros
                inserirLivro={this.inserirLivro}
                livro={{ id: 0, isbn: "", titulo: "", autor: "" }}
              />
            )}
          />
          <Route exact path="/login" 
            render={() => 
              !this.state.isAuthenticated
              ? (<Login onLogin={this.onLogin} />)
              : (<Redirect to="/" />)
            }
            />
          <Route
            exact
            path="/editar/:isbnLivro"
            render={(props) => {
              const livro = this.state.livros.find(
                (livro) => livro.isbn === props.match.params.isbnLivro
              );
              if (livro) {
                return (
                  <CadastrarLivros
                    editarLivro={this.editarLivro}
                    livro={livro}
                  />
                );
              } else {
                return <Redirect to="/" />;
              }
            }}
          />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

export default App;
