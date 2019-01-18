import React, { Component } from 'react';
import { withTracker } from 'meteor/react-meteor-data';
import Students from '../api/students';

class Info extends Component {
  state = {
    name: "",
    pw:""
  }

  handleName = () =>{
    const name = event.target.value;
    this.setState({
      name
    });
  }
  
  handlePw = () =>{
    const pw = event.target.value
    this.setState({
      pw
    });
  }

  addStudent = () => {
    const {name, pw} = this.state;
    Students.insert({ name, pw, createdAt: new Date() })
    this.setState({
      pw: "",
      name: ""
    });
  }

  removeStudent = (id) => () => Students.remove({_id: id})

  render() {
    const students = this.props.students.map(
      student => this.makeStudent(student)
    );

    return (
      <div>
        <input type="text" placeholder="name" onChange={this.handleName}/>
        <input type="password" placeholder="pw" onChange={this.handlePw}/>
        <button onClick={this.addStudent}>Ajouter un élève</button>
        <ul>{ students }</ul>
      </div>
    );
  }

  makeStudent(student) {
    return (
      <li key={student._id}>
        Nom:{student.name} |
        pw: {student.pw} |
        créer le: {student.date} |
        <button 
        style={{marginLeft:"30px",color: "red"}}
        onClick ={this.removeStudent(student._id)}>supprimer</button>
      </li>
    );
  }
}

export default InfoContainer = withTracker(() => {
  return {
    students: Students.find().fetch(),
  };
})(Info);
