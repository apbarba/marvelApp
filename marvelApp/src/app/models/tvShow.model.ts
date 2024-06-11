export interface SeriesDataWrapper {
    code: number,
    status :string,
    copyright :string, 
    attributionText :string, 
    attributionHTML: string, 
    data:SeriesDataContainer, 
    etag : string, 
    }


export interface  SeriesDataContainer {
    offset :number, 
    limit: number,
    total: number,
    count: number,
    results: Series[]
    }
export interface  Series {
    id: number
    title : string
    description: string 
    resourceURI: string
    urls: Url[] 
    startYear: number 
    endYear : number 
    rating :string
    modified : Date
    thumbnail : Image
    comics: ComicList 
    stories: StoryList,
    events: EventList
    characters: CharacterList
    creators: CreatorList
    next: SeriesSummary
    previous: SeriesSummary
    }
export interface Url {
    type: string
    url: string
    }
export interface Image {
    path : string
    extension: string
    }
 export interface   ComicList {
    available: number, 
    returned: number,  
    collectionURI: string
    items: ComicSummary[]
    }
 export interface   ComicSummary {
    resourceURI :string
    name :string
    }
 export interface   StoryList {
    available : number
    returned : number
    collectionURI :string
    items : StorySummary[]
    }
 export interface   StorySummary {
    resourceURI:string
    name:string
    type:string
    }
 export interface   EventList {
    available : number
    returned : number
    collectionURI :string
    items : EventSummary[]
    }
 export interface   EventSummary {
    resourceURI: string
    name :string
    }
export interface    CharacterList {
    available : number
    returned : number
    collectionURI :string
    items : CharacterSummary[]
    }
export interface    CharacterSummary {
    resourceURI : string
    name :string
    role :string
    }
export interface    CreatorList {
    available : number
    returned : number
    collectionURI :string
    items : CreatorSummary[]
    }
export interface    CreatorSummary {
    resourceURI : string
    name : string
    role : string
    }
 export interface  SeriesSummary {
    resourceURI :string
    name :string
    }