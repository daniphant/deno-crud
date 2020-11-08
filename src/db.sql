CREATE TABLE "User" (
    "id" SERIAL PRIMARY KEY,
    "username" varchar(128) NOT NULL,
    "email" varchar NOT NULL UNIQUE,
    "password" varchar NOT NULL,
    "created_at" timestamp,
    "updated_at" timestamp
);