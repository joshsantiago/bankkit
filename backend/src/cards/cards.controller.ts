import { Controller, Get, Post, Patch, Delete, Param, Body, UseGuards, Request } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto, UpdateCardStatusDto } from './dto/update-card.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cards')
@UseGuards(JwtAuthGuard)
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Get()
  findAll(@Request() req) {
    return this.cardsService.findAll(req.user.id, req.user.role === 'admin');
  }

  @Post()
  create(@Request() req, @Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(req.user.id, createCardDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Request() req) {
    return this.cardsService.findOne(id, req.user.id, req.user.role === 'admin');
  }

  @Patch(':id')
  update(@Param('id') id: string, @Request() req, @Body() updateCardDto: UpdateCardDto) {
    return this.cardsService.update(id, req.user.id, updateCardDto, req.user.role === 'admin');
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Request() req, @Body() updateStatusDto: UpdateCardStatusDto) {
    return this.cardsService.updateStatus(id, req.user.id, updateStatusDto, req.user.role === 'admin');
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Request() req) {
    return this.cardsService.delete(id, req.user.id, req.user.role === 'admin');
  }

  @Post(':id/reset-spending')
  resetMonthlySpending(@Param('id') id: string, @Request() req) {
    return this.cardsService.resetMonthlySpending(id, req.user.id, req.user.role === 'admin');
  }

  @Get(':id/spending')
  getSpendingDetails(@Param('id') id: string, @Request() req) {
    return this.cardsService.getSpendingDetails(id, req.user.id, req.user.role === 'admin');
  }
}
