export function validateNotNull(object: any, message: string) {
    if(object == null) {
        throw message;
    }
}