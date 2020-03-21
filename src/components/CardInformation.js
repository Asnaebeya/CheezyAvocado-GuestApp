import React from "react";
import {
    Header,
    Segment,
    Container,
    Button,
    Grid,
    Image,
    Card,
    Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

const INITIAL_STATE = {
    token: "",
    room: 3,
    FirstName: "Ronaldo",
    LastName: "Messi"
};

const CardInformation = () => {
    return (
        <Container>
            <div>
                <Header as="h2" attached="top">
                    {`Hello, ${INITIAL_STATE.LastName}`}
                </Header>
                <Segment attached>
                    {`Name: ${INITIAL_STATE.FirstName} ${INITIAL_STATE.LastName}`}
                    <br />
                    {`Room Number: ${INITIAL_STATE.room}`}
                </Segment>
            </div>
            <Button
                style={{ marginTop: "1em", marginLeft: 180 }}
                floated="right"
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
