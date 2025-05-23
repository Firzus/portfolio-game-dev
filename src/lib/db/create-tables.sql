-- Create tables for portfolio database

CREATE TABLE IF NOT EXISTS "users" (
    "id" serial PRIMARY KEY NOT NULL,
    "email" varchar(255) NOT NULL,
    "password_hash" varchar(255) NOT NULL,
    "name" varchar(255) NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    CONSTRAINT "users_email_unique" UNIQUE("email")
);

CREATE TABLE IF NOT EXISTS "personal_info" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar(255) NOT NULL,
    "title" varchar(255) NOT NULL,
    "bio" text NOT NULL,
    "email" varchar(255) NOT NULL,
    "location" varchar(255) NOT NULL,
    "avatar_url" varchar(500),
    "resume_url" varchar(500),
    "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "social_links" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar(255) NOT NULL,
    "url" varchar(500) NOT NULL,
    "icon" varchar(50) NOT NULL,
    "order" integer DEFAULT 0 NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "skills" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar(255) NOT NULL,
    "level" integer NOT NULL,
    "category" varchar(50) NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "projects" (
    "id" serial PRIMARY KEY NOT NULL,
    "title" varchar(255) NOT NULL,
    "description" text NOT NULL,
    "long_description" text,
    "image_url" varchar(500),
    "technologies" text[] NOT NULL,
    "category" varchar(50) NOT NULL,
    "github_url" varchar(500),
    "demo_url" varchar(500),
    "youtube_url" varchar(500),
    "website_url" varchar(500),
    "featured" boolean DEFAULT false NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL,
    "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "experiences" (
    "id" serial PRIMARY KEY NOT NULL,
    "company" varchar(255) NOT NULL,
    "position" varchar(255) NOT NULL,
    "description" text NOT NULL,
    "technologies" text[] NOT NULL,
    "start_date" date NOT NULL,
    "end_date" date,
    "logo_url" varchar(500),
    "location" varchar(255) NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "education" (
    "id" serial PRIMARY KEY NOT NULL,
    "institution" varchar(255) NOT NULL,
    "degree" varchar(255) NOT NULL,
    "field" varchar(255) NOT NULL,
    "description" text,
    "start_date" date NOT NULL,
    "end_date" date NOT NULL,
    "logo_url" varchar(500),
    "location" varchar(255) NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "contact_messages" (
    "id" serial PRIMARY KEY NOT NULL,
    "name" varchar(255) NOT NULL,
    "email" varchar(255) NOT NULL,
    "subject" varchar(255) NOT NULL,
    "message" text NOT NULL,
    "newsletter" boolean DEFAULT false NOT NULL,
    "read" boolean DEFAULT false NOT NULL,
    "created_at" timestamp DEFAULT now() NOT NULL
);
