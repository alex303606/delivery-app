import React, {
  useCallback,
  useEffect,
  useState,
  useImperativeHandle,
  useRef,
} from 'react';
import styled from 'styled-components/native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedRef,
  useDerivedValue,
  measure,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import {Dimensions} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const MAX_NOTIFICATION_HEIGHT = Dimensions.get('window').height;

interface NotificationViewProps {
  onShown?: () => void;
  onHidden?: () => void;
  children: React.ReactNode;
  style?: object | object[];
}

interface NotificationViewRef {
  hide: () => void;
  show: () => void;
}

const NotificationView = React.forwardRef<
  NotificationViewRef,
  NotificationViewProps
>(({children, onShown, onHidden, style}, ref) => {
  const insets = useSafeAreaInsets();
  const visible = useSharedValue(1);
  const containerRef = useAnimatedRef<Animated.View>();
  const containerHeight = useDerivedValue(() => {
    try {
      // https://github.com/software-mansion/react-native-reanimated/issues/1172
      const {height} = measure(containerRef);
      return height;
    } catch (e) {
      return 0;
    }
  }, []);
  const animatedStyles = useAnimatedStyle(() => {
    const callback = visible.value === 1 ? onShown : onHidden;
    return {
      top:
        containerHeight.value > 0
          ? -containerHeight.value
          : -MAX_NOTIFICATION_HEIGHT,
      transform: [
        {
          translateY: withTiming(
            visible.value * containerHeight.value,
            {duration: 400},
            (isFinished) => {
              if (isFinished && typeof callback === 'function') {
                runOnJS(callback)();
              }
            },
          ),
        },
      ],
      paddingTop: withTiming(insets.top, {duration: 200}),
    };
  });

  useImperativeHandle(ref, () => ({
    show() {
      visible.value = 1;
    },
    hide() {
      visible.value = 0;
    },
  }));

  return (
    <Container ref={containerRef} style={[style, animatedStyles]}>
      {children}
    </Container>
  );
});

const Container = styled(Animated.View)`
  position: absolute;
  top: 0;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  max-height: ${MAX_NOTIFICATION_HEIGHT}px;
`;

export interface StatusBarNotificationProps extends NotificationViewProps {
  isVisible: boolean;
}

export const StatusBarNotification: React.FC<StatusBarNotificationProps> = ({
  children,
  isVisible,
  onHidden,
  onShown,
  style,
}) => {
  const [isNotificationViewVisible, setIsNotificationViewVisible] = useState(
    isVisible,
  );
  const notificationRef = useRef<NotificationViewRef>(null);
  useEffect(() => {
    if (isVisible) {
      setIsNotificationViewVisible(true);
    } else {
      notificationRef.current?.hide();
    }
  }, [isVisible]);

  const hideNotificationHandler = useCallback(() => {
    setIsNotificationViewVisible(false);
    typeof onHidden === 'function' && onHidden();
  }, [onHidden]);

  if (isNotificationViewVisible) {
    return (
      <NotificationView
        ref={notificationRef}
        style={style}
        onShown={onShown}
        onHidden={hideNotificationHandler}>
        {children}
      </NotificationView>
    );
  }
  return null;
};
