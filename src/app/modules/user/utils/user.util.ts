import * as Crypto from 'crypto';
import { v5 as uuidv5 } from 'uuid';

const { USER_NAMESPACE } = process.env;

export function generatepatientId(cpfCnpj: string): string  {
    // Create SHA-256 hash from cpfCnpj
    const hash = Crypto.createHash('sha256').update(cpfCnpj).digest('hex');
    
    // Convert hash in number
    const numericId = parseInt(hash.substring(0, 8), 16);
    
    const patientId = numericId % 1000000;

    if (Number.isNaN(patientId)) {
        throw new Error('Failed to generate a valid patient ID');
    }

    return patientId.toString();
}

export function generateUuid(cpfCnpj: string): string {
    return uuidv5(cpfCnpj, USER_NAMESPACE);
}

export function convertToISODate(date: string): string {
    const [day, month, year] = date.split('-');
    return `${year}-${month}-${day}`;
}


