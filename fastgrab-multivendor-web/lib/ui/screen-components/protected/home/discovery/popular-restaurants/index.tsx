"use client"
import CuisinesSliderCard from "@/lib/ui/useable-components/cuisines-slider-card";
// hook
import useMostOrderedRestaurants from "@/lib/hooks/useMostOrderedRestaurants";
// loading skeleton
import CuisinesSliderSkeleton from "@/lib/ui/useable-components/custom-skeletons/cuisines.slider.skeleton";
import { useTranslations } from "next-intl";

function PopularRestaurants() {
  const t = useTranslations()
  const { error, loading, restaurantsData } = useMostOrderedRestaurants();

  if (loading) {
    return <CuisinesSliderSkeleton />;
  }

  if (error) {
    return;
  }
  

  return (
    <CuisinesSliderCard
      title={t('DiscoveryPage.popularrest')}
      data={restaurantsData || []}
      showLogo={true}
      cuisines={false}
    />
  );
}

export default PopularRestaurants;
