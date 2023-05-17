db.createUser({
  user: "the_username",
  pwd: "the_password",
  roles: [
    {
      role: "dbOwner",
      db: "the_database",
    },
    {
      role: "dbOwner",
      db: "test",
    },
  ],
});
