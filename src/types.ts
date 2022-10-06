export type Links = {
    flickr: {
        original: string[]
    }
}

export type Rocket = {
    name: string;
    id: string;
}

export type Launch = {
    success: boolean;
    details: string;
    name: string;
    date_utc: string;
    upcoming: boolean;
    id: string;
    rocket: Rocket;
    links: Links;
}

export type Status = {
    name: string;
    identifier: string;
    style: string;
}