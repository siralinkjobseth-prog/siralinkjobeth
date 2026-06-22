ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
ON users
FOR SELECT
USING (true);

CREATE POLICY "Users can insert own profile"
ON users
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update own profile"
ON users
FOR UPDATE
USING (true);