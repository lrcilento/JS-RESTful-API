import React from 'react';

export default class App extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    fetch(`http://127.0.0.1:4000/books/`)
      .then((response) => response.json())
      .then((data) => this.setState({books: data})
      );
  }

  render() {
    return (
      <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="/">alestore</a>
        </div>
        <div>
          <a href="/">Carrinho</a>
          <a href="/">Entrar</a>
        </div>
      </header>
      <main>
        <div>
          <div className="row center">
            {
              this.state.books.map(product => (
              <div key={product.id} className="card">
              <div className="card-body">
              <a href={`/product/${product.id}`}>
                  <h1>{product.data.title}</h1>
                  <p>{product.data.author} ({product.data.year})</p>
                </a>
                <div className="rating">
                  <span> <i className="fa fa-star"></i> </span>
                  <span> <i className="fa fa-star"></i> </span>
                  <span> <i className="fa fa-star"></i> </span>
                  <span> <i className="fa fa-star"></i> </span>
                  <span> <i className="fa fa-star"></i> </span>
                </div>
                <div className="price">${product.data.price}</div>
                <div>
                  <button action=''>Comprar</button>
                </div>
              </div>
            </div>
              ))
            }
          </div>
        </div>
      </main>
      <footer className="row center">Todos os direitos reservados.</footer>
    </div>
    );
  }
}
