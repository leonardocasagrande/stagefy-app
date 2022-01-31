import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import textStyles from '../../theme/textStyles';
import Lives from './Lives';
import { styles } from './styles';

const tabs = ['Lives', 'Próximas'];

const Home: React.FC = () => {
  // const { signOut } = useAuth();
  // const { setError } = useError();

  // const { navigate, reset } = useRootStackNavigation();

  const [activeTab, setActiveTab] = useState('Lives');

  // const handleLogout = async () => {
  //   try {
  //     await signOut();
  //     reset({
  //       index: 0,
  //       routes: [{ name: 'Login' }],
  //     });
  //   } catch (err) {
  //     if (axios.isAxiosError(err)) {
  //       setError(err.response?.data.message);
  //     }
  //   }
  // };

  return (
    <View style={styles.screen}>
      <View style={styles.header}>
        {tabs.map(tab => (
          <TouchableOpacity
            onPress={() => setActiveTab(tab)}
            style={styles.tab}
            key={tab}
          >
            <Text
              style={
                activeTab === tab
                  ? textStyles.homeActiveTab
                  : textStyles.homeTab
              }
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {activeTab === 'Lives' && <Lives />}
    </View>
  );
};

export default Home;
