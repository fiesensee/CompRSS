export class FeedSource {
  public active = false;
  constructor(
    public name: string,
    public sourceUrl: string,
    public url: string,
    public id: number
  ) {}
}
