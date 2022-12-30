import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { WEATHER_API_KEY } from '../../weather_api_key';

export default function Weather () {
    fetchCityTemp('London', 'UK');
    const list = getRandomCities(cities, 5);
    console.log(list);
    const [isRefreshing, setIsRefreshing] = useState(false);
    return (
        <View>
            <Text>Weather Tab</Text>
        </View>
    );
}
/**
 * Fetches data from open weather map API
 * @param {string} city city name
 * @param {string} country country name or abbreviation
 */
const fetchCityTemp = ( city, country ) => {
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
    }
];
