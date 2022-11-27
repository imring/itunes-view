import axios from 'axios';

export async function searchTracks(params) {
    const response = await axios.get('https://itunes.apple.com/search', { params });
    if (!response || !response.data)
        return [];
    return response.data.results; // .filter(x => x.wrapperType == "track");
}