import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Role } from '../../generated/prisma/client';

export class CreateUserDto {
  @ApiProperty({
    example: 'nuevo@techsolutions.com',
  })
  email: string;

  @ApiPropertyOptional({
    example: 'Nuevo Usuario',
  })
  name?: string;

  @ApiProperty({
    example: '123456',
  })
  password: string;

  @ApiPropertyOptional({
    example: '85555555',
  })
  telephone?: string;

  @ApiProperty({
    example: 1,
  })
  tenantId: number;

  @ApiPropertyOptional({
    enum: Role,
    example: Role.USER,
  })
  role?: Role;
}
