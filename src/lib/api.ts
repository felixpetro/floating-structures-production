export const PRODUCTS_API_URL = 'https://functions.poehali.dev/1805d1e5-eb70-4854-b03c-26a3596278de';
export const SERVICES_API_URL = 'https://functions.poehali.dev/92609b2c-66f9-45bf-bd85-8678bbf8ce77';
export const LEADS_API_URL = 'https://functions.poehali.dev/dc8a28b8-b7fb-4bec-a54f-425363b9743a';

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  id: number;
  slug: string;
  name: string;
  category: string;
  badge?: string | null;
  description: string;
  long_description?: string | null;
  specs: Spec[];
  features: string[];
  photos: string[];
  sort_order: number;
}

export interface Service {
  id: number;
  slug: string;
  name: string;
  icon: string;
  short_description: string;
  long_description?: string | null;
  features: string[];
  sort_order: number;
}

export async function fetchProducts(): Promise<Product[]> {
  const res = await fetch(PRODUCTS_API_URL);
  if (!res.ok) throw new Error('Не удалось загрузить продукцию');
  return res.json();
}

export async function fetchProduct(slug: string): Promise<Product | null> {
  const res = await fetch(`${PRODUCTS_API_URL}?slug=${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Не удалось загрузить товар');
  return res.json();
}

export async function fetchServices(): Promise<Service[]> {
  const res = await fetch(SERVICES_API_URL);
  if (!res.ok) throw new Error('Не удалось загрузить услуги');
  return res.json();
}

export async function fetchService(slug: string): Promise<Service | null> {
  const res = await fetch(`${SERVICES_API_URL}?slug=${encodeURIComponent(slug)}`);
  if (res.status === 404) return null;
  if (!res.ok) throw new Error('Не удалось загрузить услугу');
  return res.json();
}

export interface LeadPayload {
  name: string;
  phone: string;
  message?: string;
}

export async function submitLead(payload: LeadPayload): Promise<void> {
  const res = await fetch(LEADS_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Не удалось отправить заявку');
  }
}