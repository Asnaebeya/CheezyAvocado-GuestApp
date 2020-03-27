import React from "react";
import { Modal, Header, Button, Icon } from "semantic-ui-react";

export default props => {
    let {
        HeaderIcon,
        setModal,
        modal,
        title,
        description,
        colorButton,
        ButtonIconName,
        TextOnButton
    } = props;
    return (
        <Modal open={modal} size="small" onClose={() => setModal(false)}>
            <Header icon={HeaderIcon} content={title} />
            <Modal.Content>
                <p>{description}</p>
            </Modal.Content>
            <Modal.Actions>
                <Button
                    color={colorButton}
                    inverted
                    onClick={() => setModal(false)}
                >
                    <Icon name={ButtonIconName} /> {TextOnButton}
                </Button>
            </Modal.Actions>
        </Modal>
    );
};
