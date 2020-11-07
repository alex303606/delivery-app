import {Text} from 'react-native';
import styled from 'styled-components';
import {Colors} from '../config/Colors';
import {spacings, SpacingsProps} from '@utils';

export interface ColoredTextProps {
  color?: string;
  textAlign?: string;
  flexShrink?: number;
}

const coloredText = styled(Text)<ColoredTextProps & SpacingsProps>`
  color: ${({color}) => color || Colors.black100};
  text-align: ${({textAlign}) => textAlign || 'left'};
  ${({flexShrink}) =>
    typeof flexShrink === 'number' ? `flex-shrink: ${flexShrink}` : ''}
  ${(props) => spacings(props)}
`;

const regular = styled(coloredText)`
  font-family: 'SBSansDisplay-Regular';
`;

const semiBold = styled(coloredText)`
  font-family: 'SBSansDisplay-SemiBold';
`;

const bold = styled(coloredText)`
  font-family: 'SBSansDisplay-Bold';
`;

const regularUppercase = styled(regular)`
  text-transform: uppercase;
`;

const boldUppercase = styled(bold)`
  text-transform: uppercase;
`;

const semiBoldUppercase = styled(semiBold)`
  text-transform: uppercase;
`;

const TitleBig = styled(bold)`
  font-size: 32px;
  line-height: 41px;
`;

const Title1 = styled(bold)`
  font-size: 20px;
  line-height: 26px;
`;

const Title2 = styled(bold)`
  font-size: 18px;
  line-height: 24px;
`;

const Title3 = styled(semiBold)`
  font-size: 14px;
  line-height: 18px;
`;

const Headline = styled(regular)`
  font-size: 17px;
  line-height: 24px;
`;

const HeadlineSemibold = styled(semiBold)`
  font-size: 17px;
  line-height: 24px;
`;

const Body = styled(regular)`
  font-size: 15px;
  line-height: 20px;
`;

const BodySemibold = styled(semiBold)`
  font-size: 15px;
  line-height: 20px;
`;

const BodyBold = styled(bold)`
  font-size: 15px;
  line-height: 20px;
`;

const Footnote = styled(regular)`
  font-size: 13px;
  line-height: 18px;
`;

const FootnoteSemibold = styled(semiBold)`
  font-size: 13px;
  line-height: 18px;
`;

const Caption = styled(regular)`
  font-size: 12px;
  line-height: 16px;
`;

const CaptionSemibold = styled(semiBold)`
  font-size: 12px;
  line-height: 16px;
`;

export const Typography = {
  coloredText,
  regular,
  semiBold,
  bold,
  regularUppercase,
  boldUppercase,
  semiBoldUppercase,
  TitleBig,
  Title1,
  Title2,
  Title3,
  Headline,
  HeadlineSemibold,
  Body,
  BodySemibold,
  Footnote,
  FootnoteSemibold,
  Caption,
  CaptionSemibold,
  BodyBold,
};
