import { Category } from '@/types/navigation';
import sites from '../../sites.json';

export async function loadCategories(): Promise<Category[]> {
  return sites.categories;
}