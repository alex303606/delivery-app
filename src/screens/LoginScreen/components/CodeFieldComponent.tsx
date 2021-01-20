import React, {useImperativeHandle} from 'react';
import {CodeRootComponent} from './CodeRootComponent';
import {SmsCodeCell} from './SmsCodeCell';
import {
  useBlurOnFulfill,
  useClearByFocusCell,
  CodeField,
} from 'react-native-confirmation-code-field';

const CELL_COUNT = 4;

type Props = {
  value: string;
  setValue: (value: string) => void;
};

export type ICodeFieldComponent = {
  clear: () => void;
};

export const CodeFieldComponent = React.forwardRef<ICodeFieldComponent, Props>(
  ({value, setValue}, ref) => {
    const refCodeField = useBlurOnFulfill({value, cellCount: CELL_COUNT});
    const [props, getCellOnLayoutHandler] = useClearByFocusCell({
      value,
      setValue,
    });

    useImperativeHandle(ref, () => ({
      clear: () => {
        setValue('');
        refCodeField.current?.clear();
      },
    }));

    const renderCell = ({
      index,
      symbol,
      isFocused,
    }: {
      index: number;
      symbol: string;
      isFocused: boolean;
    }) => (
      <SmsCodeCell
        key={index.toString()}
        getCellOnLayoutHandler={getCellOnLayoutHandler}
        index={index}
        symbol={symbol}
        isFocused={isFocused}
      />
    );

    return (
      <CodeField
        ref={refCodeField}
        {...props}
        value={value}
        onChangeText={setValue}
        cellCount={CELL_COUNT}
        RootComponent={CodeRootComponent}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={renderCell}
      />
    );
  },
);
