import {Http, Response, HTTP_PROVIDERS} from 'angular2/http';
import {Component, Injectable, Inject} from 'angular2/core';

@Component({
  selector: 'app',
  templateUrl: './app/app.html',
  providers: [Http, HTTP_PROVIDERS]
})

@Injectable()
export class FeedSource {
  feed: string;
  name: string;
  url: string;
  constructor(@Inject(Http) private http: Http) {
    // http.get('http://www.heise.de/newsticker/heise-atom.xml').subscribe(res => this.target = res.text())
    this.test()
  }

  setFeedSource(name: string, url: string){
    this.name = name;
    this.url = url;
  }

  getFeed(){
    this.http.get(this.url).subscribe(res => this.feed = res.text())
  }

  test(){
    this.setFeedSource('test', 'http://heise.de/newsticker/heise-atoms.xml');
    this.getFeed();
  }

}
