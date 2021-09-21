CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username varchar(128) NOT NULL,
    email varchar NOT NULL UNIQUE,
    password varchar NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
);

-- In order for the queries to work as formatted: 
-- SET search_path = schema_name, user_name, public

-- To make updated_at change automatically:

-- CREATE OR REPLACE FUNCTION trigger_set_timestamp()
-- RETURNS TRIGGER AS $$
-- BEGIN
--   NEW.updated_at = NOW();
--   RETURN NEW;
-- END;
-- $$ LANGUAGE plpgsql;

-- CREATE TRIGGER set_timestamp
-- BEFORE UPDATE ON users
-- FOR EACH ROW
-- EXECUTE PROCEDURE trigger_set_timestamp();

