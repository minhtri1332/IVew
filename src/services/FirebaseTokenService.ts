class FirebaseTokenClass {
  private firebaseToken: string = "";

  getFirebaseToken = () => {
    return this.firebaseToken;
  };

  change = async (newFirebaseToken: string) => {
    this.firebaseToken = newFirebaseToken;
  };
}

const FirebaseTokenService = new FirebaseTokenClass();
export default FirebaseTokenService;
