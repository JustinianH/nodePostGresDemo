export type UserNote = {
    id?: number,
    user_id: number,
    note: string,
    note_category: number,
    created_at?: Date,
    updated_at?: Date
}