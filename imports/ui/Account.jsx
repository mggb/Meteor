import React from 'react';
import { FlowRouter } from 'meteor/kadira:flow-router';
import {withTracker} from 'meteor/react-meteor-data';
import Students from "../api/students";

class Account extends React.Component{
    state = {
        _id: this.props.student._id,
        firstName:this.props.student.firstName,
        lastName:this.props.student.lastName,
        github:this.props.student.github,
        isModified: false,
    }

    backToMenu = () => FlowRouter.go('/')

    handleFirstName = () =>{
        this.setState({firstName:event.target.value})
    }
    handleLastName = () =>{
        this.setState({lastName:event.target.value})
    }
    handleGithub = () =>{
        this.setState({github:event.target.value})
    }
    studentUpdate = () => {
        const {_id,firstName,lastName,github} = this.state;
        Students.update({_id},
            {
                $set: {
                    firstName,
                    lastName,
                    github
                }
            }
        )
        this.setState({isModified:true})
    }
    render(){
        return(
            <div>
                <p>Modifier:</p>
                <input type='text' placeholder='FirstName' onChange={this.handleFirstName} value={this.state.firstName} />
                <input type='text' placeholder='Last Name' onChange={this.handleLastName} value={this.state.lastName} />
                <input type='text' placeholder='github' onChange={this.handleGithub} value={this.state.github} />
                <button onClick={this.studentUpdate}>Modifier</button>
                {this.state.isModified && (
                    <p>Le compte a été modifié</p>
                )}
                <button onClick={this.backToMenu}>Retour</button>
            </div>
        )
    }
}
export default FormAccount = withTracker(() => {
    const _id = FlowRouter.getParam('_id');
    const student = Students.find(_id).fetch()[0];
    return {
        student
    };
})(Account);