import React from 'react';
import { View, Text } from 'react-native';
import { WEATHER_API_KEY } from '../../weather_api_key';

export default function Weather () {
    fetchCityTemp('London', 'UK');
    return (
        <View>
            <Text>Weather Tab</Text>
        </View>
    );
}

var fetchCityTemp = ( city, country ) => {
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
        console.log(city);
    });
}
