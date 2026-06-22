ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view notifications"
ON notifications
FOR SELECT
USING (true);

CREATE POLICY "System can create notifications"
ON notifications
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Users can update notifications"
ON notifications
FOR UPDATE
USING (true);