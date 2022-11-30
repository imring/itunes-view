// preact for some reason doesn't handle directories (refers to a domain),
// so you need to specify the path explicitly when building.
// issue in preact: https://github.com/preactjs/preact/issues/2178
// to solve this problem i made PROCESSROUTE env to specify the path.
// usage (e.g. bash): PROCESSROUTE='itunes-view' npm run dev

let basename = '';

if (process.env.PROCESSROUTE) {
    basename = `/${process.env.PROCESSROUTE}`;
}

export default basename;