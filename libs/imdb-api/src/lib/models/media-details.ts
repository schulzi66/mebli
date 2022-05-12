export interface MediaDetails {
    actorList?: ActorList[];
    awards?: string;
    boxOffice?: BoxOffice;
    companies?: string;
    companyList?: CompanyListElement[];
    contentRating?: string;
    countries?: string;
    countryList?: KeyValueElement[];
    description?: string;
    directorList?: CompanyListElement[];
    directors?: string;
    errorMessage?: null;
    fullCast?: null;
    fullTitle?: string;
    genreList?: KeyValueElement[];
    genres?: string;
    id: string;
    image?: string;
    images?: null;
    imDbRating?: string;
    imDbRatingVotes?: string;
    keywordList?: string[];
    keywords?: string;
    languageList?: KeyValueElement[];
    languages?: string;
    metacriticRating?: string;
    originalTitle?: string;
    plot?: string;
    plotLocal?: string;
    plotLocalIsRtl?: boolean;
    posters?: null;
    ratings?: null;
    releaseDate?: Date;
    runtimeMins?: string;
    runtimeStr?: string;
    similars?: Similar[];
    starList?: CompanyListElement[];
    stars?: string;
    tagline?: string;
    title: string;
    trailer?: null;
    tvEpisodeInfo?: null;
    tvSeriesInfo?: TvSeriesInfo | null;
    type?: MediaType;
    wikipedia?: null;
    writerList?: CompanyListElement[];
    writers?: string;
    year?: string;
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
    yearEnd?: string;
    creators?: string;
    creatorList?: CompanyListElement[];
    seasons?: string[];
}
