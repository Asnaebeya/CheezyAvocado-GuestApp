import React from "react";
import {
    Header,
    Segment,
    Container,
    Button,
    Grid,
    Image,
    Card,
    Icon,
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
    token: "",
    room: 3,
    FirstName: "Natthadech",
    LastName: "Bale",
};

const CardInformation = (props) => {
    let { firstName, lastName, roomNumber } = props;

    if (!props.firstName || !props.lastName || props.roomNumber) {
        //INITIAL_STATE.LastName
    }

    return (
        <Container style={{ marginTop: "2em" }}>
            <div>
                <Header as="h2" attached="top">
                    {`Hello, ${firstName}`}
                </Header>
                <Segment attached>
                    {`Name: ${firstName} ${lastName}`}
                    <br />
                    {`Room Number: ${roomNumber}`}
                </Segment>
            </div>
            <Button
                as={Link}
                style={{ marginTop: "1em", marginLeft: 180 }}
                floated="right"
                to="/bill"
            >
                View Bill Payment
            </Button>
            <br />

            <Grid columns={2} style={{ marginTop: "6em" }}>
                <Grid.Column>
                    <Card as={Link} to="/list/amenity">
                        <Image
                            src="https://image.flaticon.com/icons/svg/2558/2558012.svg"
                            wrapped
                            ui={false}
                        />
                        <Card.Content>
                            <Card.Header style={{ textAlign: "center" }}>
                                Amenities
                            </Card.Header>
                        </Card.Content>
                    </Card>
                </Grid.Column>

                <Grid.Column>
                    <Card as={Link} to="/list/food">
                        <Image
                            src="https://image.flaticon.com/icons/svg/706/706164.svg"
                            wrapped
                            ui={false}
                        />
                        <Card.Content>
                            <Card.Header style={{ textAlign: "center" }}>
                                Food
                            </Card.Header>
                        </Card.Content>
                    </Card>
                </Grid.Column>
            </Grid>
        </Container>
    );
};

export default CardInformation;
