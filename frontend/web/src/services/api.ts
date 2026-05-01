export const BASE_URL = '/api/assistant';

export interface UserContext {
  persona?: string;
  location?: string;
  state?: string;
  dob?: string;
  age?: number;
  isRegistered?: boolean;
  citizenshipStatus?: string;
}

export const apiService = {
  async onboard(context: UserContext): Promise<{ sessionId: string; message: string }> {
    const response = await fetch(`${BASE_URL}/onboard`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ context }),
    });
    if (!response.ok) throw new Error('Failed to onboard');
    return response.json();
  },

  async chat(sessionId: string, message: string, file?: File) {
    const formData = new FormData();
    formData.append('sessionId', sessionId);
    formData.append('message', message);
    if (file) {
      formData.append('file', file);
    }

    const response = await fetch(`${BASE_URL}/chat`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) throw new Error('Chat failed');
    return response.json();
  },
};
