import React from 'react';
import {Block, ScrollContainer, Typography} from '@components';
import {RootState} from 'src/store/configureStore';
import {connect} from 'react-redux';
import {AppDataScreenProps} from '@interfaces';
import {useAppearance} from '@hooks';
import {IProfileState} from 'src/store/reducers/profile';

type Props = {} & IProfileState & AppDataScreenProps;

const mapState = (state: RootState) => ({
  documents: state.profile.documents,
});

const connector = connect(mapState, null);
export const AppDataScreenComponent: React.FC<Props> = (props) => {
  const {
    route: {
      params: {index},
    },
  } = props;
  const doc = props.documents[index];
  const {textColor} = useAppearance();
  return (
    <Block flex={1} padding={16}>
      <Typography.B34 marginBottom={24} color={textColor}>
        {doc.name}
      </Typography.B34>
      <ScrollContainer>
        <Typography.R14 color={textColor}>{doc.text}</Typography.R14>
      </ScrollContainer>
    </Block>
  );
};

export const AppDataScreen = connector(AppDataScreenComponent);
