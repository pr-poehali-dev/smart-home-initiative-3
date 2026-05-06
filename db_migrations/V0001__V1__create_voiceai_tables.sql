
CREATE TABLE IF NOT EXISTS topics (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS clients (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'pending',
    invite_token TEXT UNIQUE,
    password_hash TEXT,
    invited_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS recordings (
    id SERIAL PRIMARY KEY,
    client_id INTEGER NOT NULL REFERENCES clients(id),
    topic_id INTEGER NOT NULL REFERENCES topics(id),
    duration TEXT,
    file_url TEXT,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS compilations (
    id SERIAL PRIMARY KEY,
    topic_id INTEGER NOT NULL REFERENCES topics(id),
    duration TEXT,
    file_url TEXT,
    sources_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);
