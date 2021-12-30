const bcrypt = require("bcrypt");
const auth = require("../../../auth");
const error = require("../../../utils/error");
const TABLE = "auth";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy.js");
  }
  async function login(username, password) {
    const response = await store.query(TABLE, { username });
    const data = response[0];
    return bcrypt.compare(password, data.password).then((sonIguales) => {
      if (sonIguales) {
        //GENERA TOKEN
        return auth.sign(data);
      } else {
        throw error("No puedes hacer esto", 500);
      }
    });
  }
  async function upsert(data) {
    const authData = {
      id: data.id,
    };
    if (data.username) {
      authData.username = data.username;
    }
    if (data.password) {
      authData.password = await bcrypt.hash(data.password, 5);
    }

    return store.upsert(TABLE, authData);
  }

  return {
    upsert,
    login,
  };
};
