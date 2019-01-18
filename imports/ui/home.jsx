import React, {Component} from 'react';
import { Meteor } from 'meteor/meteor';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {withTracker} from 'meteor/react-meteor-data';
import Students from '../api/students.js';

import './home.css';


class Home extends Component {

    state = {
        firstName: '',
        lastName: '',
        github: '',
    }
    ;
    deleteData = (id) => () => Students.remove({_id: id});

    handleFistName = () => {
        this.setState({firstName: event.target.value})
        console.log(this.state.firstName);
    }
    handlelastName = () => {
        this.setState({lastName: event.target.value})
        console.log(this.state.lastName);
    }
    handlegithub = () => {
        this.setState({github: event.target.value});
        console.log(this.state.github);
    }
    submit = (e) => {
        e.preventDefault();
        const {firstName, lastName, github} = this.state;
        Students.insert({firstName, lastName, github});
    };
    getAccount = (_id) => () => FlowRouter.go(`/account/${_id}`);

    render() {
        return (
            <div>
                <div className={"inscription"}>
                    <form>
                        <h1>On va inscrire des gens :D</h1>
                        <input className={'nom'} onChange={this.handleFistName} type={'text'}/>
                        <label>Nom:</label>
                        <input className={'prenom'} type={'text'} onChange={this.handlelastName}/>
                        <label>Prénom:</label>
                        <input className={'lien'} type={'text'} onChange={this.handlegithub}/>
                        <label>GitHub:</label>
                        <button className={'btn'} type={'submit'} onClick={this.submit}>Submit</button>
                    </form>
                    {this.state.error === 1 ? <p>une erreur est survenue, veuillez recommencer</p> : ''}
                </div>
                <div className={"login"}>
                    <form>
                        <h1>On va logué des gens ahah</h1>
                        <input className={'nom'} onChange={this.handleFistName} type={'text'}/>
                        <label>Nom:</label>
                        <input className={'prenom'} type={'text'} onChange={this.handlelastName}/>
                        <label>Prénom:</label>
                        <input className={'lien'} type={'text'} onChange={this.handlegithub}/>
                        <label>GitHub:</label>
                        <button className={'btn'} type={'submit'} onClick={this.submit}>Submit</button>
                    </form>
                </div>

            </div>
        )
    }


}

export default FormContainer = withTracker(() => {
    return {
        students: Students.find().fetch(),
    };
})(Home);