import { IconButton, Flex, Badge } from 'native-base';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Pressable } from 'react-native';
// import Animated, { Layout } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';
import React from 'react';

export const capitalize = (word) => word.charAt(0).toUpperCase() + word.slice(1);

export default function ProductCategories({ tags }) {
  const { t } = useTranslation();
  const [selected, setSelected] = useState(undefined);
  const Tag = ({ tag }) => (
    // <Animated.View layout={Layout.delay(1000).springify()}>
    <Badge
      bg={tag.color}
      _text={{ color: 'lightText', fontSize: 'md' }}
      borderRadius='2xl'
    >
      {capitalize(t(tag.name))}
    </Badge>
    // </Animated.View>
  );
  const getRandomString = () => Math.random() * 100000;
  let key = getRandomString();
  const selectTag = (tag) => {
    setSelected(tag);
    key = getRandomString();
  };
  const showTag = (tag) => (!selected ? true : selected === tag);
  //   const animatedStyles = useAnimatedStyle(() => {
  //     return {
  //       display: 'flex',
  //       flexDirection: 'row',
  //     };
  //   });

  return (
    <ScrollView
      key={`toy-categories-${key}`}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
    >
      <Flex direction='row' gap='12px'>
        {selected && (
          <IconButton
            variant='solid'
            bg='gray.200'
            size='25px'
            borderRadius='full'
            onPress={(e) => selectTag(undefined)}
            _icon={{
              as: <AntDesign name='close' size={24} color='black' />,
            }}
          />
        )}
        {tags.map(
          (tag) =>
            showTag(tag) && (
              <Pressable
                key={`badge-${tag.name}`}
                onPress={() => selectTag(tag)}
              >
                <Tag tag={tag} />
              </Pressable>
            )
        )}
      </Flex>
    </ScrollView>
  );
}
