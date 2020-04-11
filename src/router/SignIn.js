import React, { useState, useEffect } from "react";
import { Field, reduxForm } from "redux-form";
import { compose } from "redux";
import { connect } from "react-redux";
import * as actions from "../actions";
import "./SignIn.css";
import Modal from "../components/Modal";
import { Message, Image, Header } from "semantic-ui-react";
import Loading from "../components/Loading";
import history from "../history";

const renderError = ({ error, touched }) => {
    if (error && touched) {
        return <Message size="mini" negative header={error} />;
    }
};

const renderInput = (props) => {
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

const SignIn = (props) => {
    const { handleSubmit } = props;

    useEffect(() => {
        let existingToken = window.localStorage.token;
        if (existingToken) {
            props.loginRefresh({
                accessToken: window.localStorage.token,
                roomNumber: window.localStorage.roomNumber,
                firstName: window.localStorage.firstName,
                lastName: window.localStorage.lastName,
                guestId: window.localStorage.guestId,
                reservationId: window.localStorage.reservationId,
            });
        }
    }, []);

    const onSubmit = (formProps) => {
        console.log(formProps);
        // setModal(true);

        // for sign in action
        props.signin(formProps, () => {
            console.log("succeess");
            history.push("/welcome");
        });

        // props.signin(formProps);
    };

    return (
        <Loading status={props.isLoading} text="Signing in...">
            <Modal
                HeaderIcon="x"
                modal={props.modalStatus}
                title="Login Failed"
                description="Your room number, lastname , or password do not match"
                colorButton="green"
                ButtonIconName="checkmark"
                TextOnButton="Cancel"
            />

            <form
                className="ui form form-template"
                onSubmit={handleSubmit(onSubmit)}
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
                            paddingRight: "1vw",
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
                    parse={(value) => parseInt(value, 10)}
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
                <div>{props.modalStatus ? props.errorMessage : ""}</div>
            </form>
        </Loading>
    );
};

const validate = (formValues) => {
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

const mapStateToProps = (state) => {
    return {
        errorMessage: state.auth.errorMessage,
        isLoading: state.loading.loadingStatus,
        modalStatus: state.modal.modalStatus,
        token: state.auth.accessToken,
    };
};

export default compose(
    connect(mapStateToProps, actions),
    reduxForm({ form: "signin", validate })
)(SignIn);
