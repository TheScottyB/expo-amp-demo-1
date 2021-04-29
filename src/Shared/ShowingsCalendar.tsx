import * as React from 'react';
import {
  View,
  // Text,
  // Image,
  ScrollView,
  StyleSheet,
  ScrollViewProps,
  Dimensions,
} from 'react-native';
import { useScrollToTop, useTheme } from '@react-navigation/native';
import { Calendar } from 'react-native-big-calendar';

import dayjs from 'dayjs';

type Props = Partial<ScrollViewProps> & {
  date?: string;
  author?: {
    name: string;
  };
};

export const events = [
  {
    title: 'Meeting',
    start: dayjs().set('hour', 10).set('minute', 0).toDate(),
    end: dayjs().set('hour', 10).set('minute', 30).toDate(),
  },
  {
    title: 'Coffee break',
    start: dayjs().set('hour', 14).set('minute', 30).toDate(),
    end: dayjs().set('hour', 15).set('minute', 30).toDate(),
  },
  {
    title: 'Repair my car',
    start: dayjs().add(1, 'day').set('hour', 7).set('minute', 45).toDate(),
    end: dayjs().add(1, 'day').set('hour', 13).set('minute', 30).toDate(),
  },
  {
    title: 'Meet Realtor',
    start: dayjs().add(1, 'day').set('hour', 8).set('minute', 25).toDate(),
    end: dayjs().add(1, 'day').set('hour', 9).set('minute', 55).toDate(),
  },
  {
    title: 'Laundry',
    start: dayjs().add(1, 'day').set('hour', 8).set('minute', 25).toDate(),
    end: dayjs().add(1, 'day').set('hour', 11).set('minute', 0).toDate(),
  },
];

export default function ShowingsCalendar({
  // date = '1st Jan 2025',
  // author = {
  //   name: 'Knowledge Bot',
  // },
  ...rest
}: Props) {
  const ref = React.useRef<ScrollView>(null);

  useScrollToTop(ref);

  const { colors } = useTheme();

  return (
    <ScrollView
      ref={ref}
      style={{ backgroundColor: colors.card }}
      contentContainerStyle={styles.content}
      {...rest}
    >
      <View style={styles.container}>
        <Calendar
          style={styles.calendar}
          height={Dimensions.get('window').height}
          events={events}
          mode="3days"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingVertical: 16,
  },
  container: {
    backgroundColor: '#f8f8f8',
    height: '100%',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#eee',
    backgroundColor: '#fff',
  },
  // author: {
  //   flexDirection: 'row',
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  // },
  // meta: {
  //   marginHorizontal: 8,
  //   justifyContent: 'center',
  // },
  // name: {
  //   fontWeight: 'bold',
  //   fontSize: 16,
  //   lineHeight: 24,
  // },
  // timestamp: {
  //   opacity: 0.5,
  //   fontSize: 14,
  //   lineHeight: 21,
  // },
  // avatar: {
  //   height: 48,
  //   width: 48,
  //   borderRadius: 24,
  // },
  // title: {
  //   fontWeight: 'bold',
  //   fontSize: 36,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  // },
  // paragraph: {
  //   fontSize: 16,
  //   lineHeight: 24,
  //   marginVertical: 8,
  //   marginHorizontal: 16,
  // },
  // image: {
  //   width: '100%',
  //   height: 200,
  //   resizeMode: 'cover',
  //   marginVertical: 8,
  // },
});
