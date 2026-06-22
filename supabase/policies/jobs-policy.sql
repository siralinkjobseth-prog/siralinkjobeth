ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view jobs"
ON jobs
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert jobs"
ON jobs
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can update jobs"
ON jobs
FOR UPDATE
USING (true);

CREATE POLICY "Admins can delete jobs"
ON jobs
FOR DELETE
USING (true);