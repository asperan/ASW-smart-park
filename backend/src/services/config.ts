class Config {

  config: any;

  constructor() {
    const profile = process.env.NODE_ENV;
    if (profile == "production") {
      this.config = require('../../config/config-production.json');
    } else {
      this.config = require('../../config/config-development.json');
    }
  }

}

let config: Config;

export function loadConfig(): void {
  config = new Config();
}

export function getConfig(): any {
  if (!config) {
    throw "Config is not loaded";
  }
  return config.config;
}