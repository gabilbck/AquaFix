// createa  function to relate a firebase field to and UID
export function addFieldToDatabase(uid, field, value) {
  //check if field already exists using firebase 8+ syntax
  const userRef = firebase.database().ref(`usuario/${uid}/${field}`);
  userRef
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        //if it exists, update the value
        userRef.update({ [field]: value });
      } else {
        //if it doesn't exist, create it
        userRef.set({ [field]: value });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

// function to associate image id from firestorage  to an user collection named "usuario"
// using firebase 8+ syntax
function addImageToDatabase(imageId) {
  // get current user uid from auth using firebase 8+ syntax
  const uid = firebase.auth().currentUser.uid;
  const userRef = firebase.database().ref(`usuario/${uid}/imagem_id`);
  userRef
    .get()
    .then((snapshot) => {
      if (snapshot.exists()) {
        userRef.update({ imageId: imageId });
      } else {
        userRef.set({ imageId: imageId });
      }
    })
    .catch((error) => {
      console.error(error);
    });
}
