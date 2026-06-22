ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can create applications"
ON applications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can view applications"
ON applications
FOR SELECT
USING (true);

CREATE POLICY "Users can update applications"
ON applications
FOR UPDATE
USING (true);