import { MediaSearchResult } from './media-search-result';

export interface MediaSearch {
    searchType: string;
    expression: string;
    results: MediaSearchResult[];
    errorMessage: string;
}
