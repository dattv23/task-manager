"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const openid_client_1 = require("openid-client");
const env_config_1 = require("~/config/env.config");
class OpenIDClientService {
    static client;
    static async getClient() {
        if (!this.client) {
            const googleIssuer = await openid_client_1.Issuer.discover('https://accounts.google.com');
            this.client = new googleIssuer.Client({
                client_id: env_config_1.env.auth.client_id,
                client_secret: env_config_1.env.auth.client_secret,
                redirect_uris: ['http://localhost:8080/api/auth/callback'],
                response_types: ['code']
            });
        }
        return this.client;
    }
}
exports.default = OpenIDClientService;
//# sourceMappingURL=openidClient.services.js.map