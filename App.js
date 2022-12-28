import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';



export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: ["Harry", "James", "Bobby", "Carl", "Jos"]
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          data={ this.state.data }
          renderItem={({item, separators}) => (
            <View>
              <Text>{item}</Text>
            </View>
          )}
          keyExtractor={ (item, index) => index.toString()}
          />
        <StatusBar style="auto" />
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
