db.createUser(
    {
        user: "Artem",
        pwd: "qwerty",
        roles: [
            {
                role: "readWrite",
                db: "nest"
            }
        ]
    }
);