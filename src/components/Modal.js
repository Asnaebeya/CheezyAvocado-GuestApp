import React from "react";
import {
    Modal as ComponentModal,
    Header,
    Button,
    Icon,
} from "semantic-ui-react";
import { showModal } from "../actions";
import { connect } from "react-redux";

const Modal = (props) => {
    let {
        HeaderIcon,
        modal,
        title,
        description,
        colorButton,
        ButtonIconName,
        TextOnButton,
    } = props;
    return (
        <ComponentModal
            open={modal}
            size="small"
            onClose={() => props.showModal(false)}
        >
            <Header icon={HeaderIcon} content={title} />
            <ComponentModal.Content>
                <p>{description}</p>
            </ComponentModal.Content>
            <ComponentModal.Actions>
                <Button
                    color={colorButton}
                    inverted
                    onClick={() => props.showModal(false)}
                >
                    <Icon name={ButtonIconName} /> {TextOnButton}
                </Button>
            </ComponentModal.Actions>
        </ComponentModal>
    );
};

export default connect(null, { showModal })(Modal);
