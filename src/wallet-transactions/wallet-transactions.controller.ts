import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateWalletTransactionDto } from './dto/create-wallet-transaction.dto';
import { UpdateWalletTransactionDto } from './dto/update-wallet-transaction.dto';
import { WalletTransactionsService } from './wallet-transactions.service';

@Controller('wallet-transactions')
export class WalletTransactionsController {
  constructor(
    private readonly walletTransactionsService: WalletTransactionsService,
  ) {}

  @Post()
  create(@Body() createWalletTransactionDto: CreateWalletTransactionDto) {
    return this.walletTransactionsService.create(createWalletTransactionDto);
  }

  @Get()
  findAll(@Query('userId') userId?: string, @Query('type') type?: string) {
    return this.walletTransactionsService.findAll({ userId, type });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walletTransactionsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateWalletTransactionDto: UpdateWalletTransactionDto,
  ) {
    return this.walletTransactionsService.update(id, updateWalletTransactionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walletTransactionsService.remove(id);
  }
}
