import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { ImageBackground, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-elements';
import colors from '../../theme/colors';
import textStyles from '../../theme/textStyles';
import { IStartedEvent } from '../../types';
import styles from './styles';

interface IEventCard {
  event: IStartedEvent;
  onPress: (event: IStartedEvent) => Promise<void>;
}

const EventCard = ({ event, onPress }: IEventCard) => {
  return (
    <View style={styles.root}>
      <TouchableOpacity onPress={() => onPress(event)}>
        <ImageBackground style={styles.image} source={{ uri: event.image }}>
          <View style={styles.textWrapper}>
            <Text style={textStyles.liveSubtitle}>
              {event.professional.artisticName}
            </Text>
            <View style={styles.viewWrapper}>
              <FontAwesomeIcon
                style={styles.icon}
                icon="eye"
                color={colors.secondaryBg}
              />
              <Text style={textStyles.liveSubtitle}>{event.views}</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

export default EventCard;
