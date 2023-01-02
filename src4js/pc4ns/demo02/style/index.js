const req = require.context('./', false, /\.\/\w+\.(less|css)/);
req.keys().forEach(mod => req(mod));
