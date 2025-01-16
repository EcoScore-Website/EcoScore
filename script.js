// Firebase Konfiguration
const firebaseConfig = {
    apiKey: "AIzaSyDPS6ZBGz-WfqVzVMd5Dj2DRD5D6dvYdo",
    authDomain: "ecoscore-63165.firebaseapp.com",
    projectId: "ecoscore-63165",
    storageBucket: "ecoscore-63165.appspot.com",
    messagingSenderId: "353831588836",
    appId: "1:353831588836:web:c2a7ca30f66c403837adf1",
    measurementId: "G-GH7NTI3LFX"
};

// Firebase initialisieren
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = firebase.auth();

// Benutzerregistrierung
function registerUser(email, password) {
    auth.createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Benutzer registriert:", user.uid);
            alert("Registrierung erfolgreich!");
        })
        .catch((error) => {
            console.error("Fehler bei der Registrierung:", error.message);
            alert("Fehler: " + error.message);
        });
}

// Benutzeranmeldung
function loginUser(email, password) {
    auth.signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log("Benutzer angemeldet:", user.uid);
            alert("Anmeldung erfolgreich!");
        })
        .catch((error) => {
            console.error("Fehler bei der Anmeldung:", error.message);
            alert("Fehler: " + error.message);
        });
}

// Benutzerabmeldung
function logoutUser() {
    auth.signOut()
        .then(() => {
            console.log("Benutzer abgemeldet.");
            alert("Abmeldung erfolgreich!");
        })
        .catch((error) => {
            console.error("Fehler bei der Abmeldung:", error.message);
        });
}

// CO₂-Daten speichern
function saveUserData(co2Data) {
    const user = auth.currentUser;
    if (user) {
        db.collection("users").doc(user.uid).set({
            co2Data: co2Data,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }).then(() => {
            console.log("Daten erfolgreich gespeichert!");
        }).catch((error) => {
            console.error("Fehler beim Speichern der Daten: ", error);
        });
    } else {
        console.log("Kein Benutzer angemeldet.");
    }
}
