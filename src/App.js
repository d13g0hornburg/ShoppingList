import React, { Component } from "react";

class ShoppingList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemNome: '',
      itemQuantidade: '',
      itens: []
    };
  }

  atualizarNomeItem = (event) => {
    this.setState({ itemNome: event.target.value });
  }

  atualizarQuantidadeItem = (event) => {
    this.setState({ itemQuantidade: event.target.value });
  }

  adicionarItem = () => {
    if (this.state.itemNome.trim() === '' || this.state.itemQuantidade.trim() === '') return;

    const novoItem = {
      nome: this.state.itemNome,
      quantidade: this.state.itemQuantidade,
      comprado: false
    };

    this.setState((prevState) => ({
      itens: [...prevState.itens, novoItem],
      itemNome: '',
      itemQuantidade: ''
    }));
  }

  removerItem = (index) => { 
    this.setState((prevState) => ({
      itens: prevState.itens.filter((_, i) => i !== index)
    }));
  }

  alternarComprado = (index) => {
    this.setState((prevState) => ({
      itens: prevState.itens.map((item, i) => 
        i === index ? { ...item, comprado: !item.comprado } : item
      )
    }));
  }

  render() {
    return (
      <div>
        <h1>Lista de Compras</h1>
        <input
          type="text"
          value={this.state.itemNome}
          placeholder="Nome do item"
          onChange={this.atualizarNomeItem}
        />
        <input
          type="number"
          value={this.state.itemQuantidade}
          placeholder="Quantidade"
          onChange={this.atualizarQuantidadeItem}
        />
        <button onClick={this.adicionarItem}>Adicionar item</button>
        <ul>
          {this.state.itens.length > 0 ? (
            this.state.itens.map((item, index) => (
              <li key={index} style={{ textDecoration: item.comprado ? 'line-through' : 'none' }}>
                <strong>{item.nome}</strong> ({item.quantidade}) 
                <button onClick={() => this.alternarComprado(index)}>
                  {item.comprado ? 'Desmarcar' : 'Marcar como comprado'}
                </button>
                <button onClick={() => this.removerItem(index)}>Remover</button> 
              </li>
            ))
          ) : (
            <li>Adicione itens à sua lista de compras</li>
          )}
        </ul>
      </div>
    );
  }
}

export default ShoppingList;