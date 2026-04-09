/*
  # Create Bookings Table

  ## Summary
  Creates the bookings table to store wedding consultation requests submitted through the website.

  ## New Tables
  - `bookings`
    - `id` (uuid, primary key) - Unique identifier
    - `name` (text) - Client's full name
    - `email` (text) - Contact email address
    - `phone` (text) - Contact phone number
    - `wedding_date` (date, nullable) - Planned wedding date
    - `wedding_type` (text, nullable) - Style preference (Royal, Traditional, Modern Elegant)
    - `guest_count` (text, nullable) - Approximate guest count
    - `message` (text, nullable) - Additional notes or requirements
    - `created_at` (timestamptz) - Submission timestamp

  ## Security
  - RLS enabled on bookings table
  - INSERT policy allows anyone to submit a booking (public form)
  - SELECT/UPDATE/DELETE restricted to service role only (admin access)

  ## Notes
  1. No authentication required for booking submission (public consultation form)
  2. Admins manage bookings via Supabase dashboard with service role key
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  wedding_date date,
  wedding_type text DEFAULT '',
  guest_count text DEFAULT '',
  message text DEFAULT '',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit a booking"
  ON bookings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (
    name IS NOT NULL AND
    email IS NOT NULL AND
    phone IS NOT NULL AND
    length(name) > 0 AND
    length(email) > 0 AND
    length(phone) > 0
  );
