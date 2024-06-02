import { Component, OnInit } from '@angular/core';
import { Character } from '../../models/characters.model';
import { CharactersServiceService } from '../../services/characters-service.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-characters-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './characters-component.component.html',
  styleUrls: ['./characters-component.component.css']
})
export class CharactersComponentComponent implements OnInit {

  characters: Character[] = [];
  selectedCharacter: Character | null = null;
  offset: number = 0;
  limit: number = 20;
  isLoading: boolean = false;

  constructor(private marvelService: CharactersServiceService) { }

  ngOnInit() { 
    this.getAllCharacters();
  }

  getAllCharacters() {
    this.isLoading = true;
    this.marvelService.getCharacters(this.limit, this.offset).subscribe(
      data => {
        this.characters = [...this.characters, ...data];
        this.offset += this.limit;
        this.isLoading = false;
      },
      error => {
        console.error('Error fetching characters:', error);
        this.isLoading = false;
      }
    );
  }

  loadMoreCharacters() {
    this.getAllCharacters();
  }

  getCharacterDetails(id: number) {
    this.marvelService.getCharacterDetails(id).subscribe(
      data => {
        this.selectedCharacter = data;
      },
      error => console.error('Error fetching character details:', error)
    );
  }

  closeDetails() {
    this.selectedCharacter = null;
  }
}

