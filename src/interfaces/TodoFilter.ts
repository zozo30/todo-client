export interface PaginationInput {
    take: number
    skip: number
}
export interface TodoFilter {
    completed?: Boolean
    pagination?: PaginationInput
}