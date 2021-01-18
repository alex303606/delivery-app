import React, {useCallback} from 'react';
import {LayoutChangeEvent, StyleSheet, TransformsStyle} from 'react-native';
import {withAnchorPoint} from 'react-native-anchor-point';
import {
  StackHeaderProps,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {SafeAreaView} from 'react-native-safe-area-context';
import Animated, {
  interpolate,
  useAnimatedStyle,
  Extrapolate,
  useSharedValue,
} from 'react-native-reanimated';
import {COLLAPSIBLE_HEADER_HEIGHT, Colors, HEADER_HEIGHT} from '@config';
import styled from 'styled-components';
import {RoundButton, Row, Typography} from '@components';
import {useAppearance} from '@hooks';

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);
const Y_OFFSET = COLLAPSIBLE_HEADER_HEIGHT - HEADER_HEIGHT;

interface Props extends StackHeaderProps {
  showBackButton?: boolean;
  onPress?: () => void;
  iconName?: string;
}

export interface CollapsibleHeaderOptions extends StackNavigationOptions {
  animatedValue?: Animated.SharedValue<number>;
}

const getTransform = (scale: number, width: number) => {
  'worklet';
  let transform: TransformsStyle = {
    transform: [{scale}],
  };
  return withAnchorPoint(
    transform,
    {x: 1, y: 0.3},
    {width, height: Y_OFFSET + 1},
  );
};

export const CollapsibleHeader: React.FC<Props> = ({
  scene,
  onPress,
  showBackButton = true,
  iconName,
}) => {
  const titleWidth = useSharedValue(0);
  const {themeIsLight} = useAppearance();
  const handleTitleLayout = useCallback(
    (e: LayoutChangeEvent) => {
      titleWidth.value = e.nativeEvent.layout.width;
    },
    [titleWidth],
  );

  const options = scene?.descriptor.options as CollapsibleHeaderOptions;
  const animatedValue = options?.animatedValue;

  const containerStyle = useAnimatedStyle(
    () => ({
      transform: [
        {
          translateY: interpolate(
            animatedValue?.value ?? 0,
            [0, Y_OFFSET],
            [0, -Y_OFFSET],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }),
    [animatedValue],
  );

  const contentStyle = useAnimatedStyle(
    () => ({
      paddingBottom: interpolate(
        animatedValue?.value ?? 0,
        [0, Y_OFFSET],
        [29, 5],
        Extrapolate.CLAMP,
      ),
      transform: [
        {
          translateY: interpolate(
            animatedValue?.value ?? 0,
            [0, Y_OFFSET],
            [0, 8],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }),
    [animatedValue],
  );

  const titleStyle = useAnimatedStyle(() => {
    const scale = interpolate(
      animatedValue?.value ?? 0,
      [0, Y_OFFSET],
      [1, 0.6],
      Extrapolate.CLAMP,
    );
    return getTransform(scale, titleWidth.value);
  }, [animatedValue]);

  const buttonStyle = useAnimatedStyle(
    () => ({
      marginLeft: 6,
      zIndex: 999,
      transform: [
        {
          translateY: interpolate(
            animatedValue?.value ?? 0,
            [0, Y_OFFSET],
            [0, 85],
            Extrapolate.CLAMP,
          ),
        },
      ],
    }),
    [animatedValue],
  );

  return (
    <Container style={StyleSheet.compose(options.headerStyle, containerStyle)}>
      <ContentContainer style={contentStyle}>
        <Animated.View style={buttonStyle}>
          {showBackButton && (
            <RoundButton
              iconName={iconName}
              iconColor={themeIsLight ? Colors.black : Colors.white}
              onPress={onPress}
            />
          )}
        </Animated.View>
        <Row paddingHorizontal={16} justifyContent="flex-end">
          <Animated.View onLayout={handleTitleLayout} style={titleStyle}>
            <Typography.B34 color={themeIsLight ? Colors.black : Colors.white}>
              {options.title}
            </Typography.B34>
          </Animated.View>
        </Row>
      </ContentContainer>
    </Container>
  );
};

const Container = styled(AnimatedSafeAreaView)`
  height: ${COLLAPSIBLE_HEADER_HEIGHT}px;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  elevation: 12;
  background-color: ${Colors.white};
`;

const ContentContainer = styled(Animated.View)`
  flex: 1;
  justify-content: space-between;
  padding: 9px 0 0 0px;
`;
