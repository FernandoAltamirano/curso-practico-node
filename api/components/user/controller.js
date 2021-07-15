const nanoid = require("nanoid");
const auth = require("../auth/index.js");

const TABLE = "user";

module.exports = function (injectedStore) {
  let store = injectedStore;
  if (!store) {
    store = require("../../../store/dummy.js");
  }
  function list() {
    return store.list(TABLE);
  }
  function get(id) {
    return store.get(TABLE, id);
  }
  async function upsert(body) {
    const user = {
      name: body.name,
      username: body.username,
    };
    if (body.id) {
      user.id = body.id;
    } else {
      user.id = nanoid.nanoid();
    }
    if (body.password || body.username) {
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
