
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view admins"
ON admins
FOR SELECT
USING (true);

CREATE POLICY "Admins can insert admins"
ON admins
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can update admins"
ON admins
FOR UPDATE
USING (true);

CREATE POLICY "Admins can delete admins"
ON admins
FOR DELETE
USING (true);
