module.exports = {
  apps : [
      {
    name   : "server",
    script : "./server.js",
    env_production: {
      NODE_ENV: "production",
      script:"npm run build"
    },
    env_development: {
      NODE_ENV: "development"
    }
  },
    {
      name   : "client",
      script : "npm --name \"next\" -- run dev",
      env_production: {
        NODE_ENV: "production",
        script:"npm run build"
      },
      env_development: {
        NODE_ENV: "development"
      }
    }
  ]
}
