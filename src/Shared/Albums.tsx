import * as React from 'react';
import {
  View,
  Image,
  ScrollView,
  StyleSheet,
  ScrollViewProps,
  Dimensions,
  Platform,
  ScaledSize,
} from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import type { RootState } from '../redux/reducers';
import { useSelector } from 'react-redux';

export default function Albums(props: Partial<ScrollViewProps>) {
  const [dimensions, setDimensions] = React.useState(Dimensions.get('window'));
  const { lookup } = useSelector((state: RootState) => state.media);
  const photos: string[] = [];

  // eslint-disable-next-line array-callback-return
  Object.keys(lookup).map((_key) => {
    const temp = lookup[_key][0]; // photos.push(theList[index].MediaURL);
    photos.push(temp.MediaURL);
  });
  React.useEffect(() => {
    const onDimensionsChange = ({ window }: { window: ScaledSize }) => {
      setDimensions(window);
    };

    Dimensions.addEventListener('change', onDimensionsChange);

    return () => Dimensions.removeEventListener('change', onDimensionsChange);
  }, []);

  const ref = React.useRef<ScrollView>(null);

  useScrollToTop(ref);

  const itemSize = dimensions.width / Math.floor(dimensions.width / 150);

  return (
    <ScrollView ref={ref} contentContainerStyle={styles.content} {...props}>
      {lookup &&
        // Object.keys(lookup).map((key, _index) => {
        //   <View
        //   // // eslint-disable-next-line react/no-array-index-key
        //   // key={key}
        //   // style={[
        //   //   styles.item,
        //   //   Platform.OS !== 'web' && {
        //   //     height: itemSize,
        //   //     width: itemSize,
        //   //   },
        //   // ]}
        //   >
        //     Key is {key}
        //     {lookup[key]}
        //     {/* <Image
        //       source={{ uri: theList[key][0].MediaURL }}
        //       style={styles.photo}
        //     /> */}
        //   </View>;
        // })}

        photos.map((source, i) => (
          <View
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            style={[
              styles.item,
              Platform.OS !== 'web' && {
                height: itemSize,
                width: itemSize,
              },
            ]}
          >
            <Image source={{ uri: source }} style={styles.photo} />
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  ...Platform.select({
    web: {
      content: {
        display: 'grid' as 'none',
        gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
      },
      item: {
        width: '100%',
        padding: 5,
      },
    },
    default: {
      content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
    },
  }),
  photo: {
    flex: 1,
    resizeMode: 'cover',
    paddingTop: '100%',
  },
});
