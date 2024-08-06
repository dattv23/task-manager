import { Issuer, Client } from 'openid-client'
import { env } from '~/config/env.config'

class OpenIDClientService {
  private static client: Client

  static async getClient(): Promise<Client> {
    if (!this.client) {
      const googleIssuer = await Issuer.discover('https://accounts.google.com')
      this.client = new googleIssuer.Client({
        client_id: env.auth.client_id!,
        client_secret: env.auth.client_secret,
        redirect_uris: [`${env.server.host}/api/auth/callback`],
        response_types: ['code']
      })
    }
    return this.client
  }
}

export default OpenIDClientService
