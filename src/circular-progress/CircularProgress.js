/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Animated, Easing, Platform} from 'react-native';
import styled from 'styled-components/native';
import {Page} from '../Containers';

const LoadingText = styled.Text`
  color: white;
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 20;
`;

export const CircularProgress = ({
  type = 'full',
  activeColor = 'orange',
  passiveColor = 'darkgrey',
  baseColor = 'white',
  width = 50,
  radius = 100,
  duration = 10000,
  children,
}) => {
  const [done] = useState(100);
  const isFull = type === 'full';
  const initialValueHalfCircle = done >= 50 ? 0 : 180;
  const initialValueInnerCircle = 0;
  const animatedValue1 = new Animated.Value(initialValueHalfCircle);
  const animatedValue2 = new Animated.Value(initialValueHalfCircle);
  const animatedValue3 = new Animated.Value(initialValueInnerCircle);
  const timePerDegree = duration / 360;
  const color1 = activeColor;
  const color2 = done >= 50 ? activeColor : passiveColor;

  const firstAnimation = () => {
    animatedValue1.setValue(initialValueHalfCircle);
    animatedValue2.setValue(initialValueHalfCircle);
    animatedValue3.setValue(initialValueInnerCircle);

    Animated.parallel([
      Animated.timing(animatedValue1, {
        toValue: 180,
        duration: 180 * timePerDegree,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(animatedValue2, {
        toValue: 180 + (done - 50) * 3.6,
        duration: (180 + (done - 50) * 3.6) * timePerDegree,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(animatedValue3, {
        toValue: (done - 50) * 3.6,
        delay: 180 * timePerDegree,
        duration: timePerDegree * ((done - 50) * 3.6),
        useNativeDriver: Platform.OS === 'android' ? true : false,
        easing: Easing.linear,
      }),
    ]).start();
  };

  useEffect(() => {
    setTimeout(() => {
      firstAnimation();
    }, 3000);
  }, [done]);

  const renderInner = () => {
    return (
      <View
        style={[
          {
            backgroundColor: baseColor,
            width: 2 * radius - width,
            height: 2 * radius - width,
            borderRadius: radius,
            elevation: 1000,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          },
        ]}></View>
    );
  };

  const renderHalf = (color: string, transforms = [], otherStyles = {}) => (
    <Animated.View
      style={[
        styles.half,
        {backgroundColor: color, borderColor: color},
        {width: radius, height: radius * 2, borderRadius: radius},
        {
          transform: [
            {translateX: radius / 2},
            ...transforms,
            {translateX: -radius / 2},
            {scale: 1.004},
          ],
        },
        otherStyles,
      ]}
    />
  );

  const rotate1 = animatedValue1.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1deg'],
  });
  const rotate2 = animatedValue2.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1deg'],
  });

  const rotate3 = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1deg'],
  });

  const elevation3 = animatedValue3.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -1],
  });

  return (
    <Page>
      <View
        style={[
          styles.outer,
          {backgroundColor: passiveColor},
          {borderRadius: radius, height: radius * 2, width: radius * 2},
        ]}>
        {renderHalf(color1, [{rotate: rotate1}])}
        {renderHalf(color2, [{rotate: rotate2}])}
        {renderHalf(passiveColor, [{rotate: rotate3}], {
          elevation: elevation3,
          zIndex: elevation3,
        })}
        {!isFull && renderInner()}
        <LoadingText>Loading...</LoadingText>
      </View>
    </Page>
  );
};

const styles = StyleSheet.create({
  outer: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  half: {
    position: 'absolute',
    left: 0,
    top: 0,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
  },
});
