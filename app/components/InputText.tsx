import React from 'react';
import {
  KeyboardTypeOptions,
  TextInput,
  TextInputProps,
  ViewStyle,
} from 'react-native';

interface TextInputProp extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  placeholderColor: string;
  style: ViewStyle;
  secureTextEntry?: boolean;
  keyboardType?: KeyboardTypeOptions | undefined;
}

export const InputText: React.FC<TextInputProp> = ({
  value,
  onChangeText,
  placeholder,
  placeholderColor,
  style,
  secureTextEntry = false,
  keyboardType,
  ...props
}) => {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor={placeholderColor}
      style={style}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      {...props}
    />
  );
};
