export default {
    webpack(config, env, helpers, options) {
        const publicPath = process.env.PROCESSROUTE
            ? `/${process.env.PROCESSROUTE}/`
            : '';
        config.output.publicPath = publicPath;

        const { plugin } = helpers.getPluginsByName(config, 'DefinePlugin')[0];
        Object.assign(
            plugin.definitions,
            { ['process.env.PROCESSROUTE']: process.env.PROCESSROUTE && JSON.stringify(`${process.env.PROCESSROUTE}`) }
        );
    },
};