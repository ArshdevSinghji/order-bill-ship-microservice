import { Controller, Get } from '@nestjs/common';
import { BillingRetrieveService } from './billing-retrieve.service';

@Controller('billing')
export class BillingRetrieveController {
    constructor(private readonly billingRetrieveService: BillingRetrieveService) {}

    @Get('accounts')
    async getAccounts() {
        return await this.billingRetrieveService.getAccounts();
    }
}
