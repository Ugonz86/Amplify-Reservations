import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  SelectField,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listReservations } from "./graphql/queries";
import { createReservation as createReservationMutation } from "./graphql/mutations";
import Auth from "@aws-amplify/auth";
import { Amplify, API } from "aws-amplify";
import awsmobile from "./aws-exports";
Amplify.configure(awsmobile);

const App = ({ signOut }) => {
  const [user, setUser] = useState(Auth.user.username);
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetchReservations();
    console.log(reservations);
  }, []);

  async function fetchReservations() {
    const apiData = await API.graphql({ query: listReservations });
    const reservationsFromAPI = apiData.data.listReservations.items;
    setReservations(reservationsFromAPI);
    console.log(reservations);
  }

  async function createReservation(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      date: form.get("date"),
      time: form.get("time"),
      party: form.get("party"),
    };
    await API.graphql({
      query: createReservationMutation,
      variables: { input: data },
    });
    fetchReservations();
    console.log(data);
    event.target.reset();
  }

  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <Text>Hello {user}!</Text>
      <View as="form" margin="3rem 0" onSubmit={createReservation}>
        <Flex direction="row" justifyContent="center">
          {/* <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          /> */}
          {/* <TextField
            name="date"
            placeholder="Date"
            label="Date"
            labelHidden
            variation="quiet"
            required
          /> */}
          <SelectField
            name="date"
            placeholder="Date"
            label="Date"
            labelHidden
            variation="quiet"
            required
            defaultValue="Thursday"
          >
            <option value="Thursday" defaultValue>Thursday</option>
            <option value="Friday">Friday</option>
            <option value="Saturday">Saturday</option>
            <option value="Sunday" disabled>
              Sunday
            </option>
          </SelectField>
          {/* <TextField
            name="time"
            placeholder="Time"
            label="Time"
            labelHidden
            variation="quiet"
            required
          /> */}
          <SelectField
            name="time"
            placeholder="Time"
            label="Time"
            labelHidden
            variation="quiet"
            required
            defaultValue="9:00 PM"
          >
            <option value="9:00 PM">9:00 PM</option>
            <option value="9:30 PM">9:30 PM</option>
            <option value="10:00 PM">10:00 PM</option>
            <option value="10:30 PM">10:30 PM</option>
            <option value="11:00 PM">11:00 PM</option>
            <option value="12:00 PM" disabled>
              12:00 PM
            </option>
          </SelectField>

          <SelectField
            name="party"
            placeholder="Party Of"
            label="Party Of"
            labelHidden
            variation="quiet"
            required
            defaultValue="2"
          >
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </SelectField>
          <Button type="submit" variation="primary">
            Create Reservation
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Reservations</Heading>
      <View margin="3rem 0">
        {reservations.map((reservation) => (
          <Flex
            key={reservation.id}
            direction="row"
            justifyContent="center"
            alignItems="center"
            color="black"
          >
            <Text as="strong" fontWeight={700}>
              {user}
            </Text>
            <Text>Your reservation details:</Text>
            <Text as="span">{reservation.date}</Text>
            <Text as="span">{reservation.time}</Text>
            <Text as="span">Party of {reservation.party}</Text>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);
