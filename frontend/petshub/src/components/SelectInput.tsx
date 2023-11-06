import { IconButton, Text, View, Flex, Button } from 'native-base';
import { useState } from 'react';
import Modal from 'react-native-modal';
import { useWindowDimensions } from 'react-native';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';

const SelectInput = ({ placeholder, value, onSelect, options }) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const selectOption = (option) => {
    onSelect(option);
    setOpen(false);
  };
  const { width } = useWindowDimensions();
  return (
    <>
      <Flex direction='row' justifyContent='space-between' alignItems='center'>
        <Text fontSize='md'>{t(value.name)}</Text>
        <IconButton
          colorScheme={'black'}
          variant='ghost'
          borderRadius='full'
          onPress={() => setOpen(true)}
          _icon={{
            as: <MaterialIcons name='expand-more' />,
          }}
        />
      </Flex>
      <Modal isVisible={open} style={{ margin: 0, padding: 0 }}>
        <View
          width={width}
          height='auto'
          bg='white'
          marginTop='auto'
          borderTopLeftRadius='10'
          borderTopRightRadius='10'
        >
          <Flex mt='3'>
            {options.map((option) => (
              <Button
                key={`option-${option.name}`}
                variant='ghost'
                size='lg'
                colorScheme='light'
                onPress={() => selectOption(option)}
              >
                {t(option.name)}
              </Button>
            ))}
          </Flex>
        </View>
      </Modal>
    </>
  );
};

export default SelectInput;
