import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
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
    videosApp : any[] = [];
    pagedVideos: string[] = [];
    app!: Appartement;
    pageSize = 1;
    currentPage = 0;

    constructor(private videoService: VideoAppService,
      private appService : AppartementService,
      private router : Router
    ){}

    ngOnInit(): void {
       this.getVideos();
       this.updatePagedVideos();
    }

    getVideos(){
        this.app=this.appService.appartement;
        this.videos=this.videoService.videos;
        
        this.videos?.forEach(v=>{
           console.log(v)
           let index= v.video.indexOf("assets");
           this.videosApp.push(v.video.substring(index)); 
        });
        
    }

    onPageChange(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.updatePagedVideos();
  }

  updatePagedVideos() {
    const start = this.currentPage * this.pageSize;
    const end = start + this.pageSize;
    this.pagedVideos = this.videosApp.slice(start, end);
  }

    goBack(){
        this.router.navigate(['home']);
    }
}
