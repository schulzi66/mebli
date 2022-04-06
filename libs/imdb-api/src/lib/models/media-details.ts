export interface MediaDetails {
    id: string;
    title: string;
    description?: string;
    originalTitle?: string;
    fullTitle?: string;
    type?: MediaType;
    year?: string;
    image?: string;
    releaseDate?: Date;
    runtimeMins?: string;
    runtimeStr?: string;
    plot?: string;
    plotLocal?: string;
    plotLocalIsRtl?: boolean;
    awards?: string;
    directors?: string;
    directorList?: CompanyListElement[];
    writers?: string;
    writerList?: CompanyListElement[];
    stars?: string;
    starList?: CompanyListElement[];
    actorList?: ActorList[];
    fullCast?: null;
    genres?: string;
    genreList?: KeyValueElement[];
    companies?: string;
    companyList?: CompanyListElement[];
    countries?: string;
    countryList?: KeyValueElement[];
    languages?: string;
    languageList?: KeyValueElement[];
    contentRating?: string;
    imDbRating?: string;
    imDbRatingVotes?: string;
    metacriticRating?: string;
    ratings?: null;
    wikipedia?: null;
    posters?: null;
    images?: null;
    trailer?: null;
    boxOffice?: BoxOffice;
    tagline?: string;
    keywords?: string;
    keywordList?: string[];
    similars?: Similar[];
    tvSeriesInfo?: TvSeriesInfo | null;
    tvEpisodeInfo?: null;
    errorMessage?: null;
}

export type MediaType = 'Movie' | 'TVSeries';

export interface ActorList {
    id?: string;
    image?: string;
    name?: string;
    asCharacter?: string;
}

export interface BoxOffice {
    budget?: string;
    openingWeekendUSA?: string;
    grossUSA?: string;
    cumulativeWorldwideGross?: string;
}

export interface CompanyListElement {
    id?: string;
    name?: string;
}

export interface KeyValueElement {
    key?: string;
    value?: string;
}

export interface Similar {
    id?: string;
    title?: string;
    image?: string;
    imDbRating?: string;
}

export interface TvSeriesInfo {
    yearEnd?:     string;
    creators?:    string;
    creatorList?: CompanyListElement[];
    seasons?:     string[];
}
