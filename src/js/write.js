import { ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";
import { ref as databaseRef, push, set, get, remove } from 'firebase/database';
import { db, storage } from "./libs/firebase/firebaseConfig";