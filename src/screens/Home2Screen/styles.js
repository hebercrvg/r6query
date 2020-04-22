import styled from 'styled-components/native';
import {} from 'galio-framework';
import { Button } from 'react-native-paper';
import Colors from '../../constants/Colors';

// export const Input = styled(TextInput).attrs({
//   placeholder: 'Type a nickname',
//   mode: 'outlined',
// })`
//   border-radius: 4px;
//   height: 60px;
//   width: 100%;
//   background-color: ${Colors.white};
// `;

export const Container = styled.View`
  flex: 1;
  padding: 20px;
  background-color: ${Colors.white};
`;

export const Form = styled.View`
  flex-direction: column;
  padding-bottom: 20px;
  border-bottom-width: 1px;
  border-color: ${Colors.grayLight};
`;

export const Input = styled.TextInput.attrs({
  placeholderTextColor: Colors.gray,
})`
  height: 40px;
  background: ${Colors.grayLight};
  border-radius: 4px;
  padding: 0 10px;
`;

export const SubmitButton = styled(Button).attrs({
  color: Colors.primary,
  mode: 'contained',
})`
  margin-top: 5px;
`;
export const Platforms = styled(Button)`
  padding: 30px;
`;
