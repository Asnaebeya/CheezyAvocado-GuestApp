import React, { useState } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";
import "./SignIn.css";
import Modal from "../components/Modal";
import { Message, Image, Header, Icon } from "semantic-ui-react";
import history from "../history";

const renderError = ({ error, touched }) => {
    if (error && touched) {
        return <Message size="mini" negative header={error} />;
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
    const [modal, setModal] = useState(false);

    const onSubmit = formProps => {
        console.log(formProps);
        // for error
        // setModal(true);

        //for prototype
        props.changeAuth("ronaldo");
        history.push("/welcome");

        // for sign in action
        // props.signin(formProps, () => {
        //     // props.history.push("/welcome");
        // });
    };

    return (
        <>
            <Modal
                HeaderIcon="x"
                modal={modal}
                setModal={setModal}
                title="Login Failed"
                description="Your room number, lastname , or password do not match"
                colorButton="green"
                ButtonIconName="checkmark"
                TextOnButton="Cancel"
            />

            <form
                className="ui form form-template"
                onSubmit={handleSubmit(() => onSubmit())}
                style={{ marginBottom: "3em" }}
            >
                <div>
                    <Header as="h1" textAlign="center">
                        Cheezy Avocado
                    </Header>
                    <Header
                        as="h3"
                        textAlign="center"
                        style={{
                            paddingRight: "1vw"
                        }}
                    >
                        Your Delivery Service
                    </Header>
                    <Image
                        src="/cheezyAvocado2.png"
                        size="medium"
                        style={{ width: "200px", height: "auto" }}
                        centered
                    />
                </div>
                <Field
                    name="roomNumber"
                    type="number"
                    component={renderInput}
                    label="What's your room number?"
                    parse={value => parseInt(value, 10)}
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
                <Header
                    as="h2"
                    icon
                    style={{
                        marginTop: "2vh",
                        marginLeft: "2vw",
                        marginRight: "2vw"
                    }}
                >
                    This is for Testing Only
                    <Header.Subheader>
                        Type in any room number, any last name, and any
                        password. Then press enter.
                    </Header.Subheader>
                </Header>
            </form>
        </>
    );
};
// test
const validate = formValues => {
    console.log(formValues);
    const errors = {};
    if (formValues.roomNumber < 1) {
        errors.roomNumber = "You must enter a valid room number";
    }
    if (!formValues.roomNumber) {
        errors.roomNumber = "You must enter a room number";
    }

    if (!formValues.lastName) {
        errors.lastName = "You must enter your lastname";
    }
    if (!formValues.password) {
        errors.password = "You must enter your password";
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
