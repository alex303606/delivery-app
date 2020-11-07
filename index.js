import {init} from './src';
import {name} from './app.json';
import React from 'react';
import {AppRegistry, View, StyleSheet, ActivityIndicator} from 'react-native';
import './src/utils/flipper';

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

AppRegistry.registerComponent(name, () => RootComponent);
