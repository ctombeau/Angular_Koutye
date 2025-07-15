import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Appartement } from 'src/app/models/appartement.model';
import { AppartementService } from 'src/app/services/appartement.service';
import { VideoAppService } from 'src/app/services/video-app.service';

@Component({
  selector: 'app-appartement-detail',
  templateUrl: './appartement-detail.component.html',
  styleUrls: ['./appartement-detail.component.scss']
})
export class AppartementDetailComponent implements OnInit{
    videos : any[] = [];
    app!: Appartement;

    constructor(private videoService: VideoAppService,
      private appService : AppartementService,
      private router : Router
    ){}

    ngOnInit(): void {
       this.getVideos();
    }

    getVideos(){
        this.app=this.appService.appartement;
        this.videos=this.videoService.videos;
    }

    goBack(){
        this.router.navigate(['home']);
    }
}
