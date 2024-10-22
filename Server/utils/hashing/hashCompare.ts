import bcrypt from 'bcrypt';

interface Compare {
  existingString: string;
  input: string;
}

export default async function hashCompare({ existingString, input }: Compare) {
  try {
    if (!existingString || !input) {
      throw new Error('Props Missing');
    }

    const match = await bcrypt.compare(input, existingString);
    
    if (!match) {
      throw new Error('Password mismatch');
    }

    return match;
  } catch (error) {
    throw error;
  }
}
