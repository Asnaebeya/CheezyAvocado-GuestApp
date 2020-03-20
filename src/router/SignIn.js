import React from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";
import "./SignIn.css";

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
    const { input, label, meta, type } = props;
    const className = `field ${meta.error && meta.touched ? "error" : ""}`;

    return (
        <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete="off" type={type} />
            {renderError(meta)}
        </div>
    );
};

const SignIn = props => {
    const { handleSubmit } = props;

    const onSubmit = formProps => {
        console.log(formProps);
        // for sign in action
        props.signin(formProps, () => {
            props.history.push("/welcome");
        });
    };

    return (
        <form
            className="ui form form-template"
            onSubmit={handleSubmit(() => onSubmit())}
        >
            <Field
                name="roomNumber"
                type="number"
                component={renderInput}
                label="What's your room number?"
            />
            <Field
                name="lastName"
                type="text"
                component={renderInput}
                label="What's your lastname?"
            />
            <Field
                name="password"
                type="password"
                component={renderInput}
                label="What's your password?"
            />
            <button className="ui button primary">Enter</button>
            <div>{props.errorMessage}</div>
        </form>
    );
};

const validate = formValues => {
    const errors = {};
    if (formValues.roomNumber < 1) {
        errors.title = "You must enter a valid room number";
    }
    if (!formValues.roomNumber) {
        errors.title = "You must enter a room number";
    }
    if (!formValues.lastName) {
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
    connect(mapStateToProps, actions),
    reduxForm({ form: "signin", validate })
)(SignIn);
