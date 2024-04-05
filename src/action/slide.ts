'use server'

import jwt from 'jsonwebtoken'
import { revalidatePath } from 'next/cache'
import type { ActionResult } from 'next/dist/server/app-render/types'
import type { z } from 'zod'

import {
  createSlideGroupSchema,
  updateSlideGroupSchema,
  updateSlideSchema,
  uploadPDFRequestSchema,
  uploadPDFSchema,
  uploadSlidesSchema,
} from '@/schemas/slide'
import type {
  ActionsResult,
  GetSlideActionResult,
  GetSlideGroupActionResult,
  GetSlideGroupListActionResult,
  GetSlideGroupsActionResult,
} from '@/types/action'

import { auth } from '../../auth'

export const getNewestSlideGroup =
  async (): Promise<GetSlideGroupActionResult> => {
    const slideGroup = await fetch(`${process.env.API_URL}/slides/newest`, {
      method: 'GET',
      cache: 'no-cache',
    })
      .then((res) => {
        if (!res.ok) {
          return null
        }
        return res.json()
      })
      .catch((error) => {
        return {
          isSuccess: false,
          error: {
            message: error.message,
          },
        }
      })

    return {
      isSuccess: true,
      message: 'スライドグループを取得しました',
      data: slideGroup,
    }
  }

export const getSlideGroupsByPage = async (
  page: number,
): Promise<GetSlideGroupListActionResult> => {
  const slideGroups = await fetch(
    `${process.env.API_URL}/slides?page=${page}`,
    {
      method: 'GET',
      cache: 'force-cache',
    },
  )
    .then((res) => {
      if (!res.ok) {
        return null
      }
      return res.json()
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: {
          message: error.message,
        },
      }
    })

  return {
    isSuccess: true,
    message: 'スライドグループを取得しました',
    data: slideGroups,
  }
}

export const getSlideGroup = async (
  id: string,
): Promise<GetSlideGroupActionResult> => {
  const slideGroup = await fetch(`${process.env.API_URL}/slides/${id}`, {
    method: 'GET',
    cache: 'no-store',
  })
    .then((res) => {
      if (!res.ok) {
        return null
      }
      return res.json()
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: {
          message: error.message,
        },
      }
    })

  return {
    isSuccess: true,
    message: 'スライドグループを取得しました',
    data: slideGroup,
  }
}

export const getSlideGroups = async (): Promise<GetSlideGroupsActionResult> => {
  const slideGroups = await fetch(`${process.env.API_URL}/slides`, {
    method: 'GET',
    cache: 'no-cache',
  })
    .then((res) => {
      if (!res.ok) {
        return null
      }
      return res.json()
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: {
          message: error.message,
        },
      }
    })

  return {
    isSuccess: true,
    message: 'スライドグループを取得しました',
    data: slideGroups,
  }
}

export const createSlideGroup = async (
  values: z.infer<typeof createSlideGroupSchema>,
): Promise<ActionResult> => {
  const validatedFields = createSlideGroupSchema.safeParse(values)
  const session = await auth()
  const user = session?.user

  if (!user || user?.role !== 'admin') {
    return {
      isSuccess: false,
      error: {
        message: '権限がありません',
      },
    }
  }

  const decoded = jwt.verify(session.accessToken, process.env.AUTH_SECRET!)
  if (typeof decoded === 'object' && decoded.id !== user.id) {
    return {
      isSuccess: false,
      error: {
        message: 'IDが一致しません',
      },
    }
  }

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    }
  }

  await fetch(`${process.env.API_URL}/slides/${values.id}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(values),
  })
    .then((res) => {
      if (!res.ok) {
        return {
          isSuccess: false,
          error: {
            message: 'スライドグループの作成に失敗しました',
          },
        }
      }
      return {
        isSuccess: true,
        message: 'スライドグループを作成しました',
      }
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: {
          message: error.message,
        },
      }
    })

  revalidatePath('/slides')

  return {
    isSuccess: true,
    message: 'スライドグループを作成しました',
  }
}

export const updateSlideGroup = async (
  values: z.infer<typeof updateSlideGroupSchema>,
): Promise<ActionResult> => {
  const validatedFields = updateSlideGroupSchema.safeParse(values)
  const session = await auth()
  const user = session?.user

  if (!user || user?.role !== 'admin') {
    return {
      isSuccess: false,
      error: {
        message: '権限がありません',
      },
    }
  }

  const decoded = jwt.verify(session.accessToken, process.env.AUTH_SECRET!)
  if (typeof decoded === 'object' && decoded.id !== user.id) {
    return {
      isSuccess: false,
      error: {
        message: 'IDが一致しません',
      },
    }
  }

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    }
  }

  await fetch(`${process.env.API_URL}/slides/${values.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify(values),
  })
    .then((res) => {
      if (!res.ok) {
        return {
          isSuccess: false,
          error: {
            message: 'スライドグループの更新に失敗しました',
          },
        }
      }
      return {
        isSuccess: true,
        message: 'スライドグループを更新しました',
      }
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: {
          message: error.message,
        },
      }
    })

  revalidatePath('/slides')

  return {
    isSuccess: true,
    message: 'スライドグループを更新しました',
  }
}

