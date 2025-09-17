import { Module } from '@nestjs/common';
import { SignatureTypes } from './signature-types.service';
import { LazyLoadHandler } from './lazy-loader.service';

@Module({
  imports: [],
  providers: [SignatureTypes, LazyLoadHandler],
  exports: [SignatureTypes],
})
export class SignatureTypesModule {}
