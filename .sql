create table users (
	id char(36) not null primary key,
    username varchar(50) not null unique,
    hashPassword text not null,
    email varchar(255) not null unique,
    created_at DATETIME default current_timestamp
);

create table notes (
	id char(36) not null primary key,
    userId char(36) not null,
    title varchar(255),
    description text,
    isDeleted boolean default false,
    isPinned boolean default false,
    deleted_at TIMESTAMP NULL DEFAULT NULL,
    created_at DATETIME default current_timestamp,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    foreign key (userId) references users(id)
    ON DELETE CASCADE
);

create table tokens (
	id char(36) not null primary key,
    userId char(36) not null,
    refreshToken text not null,
    created_at DATETIME default current_timestamp,
    expired_at DATETIME not null,
    
    foreign key (userId) references users(id)
    ON DELETE CASCADE
);

CREATE INDEX idx_notes_user_deleted_created
ON notes(userId, isDeleted, created_at DESC);

CREATE INDEX idx_notes_user_deleted_pinned_created
ON notes(userId, isDeleted, isPinned, created_at DESC);

CREATE INDEX idx_notes_user_id
ON notes(userId, id);

CREATE INDEX idx_tokens_refresh_expired
ON tokens(refreshToken(255), expired_at);

CREATE INDEX idx_tokens_refresh_user
ON tokens(refreshToken(255), userId);
