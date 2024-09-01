import React, {ReactNode} from 'react';
import {
  Dimensions,
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
} from 'react-native';

import {colors} from '../../constants/colors';

interface ButtonProps extends PressableProps {
  children: ReactNode;
  variant?: 'filled' | 'outlined';
  size?: 'medium' | 'large';
  invalid?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

export const Button = ({
  children,
  variant = 'filled',
  size = 'large',
  invalid = false,
  ...rest
}: ButtonProps) => {
  return (
    <Pressable
      disabled={invalid}
      style={({pressed}) => [
        styles.container,
        styles[size],
        pressed ? styles[`${variant}Pressed`] : styles[variant],
        invalid && styles.invalid,
      ]}
      {...rest}>
      <Text style={[styles.text, styles[`${variant}Text`]]}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  invalid: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    fontWeight: '700',
  },
  filled: {
    backgroundColor: colors.pink_700,
  },
  filledPressed: {
    backgroundColor: colors.pink_500,
  },
  filledText: {
    color: colors.white,
  },
  outlined: {
    borderColor: colors.pink_700,
    borderWidth: 1,
  },
  outlinedPressed: {
    borderColor: colors.pink_700,
    borderWidth: 1,
    opacity: 0.5,
  },
  outlinedText: {
    color: colors.pink_700,
  },
  large: {
    width: '100%',
    paddingVertical: deviceHeight > 700 ? 15 : 12,
  },
  medium: {
    width: '50%',
    paddingVertical: deviceHeight > 700 ? 12 : 10,
  },
});
