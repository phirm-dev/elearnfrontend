import { Component, AfterViewInit, Input, OnDestroy, OnChanges} from '@angular/core';
import videojs from 'video.js';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.css']
})
export class VideoPlayerComponent implements AfterViewInit, OnDestroy, OnChanges {
  public vjs: videojs.Player;
  @Input() urlVideo: string;
  @Input() urlPoster: string;
  @Input() videoTitle: string;

  constructor() { }

  ngOnChanges() {
    this.vjs.src(this.urlVideo);
    this.vjs.play();
  }

  ngAfterViewInit() {
    const options = {
      'sources' : [{
        'src' : this.urlVideo,
        }
      ],
      'controls' : true,
      'poster' : this.urlPoster
    };
    this.vjs = videojs('my-player', options);
    this.vjs.addClass('vjs-matrix');
  }

  ngOnDestroy() {
    this.vjs.dispose();
  }

}
