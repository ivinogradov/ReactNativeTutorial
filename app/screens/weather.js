import React, { useEffect, useState } from 'react';
import { View, Text, unstable_batchedUpdates } from 'react-native';
import { WEATHER_API_KEY } from '../../weather_api_key';

export default function Weather () {
    const [ isRefreshing, setIsRefreshing ] = useState(false);
    const [ pickedCities, setPickedCities ] = useState([]);
    useEffect(() => {
        fetchTemps(setPickedCities);
    }, []);
    console.log(pickedCities);
    return (
        <View>
            <Text>Weather Tab</Text>
        </View>
    );
}

/**
 * Fetching temperatures for a 6 random cities
 * @precondition API restriction 6 calls/minute - can be refreshed up to 10 times in a minute
 * @param {function} setPickedCities state setter function accepting an array of cities
 */
const fetchTemps = (setPickedCities) => {
    var list = getRandomCities(cities, 6);
    var fetchedTemps = [];
    for (const city in list) {
        if (Object.hasOwnProperty.call(list, city)) {
            const element = list[city];
            fetchCityTemp(element.city, element.country, fetchedTemps, setPickedCities);
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
const fetchCityTemp = ( city, country, citiesTempsList, setPickedCities ) => {
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
    })
    .catch((error) => {
        console.log("Error " + error);
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
    }
];
