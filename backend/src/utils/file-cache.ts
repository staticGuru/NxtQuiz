import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

class CacheManager {
  private cacheDir: string;

  constructor(cacheDir: string) {
    this.cacheDir = cacheDir;
    // Create cache directory if it doesn't exist
    if (!fs.existsSync(this.cacheDir)) {
      fs.mkdirSync(this.cacheDir);
    }
  }

  generateCacheKey(prompt: any): string {
    const hash = crypto
      .createHash('md5')
      .update(JSON.stringify(prompt))
      .digest('hex');
    return `${this.cacheDir}${hash}.txt`;
  }

  async getFromCache(cacheKey: string): Promise<string | null> {
    if (fs.existsSync(cacheKey)) {
      return fs.readFileSync(cacheKey, 'utf-8');
    }
    return null;
  }

  async saveToCache(cacheKey: string, data: string): Promise<void> {
    fs.writeFileSync(cacheKey, data, 'utf-8');
  }

  clearCache(): void {
    const files = fs.readdirSync(this.cacheDir);
    for (const file of files) {
      const filePath = path.join(this.cacheDir, file);
      fs.unlinkSync(filePath);
    }
    console.log('Cache cleared successfully!');
  }
}

export default CacheManager;
