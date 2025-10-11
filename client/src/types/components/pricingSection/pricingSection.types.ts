// Declare the type of pricing card data array
export type IPricingCardData = {
    id: string;
    type: number;
    name: string;
    price: string;
    strikedPrice?: number;
    buttonGradient: string[];
    validity: string;
    highlightColor: string;
    subTitle: string;
    features: IPricingFeatures[]
}

// Declare the type for the elements of pricingCardData.features
export type IPricingFeatures = {
    id: string;
    feature: string;
    isAvailable: boolean;
}