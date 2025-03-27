export interface BaseModel {
    id: number;
}

export interface AuditableModel extends BaseModel {
    createdBy: number;
    creationAt: Date;
    createdByUser?: User;
    updatedBy?: number;
    updatedAt?: Date;
    updatedByUser?: User;
}

export interface Travel extends AuditableModel {
    name: string;
    countryId: number;
    country?: Country;
    startDate: Date;
    endDate: Date;
    stayAddress?: string;
    stayURL?: string;
    expenses?: Expense[];
}

export interface User extends BaseModel {
    username: string;
    name: string;
    surname: string;
    email: string;
    password: string;
    creationDate: Date;
    updateDate: Date;
    avatar: string;
}

export interface Country extends BaseModel {
    name: string;
    iso: string;
    iso3: string;
    dial: string;
    currency?: string;
    currencyName: string;
    currencySymbol?: string;
    flag: string;
}

export interface Expense extends AuditableModel {
    amount: number;
    description?: string;
    travelId: number;
    travel?: Travel;
    currency: string;
    currencySymbol?: string;
    paidBy: number;
    paidByUser?: User;
    paymentDate: Date;
    category?: CategoryType;
}

export interface SharedFile extends AuditableModel {
    travelId: number;
    travel?: Travel;
    fileName: string;
    fileURL: string;
    category?: CategoryType;
}

export interface TravelParticipant extends BaseModel {
    travelId: number;
    travel?: Travel;
    userId: number;
    user?: User;
}

export interface UsefulLink extends AuditableModel {
    travelId: number;
    travel: Travel;
    title: string;
    url: string;
    category?: CategoryType;
}

export interface ExpenseStats {
    travelExpenses: TravelExpense;
    totalAmount: number;
    users: User[];
}

export interface TravelExpense {
    amountSum: number;
    currency: string;
    currencySymbol: string;
}

export interface CurrencyTableDTO {
    currency: string;
    currencySymbol: string;
    count: number;
}

export enum CategoryType {
    Food = 0,
    Transport = 1,
    Accommodation = 2,
    Activities = 3,
    Shopping = 4,
    Fun = 5,
    Other = 6
}

import { Utensils, Car, Hotel, Ticket, ShoppingBag, MoreHorizontal, Martini, Bus, BusFront } from "lucide-vue-next";

export const CategoryMap = [
    {
        name: CategoryType.Food,
        icon: Utensils,
        translation: "Cibo"
    },
    {
        name: CategoryType.Transport,
        icon: BusFront,
        translation: "Trasporto"
    },
    {
        name: CategoryType.Accommodation,
        icon: Hotel,
        translation: "Alloggio"
    },
    {
        name: CategoryType.Activities,
        icon: Ticket,
        translation: "Attività"
    },
    {
        name: CategoryType.Shopping,
        icon: ShoppingBag,
        translation: "Spesa"
    },
    {
        name: CategoryType.Fun,
        icon: Martini,
        translation: "Divertimento"
    },
    {
        name: CategoryType.Other,
        icon: MoreHorizontal,
        translation: "Altro"
    }
];
