export async function searchTracks(params) {
    const url = new URL('https://itunes.apple.com/search');
    url.search = new URLSearchParams(params).toString();
    const response = await fetch(url);
    if (!response || !response.ok)
        return [];
    return (await response.json()).results; // .filter(x => x.wrapperType == "track");
}