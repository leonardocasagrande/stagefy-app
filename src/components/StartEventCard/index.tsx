import React from 'react';
import { Text, View } from 'react-native';
import { Avatar, Button } from 'react-native-elements';
import DateUtils from '../../pages/utils/DateUtils';
import textStyles from '../../theme/textStyles';
import { IEvent } from '../../types';
import styles from './styles';

interface IStartEventCardProps {
  event: IEvent;
  onStart: (event: IEvent) => void;
}

const StartEventCard = ({ event, onStart }: IStartEventCardProps) => {
  return (
    <View style={styles.root}>
      <Avatar
        avatarStyle={styles.avatar}
        source={{ uri: event.image }}
        size={80}
      />
      <View style={styles.content}>
        <View>
          <Text
            style={{
              ...textStyles.title,
            }}
          >
            {event.name}
          </Text>
        </View>
        <Text style={textStyles.label}>
          {DateUtils.convertDateToShow(event.date)}
        </Text>
        <View style={styles.actions}>
          <Text style={textStyles.label}>
            {DateUtils.convertTimeToShow(event.date)}
          </Text>
          <Button
            title="Iniciar a live"
            disabled={new Date(event.date) >= new Date()}
            onPress={() => onStart(event)}
            buttonStyle={styles.button}
          />
        </View>
      </View>
    </View>
  );
};

export default StartEventCard;
