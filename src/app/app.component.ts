import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @HostBinding('class.handsetPortrait') handsetPortrait = false;
  @HostBinding('class.handsetLandscape') handsetLandscape = false;
  @HostBinding('class.tabletPortrait') tabletPortrait = false;
  @HostBinding('class.tabletLandscape') tabletLandscape = false;
  @HostBinding('class.webPortrait') webPortrait = false;
  @HostBinding('class.webLandscape') webLandscape = false;


  constructor(breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletLandscape,
      Breakpoints.TabletPortrait,
      Breakpoints.WebLandscape,
      Breakpoints.WebPortrait
    ]).subscribe(result => {
      if (result.breakpoints['(max-width: 599px) and (orientation: portrait)']) {
        this.handsetPortrait = true;
        this.handsetLandscape = false;
        this.tabletPortrait = false;
        this.tabletLandscape = false;
        this.webPortrait = false;
        this.webLandscape = false;
      } else if (result.breakpoints['(max-width: 959px) and (orientation: landscape']) {
        this.handsetPortrait = false;
        this.handsetLandscape = true;
        this.tabletPortrait = false;
        this.tabletLandscape = false;
        this.webPortrait = false;
        this.webLandscape = false;
      } else if (result.breakpoints['(min-width: 600px) and (max-width: 839px) and (orientation: portrait)']) {
        this.handsetPortrait = false;
        this.handsetLandscape = false;
        this.tabletPortrait = true;
        this.tabletLandscape = false;
        this.webPortrait = false;
        this.webLandscape = false;
      } else if (result.breakpoints['(min-width: 840px) and (orientation: portrait)']) {
        this.handsetPortrait = false;
        this.handsetLandscape = false;
        this.tabletPortrait = false;
        this.tabletLandscape = true;
        this.webPortrait = false;
        this.webLandscape = false;
      } else if (result.breakpoints['(min-width: 960px) and (max-width: 1279px) and (orientation: landscape)']) {
        this.handsetPortrait = false;
        this.handsetLandscape = false;
        this.tabletPortrait = false;
        this.tabletLandscape = false;
        this.webPortrait = true;
        this.webLandscape = false;
      } else if (result.breakpoints['(min-width: 1280px) and (orientation: landscape)']) {
        this.handsetPortrait = false;
        this.handsetLandscape = false;
        this.tabletPortrait = false;
        this.tabletLandscape = false;
        this.webPortrait = false;
        this.webLandscape = true;
      }
    });
  }

  ngOnInit() {


  }


}
