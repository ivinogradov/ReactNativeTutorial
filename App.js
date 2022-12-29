import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { FlatList, StyleSheet, Text, View, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export class ListTab extends React.Component {
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

  render() {
    return(
      <View style={styles.container}>
        <FlatList
          style={{ width: '100%' }}
          data={ this.state.data }
          refreshing={ this.state.refreshing }
          onRefresh={ this.refreshData }
          renderItem={({item, index }) => (
            <View style={[ styles.rowStyle, index % 2 ? styles.itemOdd : styles.itemEven ]}>
              <Image
                style={ styles.image }
                source={{ uri: item.image }}
              />
              <Text style={{ marginLeft: 25, lineHeight: 50, fontWeight: 'bold', color: 'blue', opacity: 0.5 }}>{item.name}</Text>
            </View>
          )}
          keyExtractor={ (item, index) => index.toString()}
          />
        <StatusBar style="auto" />
      </View>
    )
  }
}

export class TabTwo extends React.Component {
  render() {
    return(
      <View>
        <Text>Tab Two</Text>
      </View>
    )
  }
}

const Tab = createBottomTabNavigator()

export default class App extends React.Component {
  render () {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen name='People' component={ListTab}/>
          <Tab.Screen name='Two' component={TabTwo}/>
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    borderRadius: 56/2,
    height: 56,
    width: 56
  },
  rowStyle: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderColor: 'lightgrey'
  },
  itemOdd: {
    backgroundColor: '#f1f1f1'
  },
  itemEven: {
    backgroundColor: '#ffffff'
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
