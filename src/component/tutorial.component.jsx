import React, {Component, Fragment} from 'react';
import TutorialDataService from '../services/tutorial.service';

class Tutorial extends React.Component {
    constructor(props) {
        super(props);
        this.onChangeTitle = this.onChangeTitle.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.getTutorial = this.getTutorial.bind(this);
        this.updateTutorial = this.updateTutorial.bind(this);
        this.deleteTutorial = this.deleteTutorial.bind(this);

        this.state = {currentTutorial: {id:null, title: '', description: '', published: false}, message: ''};
    }
    componentDidMount () {
        this.getTutorial(this.props.match.params.id);
    }
    getTutorial(id) {
        TutorialDataService.get(id).then(response => {
            this.setState({currentTutorial: response.data});
            console.log(response.data);
        }).catch(error => {console.log(error)});
    }
    updatePublished(status) {
        var data = {
            id: this.state.currentTutorial.id,
            title: this.state.currentTutorial.title,
            description: this.state.currentTutorial.description,
            published: status
        };
        TutorialDataService.update(this.state.currentTutorial.id, data).then(response => {
            this.setState({currentTutorial: response.data, published: status});
            console.log(response.data);
        }).catch(error => console.log(error));
    }
    updateTutorial() {
        TutorialDataService.update(
            this.state.currentTutorial.id,
            this.state.currentTutorial
        ).then(response => {
            this.setState.message = "This tutorial was updated successfully.";
        }).catch(error => {console.log(error)});
    }
    deleteTutorial(id) {
        TutorialDataService.delete(this.state.currentTutorial.id).then(response => {
            console.log(response.data);
            this.props.history.push('/tutorials');
        }).catch(error => {console.log(error)});
    }
    onChangeTitle(event) {
        event.preventDefault();
        const title = event.target.title;
        this.setState(function (prevState) {
            return {
                currentTutorial: {
                    ...prevState.currentTutorial,
                    title: title
                }
            }
        });
    }
    onChangeDescription(event) {
        event.preventDefault();
        const description = event.target.description;
        this.setState(prevState => ({
            currentTutorial: {
                ...prevState.currentTutorial,
                description: description
            }
        }));
    }

    render() {
        const {currentTutorial} = this.state;
        return (
           <React.Fragment>
               {currentTutorial ? (
                   <div className="edit-form">
                       <h4>Tutorial</h4>
                        <form>
                            <div className="form-group">
                                <label htmlFor="">Title</label>
                                <input type="text" name="title" id="title" className="form-control" value={currentTutorial.title} onChange={this.onChangeTitle}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Description</label>
                                <input type="text" name="description" id="description" className="form-control" value={currentTutorial.description} onChange={this.onChangeDescription}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="">Status</label>
                                {currentTutorial.published ? " Published" : " Pending.."}
                            </div>
                        </form>
                        <React.Fragment>
                            {currentTutorial.published ? (
                                <button className="btn btn-sm btn-primary" onClick={() => this.updatePublished(false)}>UnPublish</button>
                            ) : (
                                <button className="btn btn-sm btn-primary" onClick={() => this.updatePublished(true)}>Publish</button>
                            )} 
                            &nbsp;&nbsp;&nbsp;
                            <button className="btn btn-sm btn-danger" onClick={this.deleteTutorial}>Delete</button>
                            &nbsp;&nbsp;&nbsp;
                            <button type="submit" className="btn btn-sm btn-success" onClick={this.updateTutorial}>Update</button>
                            <p>{this.state.message}</p>
                        </React.Fragment>
                    </div>
               ) : (
                <React.Fragment>
                    <br/>
                    <p>Please click on a tutorial...</p>
                </React.Fragment>
               )}
           </React.Fragment>
        );
    }
}

export default Tutorial;