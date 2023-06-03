import React from 'react';
import {LogBox, SafeAreaView, StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {NetworkConnectivityModal} from './app/components/NetworkConnectivityModal';
import {RootStack} from './app/navigation/RootStack';
import {persister, store} from './app/redux/store';

LogBox.ignoreAllLogs(true);

function App(): JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persister}>
        <SafeAreaView style={styles.root}>
          <RootStack />
          <NetworkConnectivityModal />
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});

export default App;
