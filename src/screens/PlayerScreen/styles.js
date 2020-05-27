import styled from 'styled-components/native';
import { Text as TitlePaper } from 'react-native-paper';
import colors from '../../constants/Colors';

export const Container = styled.ScrollView`
  flex: 1;
  background-color: ${colors.white};
  padding: 20px;
`;

export const Title = styled(TitlePaper)`
  font-size: 18px;
  font-weight: bold;
`;

export const StatsContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

export const MatchesContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

export const WinRateContainer = styled.View`
  flex-direction: row;
  margin-top: 8px;
`;

export const Stats = styled.View`
  margin-left: 16px;
`;
