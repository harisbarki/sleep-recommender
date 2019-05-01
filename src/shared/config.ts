const path = require('path');

export const Environments = {
	production: 'production',
	development: 'development',
};

interface IConfig {
	rootServerDirectory: string;
	productionEnvironment: boolean;
	developmentEnvironment: boolean;
	environment: string;
	server: {
		port: string;
	};
	cors: {
		origin: string
	};
}

const config: IConfig = {
	rootServerDirectory: path.join(path.dirname(require.main.filename), '../'),
	productionEnvironment: process.env.NODE_ENV === Environments.production,
	developmentEnvironment: process.env.NODE_ENV === Environments.development,
	environment: process.env.NODE_ENV || Environments.development,
	server: {
		port: process.env.PORT || '3000',
	},
	cors: {
		origin: '*'
	}
};

if (config.developmentEnvironment) {
	console.log('DEV CONFIG');
	console.log(config);
}

export {config};
