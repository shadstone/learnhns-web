export const MARKET_API_BASE = 'https://market.learnhns.com/api/v2/auctions';

export type MarketListing = {
  name: string;
  buyable?: boolean | null;
  pending?: boolean | null;
  expectedPrice?: number | null;
  lockingTxHash?: string | null;
  bids?: Array<{ price?: number | null }>;
};

/** Live fixed-price listing with an on-chain proof (buyable on market.learnhns.com). */
export function isBuyableListing(listing: MarketListing): boolean {
  return listing.pending !== true && Boolean(listing.lockingTxHash);
}

/** Inbound listing waiting for lockup / finalization. */
export function isPendingListing(listing: MarketListing): boolean {
  return listing.pending === true;
}

export function getListingPrice(listing: MarketListing): number | null {
  if (listing.expectedPrice) return listing.expectedPrice;
  const bidPrice = listing.bids?.[0]?.price;
  return bidPrice ?? null;
}

export function formatListingPrice(price: number | null | undefined): string {
  if (!price) return 'Make Offer';
  return (price / 1_000_000).toLocaleString() + ' HNS';
}

export async function fetchMarketAuctions(perPage = 100): Promise<MarketListing[]> {
  const auctions: MarketListing[] = [];
  let page = 1;
  let total = Infinity;

  while (auctions.length < total) {
    const res = await fetch(`${MARKET_API_BASE}?page=${page}&per_page=${perPage}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const batch: MarketListing[] = data.auctions || [];
    total = data.total ?? batch.length;
    auctions.push(...batch);
    if (!batch.length || batch.length < perPage) break;
    page += 1;
  }

  return auctions;
}