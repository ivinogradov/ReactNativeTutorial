import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { WEATHER_API_KEY } from '../../weather_api_key';

export default function Weather () {
    const [ isRefreshing, setIsRefreshing ] = useState(false);
    const [ pickedCities, setPickedCities ] = useState([]);
    useEffect(() => {
        fetchTemps(setPickedCities, setIsRefreshing);
    }, []);
    console.log(pickedCities);
    return (
        <View style={styles.container}>
            <FlatList
                style={{ width: '100%' }}
                data={pickedCities}
                refreshing={isRefreshing}
                onRefresh={() => {
                    setIsRefreshing(true);
                    fetchTemps(setPickedCities, setIsRefreshing);
                }}
                renderItem={({item, index}) => (
                    <View style={styles.row}>
                        <Text style={styles.cityName}>{item.name}, {item.country}</Text>
                        <Text style={[styles.cityTemp,
                            getTempRange(item.temp) == 1 ? styles.cold :
                            getTempRange(item.temp) == 2 ? styles.cool :
                            getTempRange (item.temp) == 3 ? styles.warm :
                            styles.hot
                             ]}>{item.temp} ℃</Text>
                    </View>
                )}
                keyExtractor={ (item, index) =>  index.toString()  }
            />
        </View>
    );
}

/**
 * Temperature grouper (TODO: switch to enums)
 * @param {number} temperature degree celsius
 * @returns number representing cold, medium, warn, hot
 */
const getTempRange = (temperature) => {
    if (temperature < 11) {
        return 1;
    } else if (temperature > 10 && temperature < 20) {
        return 2;
    } else if (temperature >= 20 && temperature < 30) {
        return 3;
    } else {
        return 4;
    }
}

/**
 * Fetching temperatures for a 6 random cities
 * @precondition API restriction 6 calls/minute - can be refreshed up to 10 times in a minute
 * @param {function} setPickedCities state setter function accepting an array of cities
 */
const fetchTemps = (setPickedCities, setIsRefreshing) => {
    var list = getRandomCities(cities, 2);
    var fetchedTemps = [];
    for (const city in list) {
        if (Object.hasOwnProperty.call(list, city)) {
            const element = list[city];
            fetchCityTemp(element.city, element.country, fetchedTemps, setPickedCities, setIsRefreshing);
        }
    }
}
/**
 * Fetches data from open weather map API
 * @param {string} city city name
 * @param {string} country country name or abbreviation
 * @param {object[]} citiesTempsList array of city orjects containing weather data for each city
 * @param {function} setPickedCities state setter function accepting an array of cities
 */
const fetchCityTemp = ( city, country, citiesTempsList, setPickedCities, setIsRefreshing ) => {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='
    + city + ',' + country +
    '&appid=' + WEATHER_API_KEY + '&units=metric')
    .then((response) => response.json())
    .then((responseJson) => {
        var city = {
            name: responseJson.name,
            country: country,
            temp: Math.ceil(responseJson.main.temp),
            type: responseJson.weather[0].main
        };
        citiesTempsList.push(city);
        setPickedCities(citiesTempsList);
        setIsRefreshing(false);
    })
    .catch((error) => {
        console.log("Error " + error);
        setIsRefreshing(false);
    })
}
/**
 * Picks a number or random cities from the array of cities
 * @param {*} cities array of city/country objects
 * @param {number} numberToPick number of city/country object to randomly pick from the array
 * @returns array of randomly picked city/country objects
 */
const getRandomCities = (cities, numberToPick) => {
    var result = new Array(numberToPick),
        length = cities.length,
        taken = new Array(length);
    while(numberToPick--) {
        var randomIndex = Math.floor(Math.random() * length);
        result[numberToPick] = cities[ randomIndex in taken ? taken[randomIndex] : randomIndex ];
        taken[randomIndex] = --length in taken ? taken[length] : length;
    }
    return result;
}

const cities = [
    {
        city: "London",
        country: "UK"
    },
    {
        city: "Madison",
        country: "US"
    },
    {
        city: "Toronto",
        country: "Canada"
    },
    {
        city: "Sydney",
        country: "Australia"
    },
    {
        city: "New York",
        country: "US"
    },
    {
        city: "Quebec City",
        country: "Canada"
    },
    {
        city: "Melbourn",
        country: "Australia"
    },
    {
        city: "Boston",
        country: "US"
    },
    {
        city: "Vancouver",
        country: "Canada"
    },
    {
        city: "Mexico City",
        country: "Mexico"
    },
    {
        city: "Chicago",
        country: "US"
    },
    {
        city: "Moscow",
        country: "Russia"
    },
    {
        city: "Copenhagen",
        country: "Denmark"
    },
    {
        city: "San Francisco",
        country: "US"
    },
    {
        city: "Ottawa",
        country: "Canada"
    },
    {
        city: "Saint Petersburg",
        country: "Russia"
    },
    {
        city: "Rio de Janeiro",
        country: "Brazil"
    },
    {
        city: "Philipsburg",
        country: "Sint Maarten"
    },
    {
        city: "Cancun",
        country: "Mexico"
    },
    {
        city: "Bangalore",
        country: "India"
    },
    {
        city: "Phuket",
        country: "Thailand"
    },
    {
        city: "San Juan",
        country: "Puerto Rico"
    },
    {
        city: "Panama City",
        country: "Panama"
    },
    {
        city: "Adis Ababa",
        country: "Ethiopia"
    },
    {
        city: "Hanoi",
        country: "Vietnam"
    }
];


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundcolor: '#fff'
    },
    row: {
        flex: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'lightgrey',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 25
    },
    cityName: {
        fontSize: 20,
        lineHeight: 40,
        fontFamily: 'Avenir'
    },
    cityTemp: {
        fontSize: 30,
        lineHeight: 40,
        marginRight: 15,
        fontWeight: 'bold',
        fontFamily: 'Avenir'
    },
    cold: { color: 'blue' },
    cool: { color: 'green' },
    warm: { color: 'orange' },
    hot: { color: 'red' }
})
