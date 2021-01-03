import React, {forwardRef, ReactNode, useImperativeHandle, useRef} from 'react';
import {Modalize, ModalizeProps} from 'react-native-modalize';
import {FlatList, ScrollView, SectionList} from 'react-native';
import {IHandles} from 'react-native-modalize/lib/options';

interface IProps {
  children: ReactNode;
  renderHeader: () => void;
  contentRef?: React.RefObject<ScrollView | FlatList | SectionList>;
}

export const Modal = forwardRef<ModalizeProps, IProps>(
  ({contentRef, renderHeader, ...props}, ref) => {
    const modalRef = useRef<IHandles>(null);

    // @ts-ignore
    useImperativeHandle(ref, () => ({
      open: () => {
        modalRef.current?.open();
      },
      close: () => {
        modalRef.current?.close();
      },
    }));

    return (
      <Modalize
        ref={modalRef}
        contentRef={contentRef}
        HeaderComponent={renderHeader}
        snapPoint={350}>
        {props.children}
      </Modalize>
    );
  },
);
