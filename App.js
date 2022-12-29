import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';



export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      data: [{
        name: "Old",
        image: "http://i.pravatar.cc/400?img=10"
      }, {
        name: "Data",
        image: "http://i.pravatar.cc/400?img=20"
      }],
      refreshing: false
    }
  }

  refreshData = () => {
    this.setState({
      refreshing: true
    })

    this.setState({
      refreshing: false,
      data: [{
        name: "Marina",
        image: "http://i.pravatar.cc/400?img=1"
      }, {
        name: "James",
        image: "http://i.pravatar.cc/400?img=2"
      }, {
        name:  "Bobby",
        image: "http://i.pravatar.cc/400?img=3"
      }, {
        name:  "Carl",
        image: "http://i.pravatar.cc/400?img=4"
      }, {
        name:  "Mila",
        image: "http://i.pravatar.cc/400?img=5"
      }, {
        name:  "Ilya",
        image: "http://i.pravatar.cc/400?img=6"
      }, {
        name:  "Josh",
        image: "http://i.pravatar.cc/400?img=7"
      }, {
        name:  "Garry",
        image: "http://i.pravatar.cc/400?img=8"
      }, {
        name:  "Jos",
        image: "http://i.pravatar.cc/400?img=9"
      }]
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          style={{ width: '100%' }}
          data={ this.state.data }
          refreshing={ this.state.refreshing }
          onRefresh={ this.refreshData }
          renderItem={({item, separators}) => (
            <View style={{ paddingVertical: 15, borderBottomWidth: 1 }}>
              <Image
                style={{ height: 56, width: 56 }}
                source={{ uri: item.image }}
              />
              <Text>{item.name}</Text>
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
