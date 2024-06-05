import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Character } from '../../models/characters.model';
import { CharactersServiceService } from '../../services/characters-service.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { log } from 'console';

@Component({
  selector: 'app-characters-component',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './characters-component.component.html',
  styleUrls: ['./characters-component.component.css']
})
export class CharactersComponentComponent implements OnInit {

  characters: Character[] = [];
  selectedCharacter: Character | null = null;
  offset: number = 0;
  limit: number = 20;
  isLoading: boolean = false;
  searchTerm: string = '';
  filteredCharacters: Character[] = [];


  constructor(private marvelService: CharactersServiceService, private cdr: ChangeDetectorRef) { }

  ngOnInit() { 
    this.getAllCharacters();
  }

  getAllCharacters() {
    this.isLoading = true;
    this.marvelService.getCharacters(this.limit, this.offset).subscribe(
      data => {
        this.characters = [...this.characters, ...data];
        this.filteredCharacters = this.characters; 
        this.offset += this.limit;
        this.isLoading = false;
        this.cdr.detectChanges(); 
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

  onSearchChange(searchValue: string): void {
    console.log('Search Value:', searchValue); 
    if (searchValue) {
      this.filteredCharacters = this.characters.filter(character =>
        character.name.toLowerCase().includes(searchValue.toLowerCase())
      );
    } else {
      this.filteredCharacters = this.characters;
    }
    console.log('Filtered Characters:', this.filteredCharacters); 
    this.cdr.detectChanges(); 
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

