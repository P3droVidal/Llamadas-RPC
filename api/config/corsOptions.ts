export default {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    allowedHeaders: '*',
    credentials: true,
    optionsSuccessStatus: 200,
    preflightContinue: false,
  };
  