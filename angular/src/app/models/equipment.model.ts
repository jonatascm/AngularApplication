export class Equipment {
  public id: number;
  public description: string;
  public weight: string;
  public muscles: string[];

  public constructor(init?: Partial<Equipment>) {
    Object.assign(this, init);
  }
}
