import React from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import {Colors} from '@config';
import {Block, RoundButton, Row, Typography} from '@components';

const ROUND_BUTTONS_ANIMATION_DURATION = 150;
const ROUND_BUTTON_DIAMETER = 40;
const cardProductVerticalTimingConfig: Animated.WithTimingConfig = {
  duration: ROUND_BUTTONS_ANIMATION_DURATION,
};

type Props = {
  count: number;
  isAddedState: boolean;
  onMinusPressHandler: () => void;
  onPlusPressHandler: () => void;
};

export const RoundButtons: React.FC<Props> = ({
  count,
  isAddedState,
  onPlusPressHandler,
  onMinusPressHandler,
}) => {
  const colorBG = isAddedState ? Colors.mainPrimary : Colors.white;
  const colorIcon = isAddedState ? Colors.white : Colors.mainPrimary;
  const heightValue = useSharedValue(isAddedState ? 1 : 0, true);
  const delay =
    heightValue.value === 0 ? 0 : ROUND_BUTTONS_ANIMATION_DURATION / 4;

  const minusButtonStyles = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        delay,
        withTiming(heightValue.value, cardProductVerticalTimingConfig),
      ),
    };
  }, [heightValue, delay]);

  const quantityStyles = useAnimatedStyle(() => {
    return {
      opacity: withDelay(
        delay,
        withTiming(heightValue.value, cardProductVerticalTimingConfig),
      ),
      transform: [
        {
          scale: withDelay(
            delay,
            withTiming(
              interpolate(heightValue.value, [0, 1], [0.5, 1]),
              cardProductVerticalTimingConfig,
            ),
          ),
        },
      ],
    };
  }, [heightValue, delay]);

  return (
    <Block flex={1} justifyContent="center">
      <Row justifyContent="space-between" alignItems="center">
        <Animated.View style={minusButtonStyles}>
          <RoundButton
            iconColor={Colors.mainPrimary}
            iconName={'remove-circle-outline'}
            onPress={count > 0 ? onMinusPressHandler : undefined}
            backgroundColor={Colors.white}
            diameter={ROUND_BUTTON_DIAMETER}
            iconSize={ROUND_BUTTON_DIAMETER}
            paddingLeft={1}
          />
        </Animated.View>
        <Animated.View style={quantityStyles}>
          <Typography.B24>{`${count || 1}`}</Typography.B24>
        </Animated.View>
        <RoundButton
          iconColor={colorIcon}
          iconName={'add-circle-outline'}
          onPress={onPlusPressHandler}
          backgroundColor={colorBG}
          diameter={ROUND_BUTTON_DIAMETER}
          iconSize={ROUND_BUTTON_DIAMETER}
          paddingLeft={1}
        />
      </Row>
    </Block>
  );
};
