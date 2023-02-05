import { validate as uuidValidate } from 'uuid';

export const isValidId = (id: string) => uuidValidate(id);
