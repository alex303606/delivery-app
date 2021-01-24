import {init} from './src';
import {name} from './app.json';
import React from 'react';
import {AppRegistry, View, StyleSheet, ActivityIndicator} from 'react-native';
import './src/utils/flipper';
import axios from 'axios';
import notifee, {EventType} from '@notifee/react-native';
class RootComponent extends React.Component {
  state = {
    mainComponent: null,
    onDestroy: null,
  };
  componentDidMount() {
    init().then(({mainComponent, onDestroy}) => {
      this.setState({mainComponent, onDestroy});
    });
  }

  componentWillUnmount() {
    if (this.state.onDestroy) {
      this.state.onDestroy();
    }
  }

  render() {
    const {mainComponent: Component} = this.state;

    if (!Component) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating />
        </View>
      );
    }

    return <Component />;
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

axios.defaults.baseURL = 'http://brandgallery.kido.kg/api/';

axios.interceptors.request.use(
  (conf) => {
    // Do something before request is sent
    conf.data = {
      params: {
        API_KEY: '3YFtpQzbfg3TAomaXRrawJviX',
        ...conf.data,
      },
    };

    return conf;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

notifee.onBackgroundEvent(async ({type, detail}) => {
  const {notification, pressAction} = detail;
  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});

AppRegistry.registerComponent(name, () => RootComponent);
