export interface ServiceItem {
  id: string;
  name: string;
  category: 'HAIR' | 'SKIN' | 'MAKEUP' | 'GROOMING' | 'BRIDAL' | 'TREATMENTS';
  description: string;
  duration?: string;
  price?: string; // e.g. "₹850" or undefined for "Price on consultation"
  popular?: boolean;
  forGender?: 'UNISEX' | 'WOMEN' | 'MEN';
  tags?: string[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'HAIR' | 'COLOUR' | 'MAKEUP' | 'BRIDAL' | 'SALON' | 'DETAILS';
  imageUrl: string;
  description?: string;
}

export interface BeforeAfterItem {
  id: string;
  title: string;
  category: 'HAIR' | 'COLOUR' | 'MAKEUP' | 'SKIN';
  beforeImage: string;
  afterImage: string;
  description: string;
  treatmentName: string;
}

export interface ReviewItem {
  id: string;
  author: string;
  rating: number; // e.g. 5
  timeAgo: string;
  text: string;
  serviceMentioned?: string;
  avatarUrl?: string;
  verified: boolean;
}

export interface OfferItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  validity: string;
  badge?: string;
  active: boolean;
  code?: string;
}

export interface BookingDetails {
  id: string;
  serviceIds: string[];
  serviceNames: string[];
  totalPriceEstimate: string;
  date: string;
  timeSlot: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  notes?: string;
  createdAt: string;
  status: 'PENDING_CONFIRMATION' | 'CONFIRMED' | 'COMPLETED';
}

export interface ContactFormData {
  name: string;
  phone: string;
  email?: string;
  serviceCategory?: string;
  preferredDate?: string;
  message?: string;
}
