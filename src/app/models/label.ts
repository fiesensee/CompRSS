import {FeedSource} from './feedsource';
export class Label {
  constructor(
    public name: string,
    public feedSources: FeedSource[],
    public url: string,
    public id: number,
    public active
  ){}
}
