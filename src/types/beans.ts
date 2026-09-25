export interface Recipe {
    id: string
    method: string
    grindSize: string
    waterTemp: number
    doseIn: number
    doseOut: number
    timeTotal: string
    steps: string[]

}
export interface Bean {
    id: string
    title: string
    country: string
    description: string
    roasterComment: string
    imageUrl: string
    details: {
        process: string
        region: string
        variety: string[]
        scaScore: number

    }
    
    flavorProfile: {
        notes: string[]
        acidity: number
        sweetness: number
        bitterness: number

    }
    recipes: Recipe[]
}