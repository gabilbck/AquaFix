import AsyncStorage from "@react-native-async-storage/async-storage";

// create get set for global user variable and store as json
export async function setUser(user) {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (e) {
    console.error(e);
  }
}

export async function getUser() {
  try {
    const jsonValue = await AsyncStorage.getItem("user");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
}

// create get set for global user variable and store as json
export async function setToken(token) {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (e) {
    console.error(e);
  }
}

export async function getToken() {
  try {
    const token = await AsyncStorage.getItem("token");
    return token;
  } catch (e) {
    console.error(e);
  }
}

// create get set for global user variable and store as json
export async function setUsuario(usuario) {
  try {
    await AsyncStorage.setItem("usuario", JSON.stringify(usuario));
  } catch (e) {
    console.error(e);
  }
}

export async function getUsuario() {
  try {
    const jsonValue = await AsyncStorage.getItem("usuario");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error(e);
  }
}
