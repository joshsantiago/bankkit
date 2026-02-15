import api from './api';

export interface Card {
  id: string;
  userId: string;
  accountId?: string;
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  brand: 'Visa' | 'Mastercard' | 'Amex' | 'Discover';
  cardType: 'Debit' | 'Credit';
  status: 'Active' | 'Frozen' | 'Cancelled' | 'Expired';
  isVirtual: boolean;
  dailyLimit: number;
  monthlyLimit: number;
  currentSpending: number;
  color?: string;
  designUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCardData {
  name: string;
  cardNumber: string;
  expiry: string;
  cvv: string;
  brand: 'Visa' | 'Mastercard' | 'Amex' | 'Discover';
  cardType: 'Debit' | 'Credit';
  isVirtual?: boolean;
  dailyLimit?: number;
  monthlyLimit?: number;
  accountId?: string;
  color?: string;
}

export interface UpdateCardData {
  name?: string;
  brand?: 'Visa' | 'Mastercard' | 'Amex' | 'Discover';
  cardType?: 'Debit' | 'Credit';
  isVirtual?: boolean;
  dailyLimit?: number;
  monthlyLimit?: number;
  color?: string;
}

export interface UpdateCardStatusData {
  status: 'Active' | 'Frozen' | 'Cancelled';
}

export interface SpendingDetails {
  cardId: string;
  currentSpending: number;
  daily: {
    limit: number;
    spent: number;
    remaining: number;
    percentage: number;
  };
  monthly: {
    limit: number;
    spent: number;
    remaining: number;
    percentage: number;
  };
}

export interface CardResponse<T = Card> {
  success: boolean;
  data: T;
  message?: string;
}

export const cardService = {
  /**
   * Get all cards for the authenticated user
   */
  async getCards(): Promise<Card[]> {
    const response = await api.get<CardResponse<Card[]>>('/cards');
    return response.data.data;
  },

  /**
   * Get a specific card by ID
   */
  async getCard(id: string): Promise<Card> {
    const response = await api.get<CardResponse>(`/cards/${id}`);
    return response.data.data;
  },

  /**
   * Create a new card
   */
  async createCard(data: CreateCardData): Promise<Card> {
    const response = await api.post<CardResponse>('/cards', data);
    return response.data.data;
  },

  /**
   * Update card details
   */
  async updateCard(id: string, data: UpdateCardData): Promise<Card> {
    const response = await api.patch<CardResponse>(`/cards/${id}`, data);
    return response.data.data;
  },

  /**
   * Update card status (freeze, unfreeze, cancel)
   */
  async updateCardStatus(id: string, data: UpdateCardStatusData): Promise<Card> {
    const response = await api.patch<CardResponse>(`/cards/${id}/status`, data);
    return response.data.data;
  },

  /**
   * Delete a card
   */
  async deleteCard(id: string): Promise<{ success: boolean; message: string }> {
    const response = await api.delete<{ success: boolean; message: string }>(`/cards/${id}`);
    return response.data;
  },

  /**
   * Reset monthly spending for a card
   */
  async resetMonthlySpending(id: string): Promise<Card> {
    const response = await api.post<CardResponse>(`/cards/${id}/reset-spending`, {});
    return response.data.data;
  },

  /**
   * Get detailed spending information for a card
   */
  async getSpendingDetails(id: string): Promise<SpendingDetails> {
    const response = await api.get<CardResponse<SpendingDetails>>(`/cards/${id}/spending`);
    return response.data.data;
  },

  /**
   * Get spending percentage for visualization
   */
  getSpendingPercentage(spending: number, limit: number): number {
    return Math.min(100, Math.round((spending / limit) * 100));
  },

  /**
   * Get spending status color
   */
  getSpendingStatusColor(percentage: number): 'green' | 'yellow' | 'red' {
    if (percentage >= 80) return 'red';
    if (percentage >= 50) return 'yellow';
    return 'green';
  },

  /**
   * Format card number for display
   */
  formatCardNumber(cardNumber: string): string {
    const lastFour = cardNumber.slice(-4);
    return `**** **** **** ${lastFour}`;
  },

  /**
   * Format expiry date
   */
  formatExpiryDate(expiry: string): string {
    return expiry;
  },

  /**
   * Get card brand logo (for UI purposes)
   */
  getCardBrandLogo(brand: string): string {
    const logos: Record<string, string> = {
      'Visa': '🏦',
      'Mastercard': '💳',
      'Amex': '💎',
      'Discover': '🔍',
    };
    return logos[brand] || '💳';
  },

  /**
   * Filter cards by type
   */
  filterByCardType(cards: Card[], cardType: 'Debit' | 'Credit'): Card[] {
    return cards.filter(card => card.cardType === cardType);
  },

  /**
   * Filter cards by status
   */
  filterByStatus(cards: Card[], status: 'Active' | 'Frozen' | 'Cancelled' | 'Expired'): Card[] {
    return cards.filter(card => card.status === status);
  },

  /**
   * Sort cards by creation date
   */
  sortByDate(cards: Card[], descending = true): Card[] {
    return [...cards].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return descending ? dateB - dateA : dateA - dateB;
    });
  },

  /**
   * Get active cards only
   */
  getActiveCards(cards: Card[]): Card[] {
    return cards.filter(card => card.status === 'Active');
  },

  /**
   * Calculate total available credit
   */
  calculateTotalCredit(cards: Card[]): number {
    return cards
      .filter(card => card.cardType === 'Credit' && card.status === 'Active')
      .reduce((total, card) => total + (card.monthlyLimit - card.currentSpending), 0);
  },

  /**
   * Get card spending summary
   */
  getSpendingSummary(cards: Card[]): {
    totalSpending: number;
    activeCardCount: number;
    frozenCardCount: number;
    avgSpendingPerCard: number;
  } {
    const active = cards.filter(card => card.status === 'Active');
    const frozen = cards.filter(card => card.status === 'Frozen');
    const totalSpending = cards.reduce((sum, card) => sum + card.currentSpending, 0);

    return {
      totalSpending,
      activeCardCount: active.length,
      frozenCardCount: frozen.length,
      avgSpendingPerCard: active.length > 0 ? totalSpending / active.length : 0,
    };
  },
};
