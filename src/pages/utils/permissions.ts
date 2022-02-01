import { Platform } from 'react-native';
import { PERMISSIONS, request, check } from 'react-native-permissions';

export const requestCameraAndAudioPermission = async () => {
  try {
    if (Platform.OS === 'ios') {
      await request(PERMISSIONS.IOS.CAMERA);
      await request(PERMISSIONS.IOS.MICROPHONE);
    } else if (Platform.OS === 'android') {
      await request(PERMISSIONS.ANDROID.CAMERA);
      await request(PERMISSIONS.ANDROID.RECORD_AUDIO);
    }
  } catch (err) {
    console.log('requestCameraAndAudioPermission', err);
  }
};

export const checkPermissions = async () => {
  try {
    if (Platform.OS === 'ios') {
      const statusCamera = await check(PERMISSIONS.IOS.CAMERA);
      const statusAudio = await check(PERMISSIONS.IOS.MICROPHONE);
      return statusCamera === 'granted' && statusAudio === 'granted';
    } else if (Platform.OS === 'android') {
      const statusCamera = await check(PERMISSIONS.ANDROID.CAMERA);
      const statusAudio = await check(PERMISSIONS.ANDROID.RECORD_AUDIO);
      return statusCamera === 'granted' && statusAudio === 'granted';
    }
  } catch (err) {
    return false;
  }
};
