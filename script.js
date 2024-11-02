import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCfXnQOdzTDChzkt148o2FsJ3xvq053uN0",
    authDomain: "litupdiyas.firebaseapp.com",
    projectId: "litupdiyas",
    storageBucket: "litupdiyas.firebasestorage.app",
    messagingSenderId: "638394029360",
    appId: "1:638394029360:web:95408cb203d88785b124f5",
    measurementId: "G-24QQVCF9PY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

const container = document.querySelector('.container');
const numDiyas = Math.floor((window.innerWidth / 60) * (window.innerHeight / 60));
let glowStates = {};

const diyasRef = doc(db, "diyas", "state");

async function fetchInitialState() {
    const docSnap = await getDoc(diyasRef);
    if (docSnap.exists()) {
        return docSnap.data().glowStates || {};
    } else {
        return {};
    }
}

function createDiyas() {
    for (let i = 0; i < numDiyas; i++) {
        if (!(i in glowStates)) {
            glowStates[i] = false;
        }

        const diya = document.createElement('div');
        diya.classList.add('diya');

        if (glowStates[i]) {
            diya.classList.add('glow');
        }

        diya.addEventListener('click', () => {
            diya.classList.toggle('glow');
            const isGlowing = diya.classList.contains('glow');

            glowStates[i] = isGlowing;

            updateFirestore();
        });

        container.appendChild(diya);
    }
}

async function updateFirestore() {
    await setDoc(diyasRef, { glowStates });
}

onSnapshot(diyasRef, (snapshot) => {
    const data = snapshot.data();
    if (data) {
        glowStates = data.glowStates || {};
        updateDiyas(glowStates);
    }
});

function updateDiyas(glowStates) {
    const diyas = document.querySelectorAll('.diya');
    diyas.forEach((diya, index) => {
        if (glowStates[index]) {
            diya.classList.add('glow');
        } else {
            diya.classList.remove('glow');
        }
    });
}

fetchInitialState().then(initialStates => {
    glowStates = initialStates;
    createDiyas();
});
