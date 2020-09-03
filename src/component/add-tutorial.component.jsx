import React, {Component, Fragment} from 'react';
import TutorialDataService from '../services/tutorial.service';

class AddTutorial extends React.Component {
    constructor(props){
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChnageDescription = this.onChnageDescription.bind(this);
        this.saveTutorial = this.saveTutorial.bind(this);
        this.newTutorial = this.newTutorial.bind(this);

        this.state = {id: null, title: '', description: '', published: false, submitted: false};
    }
    onChangeTitle(event) {
        event.preventDefault();
        this.setState({title: event.target.value});
    }
    onChnageDescription(event) {
        event.preventDefault();
        this.setState({description: event.target.value});
    }
    saveTutorial() {
        var data = {
            title: this.state.title,
            description: this.state.description
        };
        TutorialDataService.create(data).then(response => {
            this.setState({
                id: response.data.id,
                title: response.data.title,
                description: response.data.description,
                published: response.data.published,

                submitted: true
            });
            console.log(response.data);
        }).catch(error => {console.log(error)});
    }
    newTutorial() {
        this.setState({
            id: null,
            title: '',
            description: '',
            published: false,
            submitted: false
        });
    }
    render() {
        return (
            <div className="submit-form">
                {this.state.submitted ? (
                    <React.Fragment>
                        <h4>You submitted successfully.</h4>
                        <button className="btn btn-primary" onClick={this.newTutorial}>Add</button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input type="text" class="form-control" name="title" id="title" required value={this.state.title} onChange={this.onChangeTitle}/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <input type="text" class="form-control" name="description" id="description" required value={this.state.description} onChange={this.onChnageDescription}/>
                        </div>
                        <button className="btn btn-success" onClick={this.saveTutorial}>Submit</button>
                    </React.Fragment>
                )}
            </div>
        )
    }
}

export default AddTutorial;