import  React,  { Component } from 'react';
import TechItem from './TechItem';

class TechList extends Component {
  state = {
    newTech: '',
    techs: []
  };

  // Executando assim que o componente aparece em tela
  componentDidMount () {
    const techs = localStorage.getItem('techs');
    if (techs) {
      this.setState({techs: JSON.parse(techs)});
    }
  }

  // executado sempre que houver alterações nas props ou estado
  componentDidUpdate (prevProps, prevState, snapshot) {
    if (prevState.techs !== this.state.techs) {
      localStorage.setItem('techs', JSON.stringify(this.state.techs));
    }
  }

  // Executando quando o componente deixa de existir
  componentWillUnmount () { }

  hendleInputChange = e => {
    this.setState({ newTech: e.target.value });
  }

  hendleSubmit = e => {
    e.preventDefault();

    this.setState({
      techs: [...this.state.techs, this.state.newTech],
      newTech: ''
    });
  }

  hendleDelete = (tech) => {
    this.setState({
      techs: this.state.techs.filter(t => t !== tech)
    });
  }

  render() {
    return (
      <form onSubmit={this.hendleSubmit}>
        <ul>
          {this.state.techs.map(tech => (
            <TechItem
              key={tech}
              tech={tech}
              onDelete={() => this.hendleDelete(tech)}
            />
          ))}
        </ul>
        <input
          type="text"
          onChange={this.hendleInputChange}
          value={this.state.newTech}
        />
        <button type="submit">Enviar</button>
      </form>
    );
  }
}

export default TechList;
