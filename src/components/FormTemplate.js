import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import history from "../history";
import { signin } from "../actions";

const renderError = ({ error, touched }) => {
    if (error && touched) {
        return (
            <div className="ui error message">
                <div className="header">{error}</div>
            </div>
        );
    }
};

const renderInput = props => {
    const { input, label, meta } = props;
    const className = `field ${meta.error && meta.touched}?'error':''`;

    return (
        <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete="off" type="text" />
            {renderError(meta)}
        </div>
    );
};

const SignIn = props => {
    const { handleSubmit } = props;

    const onSubmit = formProps => {
        console.log(formProps);
        // props.signin(formProps, () => {
        //     history.push("/welcome");
        // });
    };

    return (
        <form className="ui form" onSubmit={handleSubmit(onSubmit)}>
            <Field
                component={renderInput}
                label="What's your room number?"
                name="room"
            />
            <Field
                component={renderInput}
                label="What's your lastname?"
                name="name"
            />
            <Field
                component={renderInput}
                label="What's your password?"
                name="password"
            />
            <button className="ui button primary">Enter</button>
            <div>{props.errorMessage}</div>
        </form>
    );
};

const validate = formValues => {
    const errors = {};
    if (!formValues.room) {
        errors.title = "You must enter a room number";
    }
    if (!formValues.name) {
        errors.title = "You must enter your lastname";
    }
    if (!formValues.password) {
        errors.title = "You must enter your password";
    }
    return errors;
};

const mapStateToProps = state => {
    return { errorMessage: state.auth.errorMessage };
};

export default compose(
    connect(mapStateToProps, { signin }),
    reduxForm({ form: "signin" })
)(SignIn);
