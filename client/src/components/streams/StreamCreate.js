import React from 'react';
// reduxForm is a function while Field is a component
import {reduxForm, Field} from 'redux-form';
import { connect } from 'react-redux';
import { createStream } from '../../actions';

class StreamCreate extends React.Component{
    renderError (meta) {
        //This will only show the error message when the user clicks on the box and submits without
        // inputting anything
        if (meta.touched && meta.error) {
            return (
                <div className="ui error message">
                    <div className="header"> {meta.error}</div>
                </div>
            );
        }

    }
    renderInput = (formProps) => {
        console.log(formProps)
        //console.log(formProps.meta)
        return (
            // the meta field will contain the validation error message in case the user
            // submits without typing anything.
            // Note to render the output of the renderError function as a tag, we use the {} 
        <div className="field">
            <label> {formProps.label} </label>
            <input
                onChange={formProps.input.onChange}
                value={formProps.input.value}
                autoComplete="off"
            />
            {this.renderError(formProps.meta)}
        </div>
        );
    }
    onSubmit = formValues => {
        //call the action creator
        this.props.createStream(formValues);
    }

    // The Field component does not really know what we are doing with the Field. We need to return something
    // like in this case we are returning an input field from the renderInput function
    // The onSubmit works differently with redux form. Instead of defining a function and passing it
    // to the onSubmit handler, we need to pass our definition of onSubmit function to the handleSubmit callback
    // function which gets passed to the StreamCreate class as a prop along with other methods
    render () {
        return(
            //* the label and the name will be passed to the renderInput Function by redux Form automatically
            //* the semantic ui by default does not show the error messages on the dom. We need to 
            // use the classname "error" to make it display
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title"/>
                <Field name="description" component={this.renderInput} label="Enter Description"/>
            <button className="ui button primary">Submit</button>
            </form>
        )
    }
}

// This function will be called by the reduxform validate and it expects a return object with 
// the fields same as the ones defined in the Field component. 
// This validateFunction needs to be wired to Redux as is done below in the export default statement
// Note the validation is going to run everytime the component is rendered on the screen or the user
// interacts with the form. 
const validateFunction = formValues => {
    const errors = {}
    if(!formValues.title) {
        errors.title = "You must enter a Title"
    }
    if(!formValues.description) {
        errors.description = "You must enter a description"
    }
    return errors;
};
// reduxForm works like the connect function of redux and we will pass StreamCreate component to it
// the reduxForm function accepts some configuration like the 'form' object which can be named anything
// once we connect the StreamCreate component to the reduxForm function, the StreamCreate component
// will receive props from the reduxForm inside it

// We need to use the connect function for redux. Since reduxForm function declaration looks simmilar to connect func,
// it is better to write it this way than have everything in one line
const formWrapped = reduxForm({
form: 'mystream',
validate:validateFunction
}) (StreamCreate);

export default connect(null, {createStream})(formWrapped);