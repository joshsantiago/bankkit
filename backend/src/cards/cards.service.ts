import { Injectable, BadRequestException, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../entities/card.entity';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto, UpdateCardStatusDto } from './dto/update-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardRepository: Repository<Card>,
  ) {}

  /**
   * Generate a masked card number for display (last 4 digits only)
   */
  private maskCardNumber(cardNumber: string): string {
    const lastFour = cardNumber.slice(-4);
    return `**** **** **** ${lastFour}`;
  }

  /**
   * Generate a unique card number (for virtual cards)
   */
  private generateVirtualCardNumber(): string {
    const prefix = '4'; // Visa prefix
    const randomDigits = Math.floor(Math.random() * 1000000000000000)
      .toString()
      .padStart(15, '0');
    return prefix + randomDigits;
  }

  /**
   * List all cards for a user
   */
  async findAll(userId: string, isAdmin: boolean) {
    if (isAdmin) {
      const cards = await this.cardRepository.find({
        order: { createdAt: 'DESC' },
      });
      return { success: true, data: cards };
    }

    const cards = await this.cardRepository.find({
      where: { userId },
      order: { createdAt: 'DESC' },
    });
    return { success: true, data: cards };
  }

  /**
   * Get single card details
   */
  async findOne(id: string, userId: string, isAdmin: boolean) {
    const card = await this.cardRepository.findOne({ where: { id } });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (!isAdmin && card.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    return { success: true, data: card };
  }

  /**
   * Create a new card
   */
  async create(userId: string, createCardDto: CreateCardDto) {
    // Validate card number length
    if (createCardDto.cardNumber.length < 13 || createCardDto.cardNumber.length > 19) {
      throw new BadRequestException('Card number must be 13-19 digits');
    }

    // For virtual cards, generate a card number
    const cardNumber = createCardDto.isVirtual
      ? this.generateVirtualCardNumber()
      : createCardDto.cardNumber;

    // Check for duplicate card numbers (for physical cards)
    if (!createCardDto.isVirtual) {
      const existingCard = await this.cardRepository.findOne({
        where: { cardNumber },
      });

      if (existingCard) {
        throw new BadRequestException('This card number is already registered');
      }
    }

    const card = this.cardRepository.create({
      userId,
      name: createCardDto.name,
      cardNumber,
      expiry: createCardDto.expiry,
      cvv: createCardDto.cvv,
      brand: createCardDto.brand,
      cardType: createCardDto.cardType,
      isVirtual: createCardDto.isVirtual || false,
      dailyLimit: createCardDto.dailyLimit || 5000,
      monthlyLimit: createCardDto.monthlyLimit || 20000,
      color: createCardDto.color,
      accountId: createCardDto.accountId,
    });

    await this.cardRepository.save(card);

    return {
      success: true,
      data: card,
      message: `${createCardDto.isVirtual ? 'Virtual' : 'Physical'} card created successfully`,
    };
  }

  /**
   * Update card details
   */
  async update(id: string, userId: string, updateCardDto: UpdateCardDto, isAdmin: boolean) {
    const card = await this.cardRepository.findOne({ where: { id } });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (!isAdmin && card.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    Object.assign(card, updateCardDto);
    await this.cardRepository.save(card);

    return {
      success: true,
      data: card,
      message: 'Card updated successfully',
    };
  }

  /**
   * Update card status (freeze, unfreeze, cancel)
   */
  async updateStatus(id: string, userId: string, updateStatusDto: UpdateCardStatusDto, isAdmin: boolean) {
    const card = await this.cardRepository.findOne({ where: { id } });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (!isAdmin && card.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    // Prevent changing status of already cancelled cards
    if (card.status === 'Cancelled' && updateStatusDto.status !== 'Cancelled') {
      throw new BadRequestException('Cancelled cards cannot be reactivated');
    }

    card.status = updateStatusDto.status;
    await this.cardRepository.save(card);

    return {
      success: true,
      data: card,
      message: `Card ${updateStatusDto.status.toLowerCase()} successfully`,
    };
  }

  /**
   * Delete a card
   */
  async delete(id: string, userId: string, isAdmin: boolean) {
    const card = await this.cardRepository.findOne({ where: { id } });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (!isAdmin && card.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    await this.cardRepository.delete(id);

    return {
      success: true,
      message: 'Card deleted successfully',
    };
  }

  /**
   * Reset card spending limit (monthly)
   */
  async resetMonthlySpending(id: string, userId: string, isAdmin: boolean) {
    const card = await this.cardRepository.findOne({ where: { id } });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (!isAdmin && card.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    card.currentSpending = 0;
    await this.cardRepository.save(card);

    return {
      success: true,
      data: card,
      message: 'Monthly spending reset successfully',
    };
  }

  /**
   * Get card spending details
   */
  async getSpendingDetails(id: string, userId: string, isAdmin: boolean) {
    const card = await this.cardRepository.findOne({ where: { id } });

    if (!card) {
      throw new NotFoundException('Card not found');
    }

    if (!isAdmin && card.userId !== userId) {
      throw new ForbiddenException('Access denied');
    }

    const dailyRemaining = Math.max(0, Number(card.dailyLimit) - Number(card.currentSpending));
    const monthlyRemaining = Math.max(0, Number(card.monthlyLimit) - Number(card.currentSpending));
    const dailyPercentage = Math.round((Number(card.currentSpending) / Number(card.dailyLimit)) * 100);
    const monthlyPercentage = Math.round((Number(card.currentSpending) / Number(card.monthlyLimit)) * 100);

    return {
      success: true,
      data: {
        cardId: card.id,
        currentSpending: Number(card.currentSpending),
        daily: {
          limit: Number(card.dailyLimit),
          spent: Number(card.currentSpending),
          remaining: dailyRemaining,
          percentage: dailyPercentage,
        },
        monthly: {
          limit: Number(card.monthlyLimit),
          spent: Number(card.currentSpending),
          remaining: monthlyRemaining,
          percentage: monthlyPercentage,
        },
      },
    };
  }
}
