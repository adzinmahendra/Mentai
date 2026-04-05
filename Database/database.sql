create table users (
  id uuid primary key default uuid_generate_v4(),
  name text,
  email text unique,
  password text
);

create table orders (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid,
  total int,
  status text,
  created_at timestamp default now()
);