import fb from '@/firebase';

export const userService = {
    createUpdate, login, logout
};

async function get(email) {
    return fb.firestore.collection("users").where("email", "==", email).limit(1).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    return {success: false, error: "No user(s)"};
                }  
                
                var id, content;

                snapshot.forEach(doc => {
                    id = doc.id;
                    content = doc.data();
                });

                return {success: true, id: id, data: content};
            }).catch(handleError);
}

async function createUpdate(uid, name, email, photoUrl) {
    var data = {
        name: name,
        email: email,
        photoUrl: photoUrl
    };
    
    return fb.firestore.collection("users").doc(uid).set(data)
            .then(function() {
                return {success: true};
            }).catch(handleError);
}

async function login(uid) {
    const now = new Date();
    var data = {
        loginAt: now
    }

    return fb.firestore.collection("online").doc(uid).set(data);
}

async function logout(uid) {
    console.log("Logging out " + uid);
    return fb.firestore.collection("online").doc(uid).delete()
    .then(function() {
        console.log("Document successfully deleted!");
    }).catch(function(error) {
        console.error("Error removing document: ", error);
    });
}

function handleError(error) {
    console.log("Ops! " + error);
    return Promise.reject(error);
}
