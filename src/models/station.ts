export interface Station {
    id: string,
    name: string,
    status: string,
    activeBikesCount: number,
    bikesLimit?: number
}
