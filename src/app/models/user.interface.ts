import e from "express";

export interface User {
  id?: number;
  name?: string;
  email?:Email;
  password?: string;
  isAdmin?: boolean;
  isBlocked?: boolean;
  isHovered?: boolean;
  refreshToken?: string;
  accessToken?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Email{
  value: string;
}

export interface ResponseModel {
  success: boolean;
  message: string;
  data: any;
}