export const getSlide = async (
  groupId: string,
  slideId: string,
): Promise<GetSlideActionResult> => {
  const slide = await fetch(
    `${process.env.API_URL}/slides/${groupId}/${slideId}`,
    {
      method: 'GET',
      cache: 'no-store',
    },
  )
    .then((res) => {
      if (!res.ok) {
        return null
      }
      return res.json()
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: {
          message: error.message,
        },
      }
    })

  return {
    isSuccess: true,
    message: 'スライドを取得しました',
    data: slide,
  }
}

export const updateSlide = async (
  values: z.infer<typeof updateSlideSchema>,
): Promise<ActionsResult> => {
  const validatedFields = updateSlideSchema.safeParse(values)

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    }
  }

  const session = await auth()
  const user = session?.user

  if (!user || user.role === 'user') {
    return {
      isSuccess: false,
      error: {
        message: 'ログインしてください',
      },
    }
  }

  await fetch(`${process.env.API_URL}/slides/${values.group_id}/${values.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({
      ...values,
      speaker_id: user.speaker_id,
    }),
  })
    .then((res) => {
      if (!res.ok) {
        return {
          isSuccess: false,
          error: {
            message: 'スライドの更新に失敗しました',
          },
        }
      }
      return {
        isSuccess: true,
        message: 'スライドを更新しました',
      }
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: {
          message: error.message,
        },
      }
    })

  return {
    isSuccess: true,
    message: 'スライドを更新しました',
  }
}

export const uploadSlideByGoogleSlidesURL = async (
  values: z.infer<typeof uploadSlidesSchema>,
  group_id: string,
  drive_id: string,
): Promise<ActionResult> => {
  const validatedFields = uploadSlidesSchema.safeParse(values)
  const session = await auth()
  const user = session?.user

  if (!user) {
    return {
      isSuccess: false,
      error: {
        message: 'ログインしてください',
      },
    }
  }

  const decoded = jwt.verify(session.accessToken, process.env.AUTH_SECRET!)
  if (typeof decoded === 'object' && decoded.id !== user.id) {
    return {
      isSuccess: false,
      error: {
        message: 'IDが一致しません',
      },
    }
  }

  if (!validatedFields.success) {
    return {
      isSuccess: false,
      error: {
        message: validatedFields.error.message,
      },
    }
  }

  const result = await fetch(`${process.env.API_URL}/slides/upload/slides`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session.accessToken}`,
    },
    body: JSON.stringify({
      ...values,
      is_publish: false,
      group_id,
      speaker_id: user.speaker_id,
      drive_id,
    }),
  })
    .then(async (res) => {
      if (!res.ok) {
        return await res.json()
      }
      return {
        isSuccess: true,
        message: 'スライドをアップロードしました',
      }
    })
    .catch((error) => {
      return {
        isSuccess: false,
        error: {
          message: error.message,
        },
      }
    })

  if (!result.isSuccess) {
    return {
      isSuccess: false,
      error: {
        message: result,
      },
    }
  }

  return {
    isSuccess: true,
    message: 'スライドをアップロードしました',
  }
}

export const uploadSlideByPDF = async (
  values: z.infer<typeof uploadPDFRequestSchema>,
  formData: FormData,
): Promise<ActionResult> => {
  try {
    const validatedFields = uploadPDFRequestSchema.safeParse(values)
    const session = await auth()
    const user = session?.user

    if (!user) {
      return {
        isSuccess: false,
        error: {
          message: 'ログインしてください',
        },
      }
    }

    const decoded = jwt.verify(session.accessToken, process.env.AUTH_SECRET!)
    if (typeof decoded === 'object' && decoded.id !== user.id) {
      return {
        isSuccess: false,
        error: {
          message: 'IDが一致しません',
        },
      }
    }

    if (!validatedFields.success) {
      return {
        isSuccess: false,
        error: {
          message: validatedFields.error.message,
        },
      }
    }

    const result = await fetch(`${process.env.API_URL}/slides/upload/pdf`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
      },
      body: formData,
    })
      .then(async (res) => {
        if (!res.ok) {
          return await res.json()
        }
        return {
          isSuccess: true,
          message: 'スライドをアップロードしました',
        }
      })
      .catch((error) => {
        return {
          isSuccess: false,
          error: {
            message: error.message,
          },
        }
      })

    if (!result.isSuccess) {
      return {
        isSuccess: false,
        error: {
          message: result,
        },
      }
    }

    return {
      isSuccess: true,
      message: 'スライドをアップロードしました',
    }
  } catch (error) {
    console.log('error', error)
  }
}
