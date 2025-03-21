import { initializeApp, FirebaseApp } from 'firebase/app';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FirebaseSetup implements OnApplicationBootstrap {
  private app: FirebaseApp;
  private adminApp: admin.app.App;

  constructor(private readonly configService: ConfigService) {}

  onApplicationBootstrap() {
    if (!this.adminApp) {
      if (admin.apps.length) {
        this.adminApp = admin.apps[0] as admin.app.App;
      } else {
        const serviceConfig = {
          type: 'service_account',
          project_id: this.configService.get<string>('FIREBASE_PROJECT_ID'),
          private_key_id: this.configService.get<string>(
            'FIREBASE_PRIVATE_KEY_ID',
          ),
          private_key: (
            this.configService.get<string>('FIREBASE_PRIVATE_KEY') || ''
          ).replace(/\\n/g, '\n'),
          client_email: this.configService.get<string>('FIREBASE_CLIENT_EMAIL'),
          client_id: this.configService.get<string>('FIREBASE_CLIENT_ID'),
          auth_uri: this.configService.get<string>('FIREBASE_AUTH_URI'),
          token_uri: this.configService.get<string>('FIREBASE_TOKEN_URI'),
          auth_provider_x509_cert_url: this.configService.get<string>(
            'FIREBASE_AUTH_PROVIDER_X509_CERT_URL',
          ),
          client_x509_cert_url: this.configService.get<string>(
            'FIREBASE_CLIENT_X509_CERT_URL',
          ),
          universe_domain: this.configService.get<string>(
            'FIREBASE_UNIVERSE_DOMAIN',
          ),
        };

        this.adminApp = admin.initializeApp({
          credential: admin.credential.cert(
            serviceConfig as string | ServiceAccount,
          ),
          storageBucket: this.configService.get<string>(
            'FIREBASE_STORAGE_BUCKET',
          ),
        });
      }
    }

    if (!this.app) {
      const firebaseConfig = {
        apiKey: this.configService.get<string>('FIREBASE_API_KEY'),
        authDomain: this.configService.get<string>('FIREBASE_AUTH_DOMAIN'),
        projectId: this.configService.get<string>('FIREBASE_PROJECT_ID'),
        storageBucket: this.configService.get<string>(
          'FIREBASE_STORAGE_BUCKET',
        ),
        messagingSenderId: this.configService.get<string>(
          'FIREBASE_MESSAGING_SENDER_ID',
        ),
        appId: this.configService.get<string>('FIREBASE_APP_ID'),
        measurementId: this.configService.get<string>(
          'FIREBASE_MEASUREMENT_ID',
        ),
      };

      this.app = initializeApp(firebaseConfig);
    }
  }

  setup() {
    return this.app;
  }

  setupAdmin() {
    return this.adminApp;
  }
}
