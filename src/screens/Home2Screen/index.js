import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { Container, Form, Input, SubmitButton, Platforms } from './styles';

export default function Home2Screen() {
  const platforms = [['UPLAY', 'XBOX', 'PLAYSTATION']];
  const handleChangeText = () => {};
  return (
    <Container>
      <Form>
        <Input placeholder="Type a player nickname" />
      </Form>
      <SubmitButton>SEARCH</SubmitButton>
    </Container>
  );
}
