module.exports = {
  apps : [{
    name: 'deliver-pickup',	  
    script: 'node ./server/start.js',
    env_production: {
	NODE_ENV: 'production'
    },
    watch: true
    }
  ]
};
