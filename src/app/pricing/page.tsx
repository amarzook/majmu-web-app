import Pricing from '@/src/components/ui/Pricing/Pricing';
import { createClient } from '@/src/lib/utils/supabase/server';
import {
  getProducts,
  getSubscription,
  getUser
} from '@/src/lib/utils/supabase/queries';

export default async function PricingPage() {
  const supabase = createClient();
  const [user, products, subscription] = await Promise.all([
    getUser(supabase),
    getProducts(supabase),
    getSubscription(supabase)
  ]);

  return (
    <Pricing
      user={user}
      products={products ?? []}
      subscription={subscription}
    />
  );
}