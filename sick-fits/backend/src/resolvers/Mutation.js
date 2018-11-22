const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Mutations = {
  async createItem(parent, args, ctx, info) {
    // TODO: check if they are logged in

    const item = await ctx.db.mutation.createItem(
      {
        data: {
          ...args
        }
      },
      // makes sure that item is returned after creating item
      info
    );
    return item;
  },
  updateItem(parent, args, ctx, info) {
    // copy updates
    const updates = { ...args };
    // remove id from updates
    delete updates.id;
    // run the update method
    return ctx.db.mutation.updateItem({
      data: updates,
      where: { id: args.id }
    });
  },
  async deleteItem(parent, args, ctx, info) {
    const where = { id: args.id };
    // find the item
    const item = await ctx.db.query.item({ where }, `{id title}`);
    // check if they own that item or have the permissions
    // todo
    // delete it
    return ctx.db.mutation.deleteItem({ where }, info);
  },
  async signUp(parent, args, ctx, info) {
    args.email = args.email.toLowerCase();
    // hash the password
    const password = await bcrypt.hash(args.password, 10);

    const user = await ctx.db.mutation.createUser({
      data: {
        ...args,
        password,
        permissions: { set: ["USER"] }
      }
    });
    // create JWT for them
    const token = jwt.sign({ userId: user.id }, process.env.APP_SECRET);
    // set cookie on the response
    ctx.response.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 24 * 365 // one year cookie
    });
    return user;
  }
};

module.exports = Mutations;
