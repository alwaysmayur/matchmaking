// src/lib/data-loader.ts
import talentData from '@/data/talents.json';
import clientData from '@/data/client.json';
import gigData from '@/data/gig.json';
import { Talent, Client, Gig } from '@/types/index';

export const talents: Talent[] = talentData as Talent[];
export const clients: Client[] = clientData as Client[];
export const gigs: Gig[] = gigData as Gig[];