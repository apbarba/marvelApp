import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Series } from '../../models/tvShow.model';
import { TvShowService } from '../../services/tv-show.service';

@Component({
  selector: 'app-tv-show',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './tv-show.component.html',
  styleUrl: './tv-show.component.css'
})
export class TvShowComponent implements OnInit{

  series: Series[] = [];
  isLoading: boolean = false;
  limit: number = 20;
  offset: number = 0
  filteredSeries: Series[] = []
  expandedSeries: any = null;


  constructor(private marvelService: TvShowService, private cdr: ChangeDetectorRef){}

  ngOnInit(): void {
    this.getAllSeries();
  }

  getAllSeries(){
    this.isLoading = true;
    this.marvelService.getSeries(this.limit, this.offset).subscribe(
      data => {
        this.series = [...this.series, ...data];
        this.filteredSeries = this.series;
        this.offset += this.limit;
        this.isLoading = false;
        this.cdr.detectChanges();
      },
      error => {
        console.error('Error fetching series:', error);
        this.isLoading = false
      }
    );

  }

  onMouseEnter(series: Series): void {
    this.expandedSeries = series;
  }

  onMouseLeave(): void {
    this.expandedSeries = null;
  }

  toggleExpandedSeries(series: any): void {
    this.expandedSeries = this.expandedSeries === series ? null : series;
  }

}
