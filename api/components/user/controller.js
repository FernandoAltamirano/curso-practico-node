const nanoid = require("nanoid");
const auth = require("../auth/index.js");

const TABLE = "users";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy.js");
  }
  function list() {
    return store.list(TABLE);
  }
  function get(TABLE, id) {
    return store.get(TABLE, id);
  }
  async function upsert(body, id) {
    const user = {
      name: body.name,
      username: body.username,
    };
    if (id) {
      //if has an authenticated account
      user.id = id;
    } else {
      //if doesn't has an authenticated account
      user.id = nanoid.nanoid();
    }
    if (body.password || body.username) {
      //to register process
      await auth.upsert({
        id: user.id,
        username: body.username,
        password: body.password,
      });
    }
    return store.upsert(TABLE, user);
  }

  return {
    list,
    get,
    upsert,
  };
};
