import * as z from 'zod'

export const createSlideGroupSchema = z.object({
  id: z
    .string()
    .min(1, { message: 'スライドグループIDは必須です' })
    .refine((value) => /^[a-zA-Z0-9]*$/.test(value), {
      message: 'スライドIDは半角英数のみ有効です',
    }),
  title: z.string().min(1, 'タイトルは必須です'),
  presentation_at: z.date({ required_error: '日付を入力してください' }),
})

export const updateSlideGroupSchema = z.object({
  id: z
    .string()
    .min(1, { message: 'スライドグループIDは必須です' })
    .refine((value) => /^[a-zA-Z0-9]*$/.test(value), {
      message: 'スライドIDは半角英数のみ有効です',
    }),
  title: z.string().min(1, 'タイトルは必須です'),
  presentation_at: z.date({ required_error: '日付を入力してください' }),
  drive_id: z.string().min(1, 'Google Drive ID は必須です'),
})

export const updateSlideSchema = z.object({
  id: z
    .string()
    .min(1, { message: 'スライドIDは必須です' })
    .refine((value) => /^[a-zA-Z0-9]*$/.test(value), {
      message: 'スライドIDは半角英数のみ有効です',
    }),
  title: z.string().min(1, 'タイトルは必須です'),
  is_publish: z.boolean(),
  drive_pdf_url: z.string().url('有効なURLを入力してください'),
  storage_thumbnail_url: z.string(),
  google_slide_share_url: z.string(),
  group_id: z.string(),
})

export const uploadSlidesSchema = z.object({
  id: z
    .string()
    .min(1, { message: '発表者IDは必須です' })
    .refine((value) => /^[a-zA-Z0-9]*$/.test(value), {
      message: 'スライドIDは半角英数のみ有効です',
    }),
  title: z.string().min(1, 'タイトルは必須です'),
  slides_url: z
    .string()
    .min(1, 'Google Slides URL は必須です')
    .url('有効なURLを入力してください'),
  slides_share_url: z.string().optional(),
})

export const uploadPDFSchema = z.object({
  id: z
    .string()
    .min(1, { message: '発表者IDは必須です' })
    .refine((value) => /^[a-zA-Z0-9]*$/.test(value), {
      message: 'スライドIDは半角英数のみ有効です',
    }),
  title: z.string().min(1, 'タイトルは必須です'),
  pdf_file: z
    .any()
    .refine(
      (files) => ['application/pdf'].includes(files?.[0]?.type),
      'PDFファイルを選択してください',
    ),
  thumbnail: z.any().optional(),
})
export const uploadPDFRequestSchema = z.object({
  id: z
    .string()
    .min(1, { message: '発表者IDは必須です' })
    .refine((value) => /^[a-zA-Z0-9]*$/.test(value), {
      message: 'スライドIDは半角英数のみ有効です',
    }),
  title: z.string().min(1, 'タイトルは必須です'),
  slides_share_url: z.string().optional(),
})
