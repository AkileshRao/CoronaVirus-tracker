import axios from 'axios';

const API_URL = 'https://covid19.mathdro.id/api';

export const fetchData = async (country) => {
    let url = country ? `${API_URL}/countries/${country}` : API_URL;

    try {
        const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(url);
        return { confirmed, recovered, deaths, lastUpdate };
    } catch (err) {
        console.log(err);
    }
}

export const fetchDailyData = async () => {
    try {
        const { data } = await axios.get(`${API_URL}/daily`);

        const modifiedData = data.map((dailyData) => ({
            confirmed: dailyData.confirmed.total,
            deaths: dailyData.deaths.total,
            date: dailyData.reportDate
        }));

        return modifiedData;
    } catch (error) {
        console.log(error);
    }
}

export const fetchCountries = async () => {
    try {
        const { data: { countries } } = await axios.get(`${API_URL}/countries`);
        return countries.map(country => country.name)
    } catch (error) {
        console.log(error);
    }
}