import React, {forwardRef, useRef} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
} from 'react-native';

import {colors} from '../../constants/colors';
import {DEVICE_HEIGHT} from '../../constants/device';
import {mergeRef} from '../../utils/mergeRef';

interface InputProps extends TextInputProps {
  disabled?: boolean;
  error?: string;
  touched?: boolean;
}

export const Input = forwardRef<TextInput, InputProps>(
  ({disabled = false, error, ...rest}, ref) => {
    const innerRef = useRef<TextInput>(null);

    return (
      <Pressable
        onPress={() => innerRef.current?.focus()}
        style={[
          styles.container,
          disabled && styles.disabled,
          Boolean(error) && styles.errorInput,
        ]}>
        <TextInput
          editable={!disabled}
          placeholderTextColor={colors.gray_500}
          style={[styles.input, disabled && styles.disabled]}
          autoCapitalize="none"
          spellCheck={false}
          autoCorrect={false}
          ref={ref ? mergeRef(innerRef, ref) : innerRef}
          {...rest}
        />
        {Boolean(error) && <Text style={styles.errorText}>{error}</Text>}
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: colors.gray_200,
    padding: DEVICE_HEIGHT > 700 ? 15 : 10,
  },
  input: {
    fontSize: 16,
    color: colors.black,
    padding: 0,
  },
  disabled: {
    backgroundColor: colors.gray_200,
    color: colors.gray_700,
  },
  errorInput: {
    borderColor: colors.red_300,
  },
  errorText: {
    color: colors.red_500,
    fontSize: 12,
    paddingTop: 5,
  },
});
