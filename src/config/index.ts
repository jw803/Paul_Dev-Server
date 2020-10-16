import localConf from './local';
import devConf from './dev';
import prodConf from './prod';

const config =
    process.env.NODE_ENV === 'development'
        ? devConf
        : process.env.NODE_ENV === 'production'
        ? prodConf
        : localConf;

export default config;
