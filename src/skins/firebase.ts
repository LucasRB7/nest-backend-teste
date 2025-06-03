// firebase.ts
import { initializeApp, cert } from 'firebase-admin/app';
import { getStorage } from 'firebase-admin/storage';
import * as serviceAccount from './my-project-sby-47a2e-firebase-adminsdk-fbsvc-06119ba0e4.json' ; // caminho correto até seu JSON

initializeApp({
  credential: cert(serviceAccount as any),
  storageBucket: 'my-project-sby-47a2e.firebasestorage.app' // <- substitua pelo ID real do seu bucket
});

export const storage = getStorage();
