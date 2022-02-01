import React, { useState } from 'react';

import { Text, View } from 'react-native';
import { Button } from 'react-native-elements';
import { useStream } from '../../../context/stream';
import eventsService from '../../../services/events';
import colors from '../../../theme/colors';
import textStyles from '../../../theme/textStyles';
import styles from './styles';

const StartStreamModal = () => {
  const [loading, setLoading] = useState(false);
  const { event, setStarted, selfPeerId } = useStream();

  const handleStreamStart = async () => {
    setLoading(true);
    try {
      await eventsService.startEvent(event!.id, selfPeerId!);
      setStarted(true);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {!!selfPeerId && (
        <View style={styles.root}>
          <View style={styles.modal}>
            <Text style={textStyles.h3White}>Tudo pronto?</Text>
            <Button
              buttonStyle={{
                backgroundColor: colors.warningMain,
              }}
              loading={loading}
              onPress={handleStreamStart}
              title="Iniciar a live"
            />
          </View>
        </View>
      )}
    </>
  );
};

export default StartStreamModal;
