import { z } from 'zod'

export const searchSchema = z.object({
  name: z.string().min(2, { message: 'Minimo 2 Caracteres' }),
})

export const addMemberSchema = z.object({
  name: z.string().min(4, { message: 'Minimo 4 Caracteres' }),
})
export const addTeamSchema = z.object({
  name: z.string().min(3, { message: 'Minimo 3 Caracteres' }),
})

export const addProjectSchema = z.object({
  url: z.string().url(),
  public_id: z.string(),
})

export const editMemberSchema = z.object({
  name: z.string().min(4, { message: 'Minimo 4 Caracteres' }),
  githubName: z.string().min(4, { message: 'Minimo 4 Caracteres' }),
  subTitle: z.string().min(4, { message: 'Minimo 4 Caracteres' }),
  text: z.string().min(4, { message: 'Minimo 4 Caracteres' }),
  githubUrl: z.string().url({ message: 'Url invalida' }),
  githubImgUrl: z.string().optional(),
  linkedinUrl: z
    .string()
    .url({ message: 'Url invalida' })
    .optional()
    .or(z.literal('')),
  instagramUrl: z
    .string()
    .url({ message: 'Url invalida' })
    .optional()
    .or(z.literal('')),
  facebookUrl: z
    .string()
    .url({ message: 'Url invalida' })
    .optional()
    .or(z.literal('')),
})
