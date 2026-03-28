
-- No public access - all managed via edge functions with service role key
CREATE POLICY "No public access to paypal_credentials" ON public.paypal_credentials FOR ALL USING (false);
CREATE POLICY "No public access to customers" ON public.customers FOR ALL USING (false);
CREATE POLICY "No public access to transactions" ON public.transactions FOR ALL USING (false);
