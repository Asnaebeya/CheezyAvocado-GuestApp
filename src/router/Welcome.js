import React from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
import requireAuth from "./HOC/requireAuth";
import CardInformation from "../components/CardInformation";
const Welcome = () => {
    return (
        <div>
            <CardInformation />
        </div>
    );
};

export default requireAuth(Welcome);
