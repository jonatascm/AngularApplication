export class Client {
  public id: number;
  public name: string;
  public gender: string;
  public email: string;
  public birth: Date;
  public document: string;
  public fone: string;

  public constructor(init?: Partial<Client>) {
    Object.assign(this, init);
  }
}
