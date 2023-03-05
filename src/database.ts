import { initializeApp, FirebaseApp } from "firebase/app";
import { addDoc, collection, CollectionReference, DocumentData, getDocs, getFirestore } from "firebase/firestore";

let app: FirebaseApp | null = null;

const getAppSingleton = (): FirebaseApp => {
    if (!app) {
        app = initializeApp({
            apiKey: process.env.FIREBASE_API_KEY,
            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
            projectId: process.env.FIREBASE_PROJECT_ID,
            storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
            messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
            appId: process.env.FIREBASE_APP_ID,
            measurementId: process.env.FIREBASE_MEASUREMENT_ID,
            databaseURL: process.env.FIREBASE_DATABASE_URL,
        }, "countrygardensapp");
    }

    return app;
};

const db = getFirestore(getAppSingleton());

type collectionType = "orders" | "products";

export const collections: Record<collectionType, CollectionReference> = {
    orders: collection(db, "orders"),
    products: collection(db, "products"),
};

export interface Order {
  value: number;
  timestamp: string;
  name: string;
}

export interface Product {
  value: number;
  name: string;
}

export const get = async (collection: CollectionReference) => {
    const { docs } = await getDocs(collection);

    return docs.map((doc) => doc.data());
};

export const post = async (collection: CollectionReference, newData: DocumentData) => {
    const res = await addDoc(collection, newData);

    return res;
};
