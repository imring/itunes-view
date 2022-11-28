import baseroute from './baseroute';

export default {
    webpack(config, env, helpers, options) {
        if (baseroute)
            config.output.publicPath = `${baseroute}/`;
    },
};