
export const detectMarketplace = (url: string): string | null => {
  const lowercaseUrl = url.toLowerCase();
  
  if (lowercaseUrl.includes("ozon.ru")) {
    return "Ozon";
  }
  
  if (lowercaseUrl.includes("wildberries.ru")) {
    return "Wildberries";
  }
  
  if (lowercaseUrl.includes("aliexpress.com") || lowercaseUrl.includes("aliexpress.ru")) {
    return "AliExpress";
  }
  
  return null;
};

export const getMarketplaceColor = (marketplace: string): string => {
  switch (marketplace.toLowerCase()) {
    case "ozon":
      return "bg-blue-600";
    case "wildberries":
      return "bg-purple-600";
    case "aliexpress":
      return "bg-orange-600";
    default:
      return "bg-gray-600";
  }
};

export const getMarketplaceLogo = (marketplace: string): string => {
  // In a real app, these would be actual image paths
  switch (marketplace.toLowerCase()) {
    case "ozon":
      return "ozon-logo.png";
    case "wildberries":
      return "wildberries-logo.png";
    case "aliexpress":
      return "aliexpress-logo.png";
    default:
      return "generic-store.png";
  }
};
