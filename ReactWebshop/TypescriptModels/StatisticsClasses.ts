///Used for the statistics controllers

export class GroupBy {
     public attribute:string;
}

export class OrderBy{
    public ascendOrDescend: number;
    public attribute: string;
}

export class DatumFilter{
    public day: Date;
    public month: Date;
    public year: Date;
}