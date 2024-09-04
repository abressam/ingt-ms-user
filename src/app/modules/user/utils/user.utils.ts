import * as Crypto from 'crypto';

export function generatePacientId(cpfCnpj: string): number {
    // Create SHA-256 hash from cpfCnpj
    const hash = Crypto.createHash('sha256').update(cpfCnpj).digest('hex');
    
    // Convert hash in number
    const numericId = parseInt(hash.substring(0, 8), 16);
    
    // Return a number with 6 digits limit
    return numericId % 1000000;
}