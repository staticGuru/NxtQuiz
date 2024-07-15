import { Entity } from '@backend/core/entities/entity';

export interface AuthSessionProps {
  id: string;
  ip_address: string;
  timestamp: number;
  data: Buffer;
}

export class AuthSession extends Entity<AuthSessionProps> {
  get ip_address() {
    return this.props.ip_address;
  }

  get data() {
    return this.props.data;
  }

  static create(props: AuthSessionProps) {
    const user = new AuthSession(props);
    return user;
  }
}
