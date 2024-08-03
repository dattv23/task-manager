"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const response_config_1 = require("~/config/response.config");
const http_1 = require("http");
const cors_1 = tslib_1.__importDefault(require("cors"));
const morgan_1 = tslib_1.__importDefault(require("morgan"));
const compression_1 = tslib_1.__importDefault(require("compression"));
const cookie_parser_1 = tslib_1.__importDefault(require("cookie-parser"));
const routes_1 = tslib_1.__importDefault(require("./routes"));
const env_config_1 = require("./config/env.config");
const database_services_1 = require("./services/database.services");
const error_middlewares_1 = require("./middlewares/error.middlewares");
const async_exit_hook_1 = tslib_1.__importDefault(require("async-exit-hook"));
const messages_1 = require("./constants/messages");
require("express-async-errors");
const express_session_1 = tslib_1.__importDefault(require("express-session"));
const app = (0, express_1.default)();
const httpServer = (0, http_1.createServer)(app);
// set up middleware
app.use(express_1.default.json());
// CORS configuration
const corsOptions = {
    credentials: true
};
app.use((0, cors_1.default)());
// logs HTTP requests
app.use((0, morgan_1.default)('dev'));
// disable the 'x-powered-by' header to hide technical
app.disable('x-powered-by');
// handle requests with a JSON payload
app.use(express_1.default.json());
// parse incoming URL-encoded data in request body
app.use(express_1.default.urlencoded({ limit: '50mb', extended: true }));
// parser and handle HTTP cookies
app.use((0, cookie_parser_1.default)(env_config_1.env.server.secret));
// compress all responses
app.use((0, compression_1.default)());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});
app.use((0, express_session_1.default)({
    secret: env_config_1.env.server.secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: 'strict' } // for HTTP; set true for HTTPS
}));
app.use('/api', routes_1.default);
// let client: Client
// Initialize OpenID client
// async function initOpenIDClient() {
//   const googleIssuer = await Issuer.discover('https://accounts.google.com')
//   client = new googleIssuer.Client({
//     client_id: env.auth.client_id!,
//     client_secret: env.auth.client_secret,
//     redirect_uris: ['http://localhost:8080/callback'],
//     response_types: ['code']
//   })
// }
// Authentication URL
// app.get('/auth', (req, res) => {
//   const code_verifier = generators.codeVerifier()
//   const code_challenge = generators.codeChallenge(code_verifier)
//   req.session.code_verifier = code_verifier // Store in session
//   const authUrl = client.authorizationUrl({
//     scope: 'openid email profile',
//     code_challenge,
//     code_challenge_method: 'S256'
//   })
//   res.redirect(authUrl)
// })
// Callback URL
// app.get('/callback', async (req, res) => {
//   const params = client.callbackParams(req)
//   const tokenSet = await client.callback('http://localhost:8080/callback', params, { code_verifier: req.session.code_verifier })
//   const userinfo = await client.userinfo(tokenSet)
//   res.json({ userinfo })
// })
app.get('/', (req, res) => {
    response_config_1.sendResponse.success(res, [], 'Hello world');
});
// Connect database task manager
database_services_1.databaseService.connect();
// Error handling
app.use(error_middlewares_1.errorHandler);
httpServer.listen({ port: env_config_1.env.server.port, hostname: env_config_1.env.server.host }, async () => {
    // await initOpenIDClient()
    console.log(`🚀 Server Is Running At http://${env_config_1.env.server.host}:${env_config_1.env.server.port}`);
});
(0, async_exit_hook_1.default)(() => {
    database_services_1.databaseService.disConnect();
    console.log(messages_1.DATABASE_MESSAGE.DISCONNECT);
});
//# sourceMappingURL=main.js.map